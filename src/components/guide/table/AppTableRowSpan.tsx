import withSourceView from '@/hooks/withSourceView';
import AppTable from '@/components/common/AppTable';
import { testColumnInfos } from '@/data/grid/table-column';
import { getAllData } from '@/data/grid/example-data-new';
import CommonUtil from '@/utils/CommonUtil';

/*

  Table rowspan 적용 방법 : Util 함수를 써야 함
   -바로 이전값과 비교를 해서 같으면 group으로 묶음

*/
function AppTableRowSpan() {
  const columns = testColumnInfos;
  columns[2].enableRowSpan = true; // rowspan 적용할 컬럼에 enableRowSpan=true을 반영

  // pageSize를 고려한 data convert
  const rowData = CommonUtil.applyGroupingRowSpanByPageSize(getAllData(), columns[2].field, 10);

  // columns[5].enableRowSpan = true;
  // const rowData = CommonUtil.applyGroupingRowSpanByPageSize(getAllData(), columns[5].field, 10);

  return (
    <>
      <AppTable rowData={rowData} columns={columns} enablePagination={true} pageSize={10} pageSizeList={[10, 20, 30]} />
    </>
  );
}

export default withSourceView(AppTableRowSpan);
