import withSourceView from '@/hooks/withSourceView';
import AppTable from '@/components/common/AppTable';
import { testColumnInfos } from '@/data/grid/table-column';
import { getAllDataPromise } from '@/data/grid/example-data-promise';
import { useEffect, useState } from 'react';

/*

  로딩바 예시
   -props로 displayTableLoading를 전달하면 됨

*/
function AppTableLoadingBar() {
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

export default withSourceView(AppTableLoadingBar);
