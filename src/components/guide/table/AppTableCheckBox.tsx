import withSourceView from '@/hooks/withSourceView';
import AppTable from '@/components/common/AppTable';
import { testColumnInfos } from '@/data/grid/table-column';
import { getAllData } from '@/data/grid/example-data-new';
import { useState, useRef } from 'react';

/*

  체크박스 적용 : single, multiple 선택 적용 여부

*/
function AppTableCheckBox() {
  const gridApiRef = useRef<any>(null);
  const [selectedRowInfos, setSelectedRowInfos] = useState([]);
  const rowData = getAllData();
  const columns = testColumnInfos;

  // rowSelectMode = 'single' 이여도 array[] 형식으로 반환함
  const handleRowSelect = (selectedRowList) => {
    console.log(`selectedInfo : ${selectedRowList}`);
    setSelectedRowInfos(selectedRowList);
  };

  // const rowSelectMode = 'single'; // 체크박스 선택을 하나만 선택 가능
  const rowSelectMode = 'multiple'; // 체크박스 선택을 다수 선택 가능(공통컴포넌트의 기본값)

  // const onGridReady = (event) => {
  //   // 외부에서 api 인스턴스를 직접 사용하고 싶을 경우에 사용
  //   gridApiRef.current = event.api;
  // };

  const alertSelectedCountsByApiInstane = () => {
    // api 인스턴스를 이용하여 선택한 값 가져오기
    if (gridApiRef && gridApiRef.current) {
      const selectedRows = gridApiRef.current.getSelectedRows();
      const count = selectedRows.length;
      alert(`count : ${count}`);
    }
  };

  return (
    <>
      <p>선택된 건수 {selectedRowInfos.length}</p>
      <p>
        <button onClick={alertSelectedCountsByApiInstane}>api 인스턴스로 선택한 정보 가져오기</button>
      </p>
      <AppTable
        rowData={rowData}
        columns={columns}
        enableCheckBox
        handleRowSelect={handleRowSelect}
        rowSelectMode={rowSelectMode}
        ref={gridApiRef}
      />
    </>
  );
}

export default withSourceView(AppTableCheckBox);
