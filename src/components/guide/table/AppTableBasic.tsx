import AppTable from '@/components/common/AppTable';
import { getAllData } from '@/data/grid/example-data-new';
import { testColumnInfos } from '@/data/grid/table-column';
import withSourceView from '@/hooks/withSourceView';
import { useRef } from 'react';

/*

  <AppTable/> 기본 예시
   -useRef 훅으로 ag-grid 인스턴스 얻어오기
  
  #.가이드시 사용한 헤더 목록 정보 : docs\테스트컬럼정보.json 파일 참고

*/
function AppTableBasic() {
  const gridApiRef = useRef<any>(null);
  const rowData = getAllData();
  const columns = testColumnInfos;

  const onGridReady = (event) => {
    // 외부에서 api 인스턴스를 직접 사용하고 싶을 경우에 사용
    gridApiRef.current = event.api;
  };

  // <AppTable/> 정의된 column 기본 정책 변경시 직접 전달
  // const defaultColDef = {
  //   sortable: false,
  // };

  return (
    <>
      <AppTable rowData={rowData} columns={columns} onGridReady={onGridReady} />
    </>
  );
}

export default withSourceView(AppTableBasic);
