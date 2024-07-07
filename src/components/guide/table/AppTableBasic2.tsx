import withSourceView from '@/hooks/withSourceView';
import AppTable from '@/components/common/AppTable';
import { getAllData } from '@/data/grid/example-data-new';
import { testColumnInfos } from '@/data/grid/table-column';

function AppTableBasic2() {
  const handleRowDoubleClick = (selectedInfo) => {
    console.log(`selectedInfo : ${selectedInfo}`);
  };

  const handleRowSelect = (selectedInfo) => {
    console.log(`selectedInfo : ${selectedInfo}`);
  };

  return (
    <>
      <AppTable
        rowData={getAllData()}
        columns={testColumnInfos}
        handleRowDoubleClick={handleRowDoubleClick}
        handleRowSelect={handleRowSelect}
        enableCheckBox
      />
    </>
  );
}

export default withSourceView(AppTableBasic2);
