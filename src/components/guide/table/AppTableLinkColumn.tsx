import withSourceView from '@/hooks/withSourceView';
import AppTable from '@/components/common/AppTable';
import { testColumnInfos } from '@/data/grid/table-column';
import { getAllData } from '@/data/grid/example-data-new';

/*

  링크 컬럼 반영

*/
function AppTableLinkColumn() {
  const rowData = getAllData();
  const columns = testColumnInfos;
  columns[0].isLink = true;
  columns[0].linkPath = '/aviation/reports';
  // columns[0].detailPath = 'child.id'; // 데이터가 1차 depth가 아니여도 반영
  columns[0].detailPath = 'name';

  return (
    <>
      <AppTable rowData={rowData} columns={columns} />
    </>
  );
}

export default withSourceView(AppTableLinkColumn);
