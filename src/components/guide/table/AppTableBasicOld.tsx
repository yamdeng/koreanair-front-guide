import AppTable from '@/components/common/AppTable';
import { testColumnInfos } from '@/data/grid/table-column';
import withSourceView from '@/hooks/withSourceView';
import { getAllDataPromise } from '@data/grid/example-data-promise';
import { useEffect, useState } from 'react';

function AppTableBasic() {
  const [displayTableLoading, setDisplayTableLoading] = useState(false);
  const [rowData, setRowData] = useState([]);

  const search = async () => {
    const data: any = await getAllDataPromise();
    setDisplayTableLoading(false);
    setRowData(data);
  };

  useEffect(() => {
    setDisplayTableLoading(true);
    search();
  }, []);

  return (
    <>
      <AppTable rowData={rowData} columns={testColumnInfos} displayTableLoading={displayTableLoading} />
    </>
  );
}

export default withSourceView(AppTableBasic);
