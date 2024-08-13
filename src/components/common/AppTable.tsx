import Config from '@/config/Config';
import CommonUtil from '@/utils/CommonUtil';
import { AgGridReact } from 'ag-grid-react';
import { Modal } from 'antd';
import AppSelect from './AppSelect';
import { produce } from 'immer';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import GridActionButtonComponent from './GridActionButtonComponent';
import GridLinkComponent from './GridLinkComponent';

const defaultColDef = {
  sortable: true,
  filter: true,
  flex: 1,
  minWidth: 100,
};

const convertColumns = (columns) => {
  const result = columns.map((columnInfo) => {
    if (columnInfo.isLink) {
      // 링크 cell convert
      columnInfo.cellRenderer = GridLinkComponent;
      columnInfo.cellRendererParams = {
        linkPath: columnInfo.linkPath,
        detailPath: columnInfo.detailPath,
        isWindowOpen: columnInfo.isWindowOpen,
      };
    } else if (columnInfo.field === 'actionsByOption') {
      // action button cell convert
      columnInfo.cellRenderer = GridActionButtonComponent;
      columnInfo.cellRendererParams = {
        actionButtons: columnInfo.actionButtons,
        actionButtonListPath: columnInfo.actionButtonListPath,
        search: columnInfo.search,
      };
    }

    if (columnInfo.enableRowSpan) {
      // rowSpan 적용
      columnInfo.rowSpan = (params) => {
        const rowspanCount = params.data.rowSpanGroupCount ? params.data.rowSpanGroupCount : 1;
        return rowspanCount;
      };
      columnInfo.cellClassRules = {
        'cell-span': (params) => params.data.rowSpanGroupCount && params.data.rowSpanGroupCount > 1,
      };
    }
    return columnInfo;
  });
  return result;
};

const LoadingComponent = (props) => {
  const { loadingMessage } = props;
  return (
    <div className="ag-overlay-loading-center" role="presentation">
      <div
        role="presentation"
        style={{
          height: 100,
          width: 100,
          background: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 24 24'%3E%3Cg%3E%3Ccircle cx='12' cy='2.5' r='1.5' fill='%23000' opacity='0.14'/%3E%3Ccircle cx='16.75' cy='3.77' r='1.5' fill='%23000' opacity='0.29'/%3E%3Ccircle cx='20.23' cy='7.25' r='1.5' fill='%23000' opacity='0.43'/%3E%3Ccircle cx='21.5' cy='12' r='1.5' fill='%23000' opacity='0.57'/%3E%3Ccircle cx='20.23' cy='16.75' r='1.5' fill='%23000' opacity='0.71'/%3E%3Ccircle cx='16.75' cy='20.23' r='1.5' fill='%23000' opacity='0.86'/%3E%3Ccircle cx='12' cy='21.5' r='1.5' fill='%23000'/%3E%3CanimateTransform attributeName='transform' calcMode='discrete' dur='0.75s' repeatCount='indefinite' type='rotate' values='0 12 12;30 12 12;60 12 12;90 12 12;120 12 12;150 12 12;180 12 12;210 12 12;240 12 12;270 12 12;300 12 12;330 12 12;360 12 12'/%3E%3C/g%3E%3C/svg%3E") center / contain no-repeat`,
          margin: '0 auto',
        }}
      ></div>
      <div aria-live="polite" aria-atomic="true">
        {loadingMessage}
      </div>
    </div>
  );
};

function AppTable(props) {
  const gridRef = useRef<any>(null);
  const {
    rowData,
    columns,
    customButtons = [],
    tableHeight = Config.defaultGridHeight,
    noDataMessage = Config.defaultGridNoDataMessage,
    displayTableLoading = false,
    handleRowDoubleClick,
    handleRowSingleClick,
    handleRowSelect,
    rowSelectMode = 'multiple',
    enableCheckBox = false,
    pageSize = Config.defaultGridPageSize,
    pageSizeList = Config.defaultPageSizeList,
    enablePagination = false,
    displayCSVExportButton = false,
    gridTotalCountTemplate = Config.defaultGridTotalCountTemplate,
    useColumnDynamicSetting = false,
    useActionButtons = false,
    actionButtons = ['detail', 'delete'],
    actionButtonListPath = '',
    getGridRef,
    applyAutoHeight,
    search,
    store = null,
    hiddenPagination,
    hiddenTableHeader = false,
    readOnlyEdit = true,
  } = props;

  // store
  const { currentPage, prevPage, nextPage, totalCount, displayPageIndexList = [], changePageSize } = store || {};

  // 컬럼 동적 셋팅 모달 open
  const [isColumnSettingModalOpen, setIsColumnSettingModalOpen] = useState(false);
  const [dynamicApplyColumnList, setDynamicApplyColumnList] = useState([]);

  if (enableCheckBox) {
    columns[0].headerCheckboxSelection = true;
    columns[0].checkboxSelection = true;
    columns[0].showDisabledCheckboxes = true;
  }

  const searchRowSpanIndex = columns.findIndex((info) => info.enableRowSpan);
  const searchActionButtonIndex = columns.findIndex((info) => info.field === 'actionsByOption');

  if (useActionButtons && searchActionButtonIndex === -1) {
    columns.push({
      field: 'actionsByOption',
      headerName: 'Actions',
      actionButtons: actionButtons,
      actionButtonListPath: actionButtonListPath,
      search: store ? store.search : search,
    });
  }

  // columns convert 작업
  const applyColumns = convertColumns(columns);

  const loadingOverlayComponent = useMemo(() => {
    return LoadingComponent;
  }, []);

  const loadingOverlayComponentParams = useMemo(() => {
    return {
      loadingMessage: 'wait please...',
    };
  }, []);

  const onSelectionChanged = useCallback(() => {
    const selectedRows = gridRef.current.api.getSelectedRows();
    return handleRowSelect(selectedRows);
  }, []);

  const downloadCSVFile = useCallback(() => {
    // '', '\t', '|'
    const optionParam = {
      columnSeparator: '|',
      suppressQuotes: true, // true인 경우 ""이 제거됨
      skipColumnGroupHeaders: false,
      skipColumnHeaders: false,
      allColumns: false, // column에 설정된 hide는 기본적으로 무시되어서 처리됨
    };
    gridRef.current.api.exportDataAsCsv(optionParam);
  }, []);

  const saveColumnInfos = useCallback(() => {
    gridRef.current.api.setGridOption('columnDefs', dynamicApplyColumnList);
    setIsColumnSettingModalOpen(false);
    CommonUtil.saveColumnInfos(dynamicApplyColumnList);
  }, [dynamicApplyColumnList]);

  const cancelColumnInfos = useCallback(() => {
    setDynamicApplyColumnList(columns);
    setIsColumnSettingModalOpen(false);
  }, [dynamicApplyColumnList]);

  const changeColumnHide = (event, index) => {
    const checked = event.target.checked;
    const newDynamicApplyColumnList = produce(dynamicApplyColumnList, (draft) => {
      if (checked) {
        draft[index].hide = false;
      } else {
        draft[index].hide = true;
      }
    });
    setDynamicApplyColumnList(newDynamicApplyColumnList);
  };

  const changeColumnWidth = (event, index) => {
    const width = event.target.value;
    const newDynamicApplyColumnList = produce(dynamicApplyColumnList, (draft) => {
      draft[index].width = width;
    });
    setDynamicApplyColumnList(newDynamicApplyColumnList);
  };

  const searchEnableRowSpanColumnInfo = columns.find((info) => info.enableRowSpan);
  const enableRowSpanColumnName = searchEnableRowSpanColumnInfo ? searchEnableRowSpanColumnInfo.field : '';

  const onPaginationChanged = useCallback(
    (params) => {
      // pageSize가 변경되었을 경우
      if (params.newPageSize) {
        const newPageSize = params.api.paginationGetPageSize();
        if (newPageSize) {
          if (enableRowSpanColumnName) {
            params.api.setRowData(
              CommonUtil.applyGroupingRowSpanByPageSize(rowData, enableRowSpanColumnName, newPageSize)
            );
          }
        }
      }
    },
    [rowData, enableRowSpanColumnName]
  );

  useEffect(() => {
    if (gridRef && gridRef.current && gridRef.current.api) {
      if (displayTableLoading) {
        gridRef.current.api.showLoadingOverlay();
      } else {
        gridRef.current.api.hideOverlay();
      }
    }
  }, [displayTableLoading]);

  useEffect(() => {
    setDynamicApplyColumnList(columns);
  }, [columns]);

  return (
    <>
      <div className="table-header" style={{ display: hiddenTableHeader ? 'none' : '' }}>
        <div className="count">
          {CommonUtil.formatString(gridTotalCountTemplate, store ? totalCount : rowData.length)}
        </div>
        <div className="btns-area">
          {customButtons.map((info) => {
            const { title, onClick } = info;
            return (
              <button
                key={title}
                name="button"
                className="btn_text btn_confirm text_color_neutral-10"
                onClick={onClick}
              >
                {title}
              </button>
            );
          })}
          <button
            name="button"
            className="btn_text btn_confirm text_color_neutral-10"
            onClick={downloadCSVFile}
            style={{ display: displayCSVExportButton ? '' : 'none' }}
          >
            download csv
          </button>
          <button
            name="button"
            className="btn_text btn_confirm text_color_neutral-10"
            onClick={() => setIsColumnSettingModalOpen(true)}
            style={{ display: useColumnDynamicSetting ? '' : 'none' }}
          >
            동적 필드 적용
          </button>
          <span>
            <AppSelect
              style={{ width: 150, display: hiddenPagination || enablePagination || !store ? 'none' : '' }}
              onChange={(size) => {
                changePageSize(size);
              }}
              value={store ? store.pageSize : pageSize}
              options={pageSizeList.map((size) => {
                return { value: size, label: size };
              })}
            />
          </span>
        </div>
      </div>
      <div className="ag-theme-quartz" style={{ height: tableHeight }}>
        <AgGridReact
          {...props}
          ref={gridRef}
          domLayout={applyAutoHeight ? 'autoHeight' : 'normal'}
          rowData={rowData}
          columnDefs={applyColumns}
          loadingOverlayComponent={loadingOverlayComponent}
          loadingOverlayComponentParams={loadingOverlayComponentParams}
          overlayNoRowsTemplate={noDataMessage}
          onSelectionChanged={onSelectionChanged}
          onRowDoubleClicked={handleRowDoubleClick}
          onRowClicked={handleRowSingleClick}
          rowSelection={rowSelectMode}
          suppressRowClickSelection={true}
          paginationPageSize={store ? store.pageSize : pageSize}
          paginationPageSizeSelector={pageSizeList}
          pagination={enablePagination}
          suppressRowTransform={searchRowSpanIndex !== -1 ? true : false}
          onPaginationChanged={onPaginationChanged}
          defaultColDef={defaultColDef}
          tooltipShowDelay={100}
          tooltipHideDelay={1000}
          tooltipMouseTrack={true}
          enableBrowserTooltips={false}
          readOnlyEdit={readOnlyEdit}
          onGridReady={(params) => {
            if (displayTableLoading) {
              params.api.showLoadingOverlay();
            } else {
              params.api.hideOverlay();
            }
            if (getGridRef) {
              getGridRef(params);
            }
          }}
        />
      </div>
      {useColumnDynamicSetting && (
        <Modal title="컬럼 변경" open={isColumnSettingModalOpen} onOk={saveColumnInfos} onCancel={cancelColumnInfos}>
          {dynamicApplyColumnList.map((columnInfo, index) => {
            const { field, width, hide } = columnInfo;
            return (
              <p key={field} style={{ marginBottom: 3, marginTop: 3 }}>
                <input
                  type="checkbox"
                  onChange={(event) => changeColumnHide(event, index)}
                  checked={hide ? false : true}
                />{' '}
                <input
                  type="text"
                  style={{ width: 200, padding: 7 }}
                  value={width}
                  onChange={(event) => changeColumnWidth(event, index)}
                />{' '}
                <span>{field}</span>{' '}
              </p>
            );
          })}
        </Modal>
      )}

      <div className="pagination" style={{ display: hiddenPagination || enablePagination ? 'none' : '' }}>
        <a
          className="first"
          href=""
          style={{ display: prevPage ? '' : 'none' }}
          onClick={(event) => {
            event.preventDefault();
            store.goFirstPage();
          }}
        >
          <span className="sr-only">이전</span>
        </a>
        <a
          className="prev"
          href=""
          style={{ display: prevPage ? '' : 'none' }}
          onClick={(event) => {
            event.preventDefault();
            store.changeCurrentPage(prevPage);
          }}
        >
          <span className="sr-only">이전</span>
        </a>
        <span>
          {displayPageIndexList.map((pageIndex) => {
            let pageComponent = (
              <a
                href=""
                key={pageIndex}
                onClick={(event) => {
                  event.preventDefault();
                  store.changeCurrentPage(pageIndex);
                }}
              >
                {pageIndex}
              </a>
            );
            if (pageIndex === currentPage) {
              pageComponent = (
                <strong
                  title="현재페이지"
                  key={pageIndex}
                  onClick={() => {
                    store.changeCurrentPage(pageIndex);
                  }}
                >
                  {pageIndex}
                </strong>
              );
            }
            return pageComponent;
          })}
        </span>
        <a
          className="next"
          href=""
          style={{ display: nextPage ? '' : 'none' }}
          onClick={(event) => {
            event.preventDefault();
            store.changeCurrentPage(nextPage);
          }}
        >
          <span className="sr-only">다음</span>
        </a>
        <a
          className="last"
          href=""
          style={{ display: nextPage ? '' : 'none' }}
          onClick={(event) => {
            event.preventDefault();
            store.goLastPage();
          }}
        >
          <span className="sr-only">다음</span>
        </a>
      </div>
    </>
  );
}

export default AppTable;
