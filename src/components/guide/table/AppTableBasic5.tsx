import AppTable from '@/components/common/AppTable';
import { getAllData } from '@/data/grid/example-data-new';
import { testColumnInfos } from '@/data/grid/table-column';
import withSourceView from '@/hooks/withSourceView';

function AppTableBasic5() {
  const linkColumnInfos = testColumnInfos;
  linkColumnInfos[0].isLink = true;
  linkColumnInfos[0].linkPath = '/aviation/reports';
  // linkColumnInfos[0].detailPath = 'id';
  linkColumnInfos[0].detailPath = 'name';
  return (
    <>
      <AppTable rowData={getAllData()} columns={testColumnInfos} />
    </>
  );
}

export default withSourceView(AppTableBasic5);
