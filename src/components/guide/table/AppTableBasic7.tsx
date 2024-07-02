import AppTable from '@/components/common/AppTable';
import { getAllData } from '@/data/grid/example-data-new';
import { testColumnInfos } from '@/data/grid/table-column';
import withSourceView from '@/hooks/withSourceView';
import CommonUtil from '@/utils/CommonUtil';

function AppTableBasic7() {
  const positionGetter = (params) => {
    return params.data ? params.data.position : '';
  };

  const linkColumnInfos = testColumnInfos;
  linkColumnInfos[2].enableRowSpan = true;
  linkColumnInfos[3].valueGetter = positionGetter;
  const rowData = CommonUtil.applyGroupingRowSpanByPageSize(getAllData(), linkColumnInfos[2].field, 10);
  return (
    <>
      <AppTable
        rowData={rowData}
        columns={CommonUtil.mergeColumnInfosByLocal(linkColumnInfos)}
        enablePagination={true}
        pageSize={10}
        pageSizeList={[10, 20, 30]}
      />
    </>
  );
}

export default withSourceView(AppTableBasic7);
