import AppTable from '@/components/common/AppTable';
import { getAllData } from '@/data/grid/example-data-new';
import { testColumnInfos } from '@/data/grid/table-column';
import withSourceView from '@/hooks/withSourceView';

function AppTableBasic3() {
  return (
    <>
      <AppTable rowData={getAllData()} columns={testColumnInfos} enablePagination />
    </>
  );
}

export default withSourceView(AppTableBasic3);
