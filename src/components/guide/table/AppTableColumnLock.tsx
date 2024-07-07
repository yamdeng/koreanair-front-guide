import withSourceView from '@/hooks/withSourceView';
import AppTable from '@/components/common/AppTable';
import { testColumnInfos } from '@/data/grid/table-column';
import { getAllData } from '@/data/grid/example-data-new';

/*

  컬럼 Lock 반영

*/
function AppTableColumnLock() {
  const rowData = getAllData();
  const columns = testColumnInfos;
  columns[10].pinned = 'right';
  columns[11].pinned = 'right';

  return (
    <>
      <AppTable rowData={rowData} columns={columns} />
    </>
  );
}

export default withSourceView(AppTableColumnLock);
