import AppTable from '@/components/common/AppTable';
import { getAllData } from '@/data/grid/example-data-new';
import { testColumnInfos } from '@/data/grid/table-column';
import withSourceView from '@/hooks/withSourceView';
import CommonUtil from '@/utils/CommonUtil';

function AppTableBasic7() {
  const linkColumnInfos = testColumnInfos;
  linkColumnInfos[2].enableRowSpan = true;

  const rowData = getAllData();
  CommonUtil.applyGroupingRowSpanByPageSize(rowData, 'position');
  return (
    <>
      <AppTable rowData={rowData} columns={CommonUtil.mergeColumnInfosByLocal(linkColumnInfos)} />
    </>
  );
}

export default withSourceView(AppTableBasic7);
