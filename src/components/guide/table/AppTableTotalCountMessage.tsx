import withSourceView from '@/hooks/withSourceView';
import AppTable from '@/components/common/AppTable';
import { testColumnInfos } from '@/data/grid/table-column';
import { getAllData } from '@/data/grid/example-data-new';

/*

  total count 메시지 예시
   -props로 displayTableLoading를 전달하면 됨

*/
function AppTableTotalCountMessage() {
  const rowData = getAllData();
  const columns = testColumnInfos;
  const gridTotalCountTemplate = '보고서 {0} 건';

  return (
    <>
      <AppTable rowData={rowData} columns={columns} gridTotalCountTemplate={gridTotalCountTemplate} />
    </>
  );
}

export default withSourceView(AppTableTotalCountMessage);
