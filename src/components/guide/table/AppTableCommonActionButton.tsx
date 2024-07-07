import withSourceView from '@/hooks/withSourceView';
import AppTable from '@/components/common/AppTable';
import { testColumnInfos } from '@/data/grid/table-column';
import { getAllData } from '@/data/grid/example-data-new';

/*

  공통 action 컬럼 : 상세, 삭제 버튼

*/
function AppTableCommonActionButton() {
  const rowData = getAllData();
  const columns = testColumnInfos;
  const actionButtons = ['detail', 'delete'];

  const search = () => {
    alert('삭제 완료 후 목록 재조회');
  };

  return (
    <>
      <AppTable rowData={rowData} columns={columns} actionButtons={actionButtons} search={search} useActionButtons />
    </>
  );
}

export default withSourceView(AppTableCommonActionButton);
