import withSourceView from '@/hooks/withSourceView';
import { getAllData } from '@/data/grid/example-data-new';
import { testColumnInfos } from '@/data/grid/table-column';
import { AgGridReact } from 'ag-grid-react';
import { useEffect, useRef, useState } from 'react';

function TableGuideBasic() {
  const gridRef = useRef();
  const [rowData, setRowData] = useState([]);
  const [columnInfos] = useState(testColumnInfos);

  useEffect(() => {
    setRowData(getAllData());
  }, []);

  return (
    <div className="ag-theme-quartz" style={{ height: 500 }}>
      <AgGridReact ref={gridRef} rowData={rowData} columnDefs={columnInfos} />
    </div>
  );
}

export default withSourceView(TableGuideBasic);
