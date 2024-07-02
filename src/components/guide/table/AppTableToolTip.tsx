import AppTable from '@/components/common/AppTable';
import { testColumnInfos } from '@/data/grid/table-column';
import withSourceView from '@/hooks/withSourceView';
import { getAllData } from '@/data/grid/example-data-new';

/*

  툴팁 예제

*/

function CustomTooltip(params) {
  return (
    <div className="custom-tooltip">
      <div>
        <b>Custom Tooltip</b>
      </div>
      <div>{params.value}</div>
    </div>
  );
}

function AppTableToolTip() {
  const rowData = getAllData();
  const columns = testColumnInfos;

  columns[0].tooltipField = 'deptName'; // 툴팁의 키값을 정의
  columns[0].headerTooltip = '헤더 툴팁2'; // 헤더 툴팁

  // 툴팁 custom getter
  columns[1].tooltipValueGetter = (params) => {
    console.log(params);
    // params.value, params.data
    return '툴팁메시지';
  };

  // 커스텀 컴포넌트로 정의
  columns[2].tooltipComponent = CustomTooltip;

  return (
    <>
      <AppTable rowData={rowData} columns={testColumnInfos} />
    </>
  );
}

export default withSourceView(AppTableToolTip);
