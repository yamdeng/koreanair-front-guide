import withSourceView from '@/hooks/withSourceView';
import AppTable from '@/components/common/AppTable';
import { testColumnInfos } from '@/data/grid/table-column';
import { getAllData } from '@/data/grid/example-data-new';

/*

  컬럼에 커스텀 컴포넌트 적용

*/

function CustomColumnComponent(params) {
  return <div style={{ fontWeight: 'bold', textDecoration: 'underline' }}>{params.value}</div>;
}

function AppTableCustomColumn() {
  const rowData = getAllData();
  const columns = testColumnInfos;

  // custom 컴포넌트 적용
  columns[2].cellRenderer = (params) => {
    return (
      <>
        <span onClick={() => alert('custom render')}>
          custom component is <b>{params.value}</b>
        </span>
      </>
    );
  };

  columns[3].cellRenderer = CustomColumnComponent;

  return (
    <>
      <AppTable rowData={rowData} columns={testColumnInfos} />
    </>
  );
}

export default withSourceView(AppTableCustomColumn);
