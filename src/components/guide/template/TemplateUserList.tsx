import { useState, useEffect, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { userColumnInfos } from '@/data/grid/table-column';
import ApiService from '@/services/ApiService';

export default function TemplateUserList() {
  const gridRef = useRef();
  const [rowData, setRowData] = useState([]);
  const [columnInfos] = useState(userColumnInfos as any);

  const search = async () => {
    const response = await ApiService.get('users');
    const data = response.data.data;
    setRowData(data);
  };

  useEffect(() => {
    search();
  }, []);

  return (
    <div className="ag-theme-quartz" style={{ height: 500 }}>
      <AgGridReact ref={gridRef} rowData={rowData} columnDefs={columnInfos} />
    </div>
  );
}
