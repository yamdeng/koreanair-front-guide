import withSourceView from '@/hooks/withSourceView';
import AppTable from '@/components/common/AppTable';
import { testColumnInfos } from '@/data/grid/table-column';
import { getAllData } from '@/data/grid/example-data-new';

/*

  페이징 예시

*/
function AppTablePagination() {
  const rowData = getAllData();
  const columns = testColumnInfos;

  return (
    <>
      <AppTable rowData={rowData} columns={columns} enablePagination={true} pageSize={10} pageSizeList={[10, 20, 30]} />
    </>
  );
}

export default withSourceView(AppTablePagination);
