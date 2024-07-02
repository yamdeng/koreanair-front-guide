import AppTable from '@/components/common/AppTable';
import { getAllData } from '@/data/grid/example-data-new';
import { testColumnInfos } from '@/data/grid/table-column';
import withSourceView from '@/hooks/withSourceView';
import CommonUtil from '@/utils/CommonUtil';

function AppTableBasic7() {
  return (
    <>
      <AppTable
        rowData={getAllData()}
        columns={CommonUtil.mergeColumnInfosByLocal(testColumnInfos)}
        useColumnDynamicSetting
      />
    </>
  );
}

export default withSourceView(AppTableBasic7);
