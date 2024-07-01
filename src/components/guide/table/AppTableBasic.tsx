import { getAllData } from '@/data/grid/example-data-new';
import { testColumnInfos } from '@/data/grid/table-column';
import withSourceView from '@/hooks/withSourceView';
import AppTable from '@/components/common/AppTable';

function AppTableBasic() {
  return (
    <>
      <AppTable rowData={getAllData()} columns={testColumnInfos} />
    </>
  );
}

export default withSourceView(AppTableBasic);
