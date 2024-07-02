import AppTable from '@/components/common/AppTable';
import { testColumnInfos } from '@/data/grid/table-column';
import withSourceView from '@/hooks/withSourceView';
import { getAllData } from '@/data/grid/example-data-new';

function AppTableColumnLabelAlign() {
  const rowData = getAllData();
  const columns = testColumnInfos;

  return (
    <>
      <AppTable rowData={rowData} columns={columns} />
    </>
  );
}

export default withSourceView(AppTableColumnLabelAlign);
