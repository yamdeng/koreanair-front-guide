import Config from '@/config/Config';
import _ from 'lodash';
import { AgGridReact } from 'ag-grid-react';
import { useEffect, useMemo, useRef, useCallback, useState } from 'react';
import CommonUtil from '@/utils/CommonUtil';
import { Modal } from 'antd';
import { produce } from 'immer';
import GridLinkComponent from './GridLinkComponent';
import GridActionButtonComponent from './GridActionButtonComponent';

const convertColumns = (columns) => {
  const result = columns.map((colunmInfo) => {
    if (colunmInfo.isLink) {
      // 링크 cell convert
      colunmInfo.cellRenderer = GridLinkComponent;
      colunmInfo.cellRendererParams = {
        linkPath: colunmInfo.linkPath,
        detailPath: colunmInfo.detailPath,
      };
    } else if (colunmInfo.field === 'actionsByOption') {
      // action button cell convert
      colunmInfo.cellRenderer = GridActionButtonComponent;
      colunmInfo.cellRendererParams = {
        actionButtons: colunmInfo.actionButtons,
        actionButtonListPath: colunmInfo.actionButtonListPath,
        search: colunmInfo.search,
      };
    } else if (colunmInfo.enableRowSpan) {
      // rowSpan 적용
      colunmInfo.rowSpan = (params) => {
        const rowspanCount = params.data.rowSpanGroupCount ? params.data.rowSpanGroupCount : 1;
        return rowspanCount;
      };
      colunmInfo.cellClassRules = {
        'cell-span': (params) => params.data.rowSpanGroupCount && params.data.rowSpanGroupCount > 1,
      };
    }
    return colunmInfo;
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
    tableHeight = Config.defaultGridHeight,
    noDataMessage = Config.defaultGridNoDataMessage,
    displayTableLoading = false,
    handleRowDoubleClick,
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
    search,
  } = props;

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
      search: search,
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
  console.log(`enableRowSpanColumnName : ${enableRowSpanColumnName}`);

  const onPaginationChanged = useCallback(
    (params) => {
      console.log(params);
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
      <div style={{ padding: 3 }}>
        <span>{CommonUtil.formatString(gridTotalCountTemplate, rowData.length)}</span>
        <button className="button" onClick={downloadCSVFile} style={{ display: displayCSVExportButton ? '' : 'none' }}>
          download csv
        </button>
        <button
          className="button"
          onClick={() => setIsColumnSettingModalOpen(true)}
          style={{ display: useColumnDynamicSetting ? '' : 'none' }}
        >
          동적 필드 적용
        </button>
      </div>
      <div className="ag-theme-quartz" style={{ height: tableHeight }}>
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={applyColumns}
          loadingOverlayComponent={loadingOverlayComponent}
          loadingOverlayComponentParams={loadingOverlayComponentParams}
          overlayNoRowsTemplate={noDataMessage}
          onSelectionChanged={onSelectionChanged}
          onRowDoubleClicked={handleRowDoubleClick}
          rowSelection={rowSelectMode}
          suppressRowClickSelection={true}
          paginationPageSize={pageSize}
          paginationPageSizeSelector={pageSizeList}
          pagination={enablePagination}
          suppressRowTransform={searchRowSpanIndex !== -1 ? true : false}
          onPaginationChanged={onPaginationChanged}
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
    </>
  );
}

export default AppTable;
