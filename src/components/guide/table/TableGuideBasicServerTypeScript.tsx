import withSourceView from '@/hooks/withSourceView';
import { useState, useEffect, useRef } from 'react';
import { AgGridReact } from '@ag-grid-community/react';
import { userColumnInfos } from '@/data/grid/table-column';
import ApiService from '@/services/ApiService';
import { IUser } from '@/types/grid';
import { ColDef, ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
ModuleRegistry.registerModules([ClientSideRowModelModule]);

function TableGuideBasicServerTypeScript() {
  const gridRef = useRef();
  const [rowData, setRowData] = useState<IUser[]>([]);
  const [columnInfos] = useState<ColDef<IUser>[]>(userColumnInfos);

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

export default withSourceView(TableGuideBasicServerTypeScript);
