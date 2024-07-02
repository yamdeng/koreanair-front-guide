import AppTable from '@/components/common/AppTable';
import { testColumnInfos } from '@/data/grid/table-column';
import withSourceView from '@/hooks/withSourceView';
import { getAllData } from '@/data/grid/example-data-new';
import CommonUtil from '@/utils/CommonUtil';
import { useState } from 'react';

/*

  컬럼 동적 반영

*/
function AppTableColumnDynamic() {
  const rowData = getAllData();
  const [columns] = useState(CommonUtil.mergeColumnInfosByLocal(testColumnInfos));

  return (
    <>
      <AppTable rowData={rowData} columns={columns} useColumnDynamicSetting />
    </>
  );
}

export default withSourceView(AppTableColumnDynamic);
