import Config from '@/config/Config';
import { AgGridReact } from 'ag-grid-react';
import { useRef } from 'react';

function AppTable(props) {
  const gridRef = useRef();
  const { rowData, columns, tableHeight } = props;

  const onGridReady = () => {
    onGridReady();
  };

  return (
    <>
      <div className="ag-theme-quartz" style={{ height: tableHeight ? tableHeight : Config.defaultGridHeight }}>
        <AgGridReact ref={gridRef} rowData={rowData} columnDefs={columns} onGridReady={onGridReady} />
      </div>
    </>
  );
}

export default AppTable;
