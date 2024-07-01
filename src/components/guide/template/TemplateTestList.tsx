import withSourceView from '@/hooks/withSourceView';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AgGridReact } from 'ag-grid-react';
import { userColumnInfos } from '@/data/grid/table-column';
import ApiService from '@/services/ApiService';

function TemplateTestList() {
  const gridRef = useRef();
  const navigate = useNavigate();
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
    <>
      <div>
        <button
          onClick={() => {
            navigate('/template/tests/add/form');
          }}
        >
          add
        </button>
      </div>
      <div className="ag-theme-quartz" style={{ height: 500 }}>
        <AgGridReact ref={gridRef} rowData={rowData} columnDefs={columnInfos} />
      </div>
    </>
  );
}

export default withSourceView(TemplateTestList);
