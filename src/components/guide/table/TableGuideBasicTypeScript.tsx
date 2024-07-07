import withSourceView from '@/hooks/withSourceView';
import { getAllData } from '@/data/grid/example-data-new';
import { testSimpleColumnInfos } from '@/data/grid/table-column';
import { AgGridReact } from '@ag-grid-community/react';
import { useEffect, useRef, useState } from 'react';
import { ITest } from '@/types/grid';
import { ColDef, ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
ModuleRegistry.registerModules([ClientSideRowModelModule]);

function TableGuideBasicTypeScript() {
  const gridRef = useRef();
  const [rowData, setRowData] = useState<ITest[]>([]);
  const [columnInfos] = useState<ColDef<ITest>[]>(testSimpleColumnInfos);

  useEffect(() => {
    setRowData(getAllData());
  }, []);

  return (
    <div className="ag-theme-quartz" style={{ height: 500 }}>
      <AgGridReact ref={gridRef} rowData={rowData} columnDefs={columnInfos} />
    </div>
  );
}

export default withSourceView(TableGuideBasicTypeScript);
