import Config from '@/config/Config';
import { AgGridReact } from 'ag-grid-react';
import { useEffect, useMemo, useRef, useCallback } from 'react';

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
    tableHeight,
    noDataMessage = Config.defaultGridNoDataMessage,
    displayTableLoading,
    handleRowDoubleClick,
    handleRowSelect,
    rowSelectMode = 'multiple',
    enableCheckBox,
    pageSize = Config.defaultGridPageSize,
    enablePagination = false,
  } = props;

  if (enableCheckBox) {
    columns[0].headerCheckboxSelection = true;
    columns[0].checkboxSelection = true;
    columns[0].showDisabledCheckboxes = true;
  }

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

  useEffect(() => {
    if (gridRef && gridRef.current && gridRef.current.api) {
      if (displayTableLoading) {
        gridRef.current.api.showLoadingOverlay();
      } else {
        gridRef.current.api.hideOverlay();
      }
    }
  }, [displayTableLoading]);

  return (
    <>
      <div className="ag-theme-quartz" style={{ height: tableHeight ? tableHeight : Config.defaultGridHeight }}>
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columns}
          loadingOverlayComponent={loadingOverlayComponent}
          loadingOverlayComponentParams={loadingOverlayComponentParams}
          overlayNoRowsTemplate={noDataMessage}
          onSelectionChanged={onSelectionChanged}
          onRowDoubleClicked={handleRowDoubleClick}
          rowSelection={rowSelectMode}
          suppressRowClickSelection={true}
          paginationPageSize={pageSize}
          paginationPageSizeSelector={Config.defaultPageSizeList}
          pagination={enablePagination}
        />
      </div>
    </>
  );
}

export default AppTable;
