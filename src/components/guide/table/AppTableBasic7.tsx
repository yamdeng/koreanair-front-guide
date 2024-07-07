import withSourceView from '@/hooks/withSourceView';
import AppTable from '@/components/common/AppTable';
import { getAllData } from '@/data/grid/example-data-new';
import { testColumnInfos } from '@/data/grid/table-column';
import CommonUtil from '@/utils/CommonUtil';

function AppTableBasic7() {
  const positionGetter = (params) => {
    return params.data ? params.data.position : '';
  };

  const linkColumnInfos = testColumnInfos;
  linkColumnInfos[2].enableRowSpan = true;

  // link 옵션 적용 가능
  // linkColumnInfos[2].isLink = true;
  // linkColumnInfos[2].linkPath = '/aviation/reports';
  // linkColumnInfos[2].detailPath = 'id';

  // custom 컴포넌트 적용
  linkColumnInfos[2].cellRenderer = (params) => {
    return (
      <>
        <span onClick={() => alert('custom render')}>
          Value is <b>{params.value}</b>
        </span>
      </>
    );
  };

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
