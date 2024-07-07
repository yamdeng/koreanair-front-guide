import withSourceView from '@/hooks/withSourceView';
import AppTable from '@/components/common/AppTable';
import { getAllData } from '@/data/grid/example-data-new';
import { testColumnInfos } from '@/data/grid/table-column';
import CommonUtil from '@/utils/CommonUtil';

function AppTableBasic6() {
  const search = () => {
    console.log('search call');
  };
  return (
    <>
      <AppTable
        rowData={getAllData()}
        columns={CommonUtil.mergeColumnInfosByLocal(testColumnInfos)}
        actionButtons={['detail', 'delete']}
        search={search}
        useActionButtons
      />
    </>
  );
}

export default withSourceView(AppTableBasic6);
