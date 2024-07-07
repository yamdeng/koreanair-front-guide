import withSourceView from '@/hooks/withSourceView';
import AppTable from '@/components/common/AppTable';
import { testColumnInfos } from '@/data/grid/table-column';
import { getAllData } from '@/data/grid/example-data-new';

/*

  csv export 예시
   -props로 displayCSVExportButton:true를 전달하면 됨

*/
function AppTableCSVExport() {
  const rowData = getAllData();
  const columns = testColumnInfos;

  return (
    <>
      <AppTable rowData={rowData} columns={columns} displayCSVExportButton />
    </>
  );
}

export default withSourceView(AppTableCSVExport);
