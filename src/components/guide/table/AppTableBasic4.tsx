import withSourceView from '@/hooks/withSourceView';
import AppTable from '@/components/common/AppTable';
import { getAllData } from '@/data/grid/example-data-new';
import { testColumnInfos } from '@/data/grid/table-column';
import CommonUtil from '@/utils/CommonUtil';

// location.pathname

function AppTableBasic4() {
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

export default withSourceView(AppTableBasic4);
