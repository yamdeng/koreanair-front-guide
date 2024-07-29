import withSourceView from '@/hooks/withSourceView';
import AppTable from '@/components/common/AppTable';
import { testColumnInfos } from '@/data/grid/table-column';
import { getAllData } from '@/data/grid/example-data-new';

/*

  더블 클릭 예시

*/
function AppTableDoubleClick() {
  const rowData = getAllData();
  const columns = testColumnInfos;

  const handleRowDoubleClick = (selectedInfo) => {
    console.log(`selectedInfo : ${selectedInfo}`);
    // selectedInfo.data 선택한 정보
    alert(`name : ${selectedInfo.data.name}`);
  };

  const handleRowSingleClick = (selectedInfo) => {
    // selectedInfo.data 선택한 정보
    console.log(`handleRowSingleClick selectedInfo : ${selectedInfo}`);
  };

  return (
    <>
      <AppTable
        rowData={rowData}
        columns={columns}
        handleRowDoubleClick={handleRowDoubleClick}
        handleRowSingleClick={handleRowSingleClick}
      />
    </>
  );
}

export default withSourceView(AppTableDoubleClick);
