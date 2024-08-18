import { useState } from 'react';
import OrgTreeSelectModal from '../modal/OrgTreeSelectModal';
import AppSearchInput from './AppSearchInput';

function AppDeptSelectInput(props) {
  const { value, onChange } = props;
  const [isOrgSelectModalopen, setIsOrgSelectModalopen] = useState(false);

  const clearHandler = () => {
    onChange(null);
  };

  const handleOrgSelectModal = (selectedValue) => {
    onChange(selectedValue, selectedValue ? selectedValue.deptCd : '');
    setIsOrgSelectModalopen(false);
  };

  const searchInputValue = value ? value.nameKor : '';

  return (
    <>
      <AppSearchInput
        {...props}
        disabled
        search={() => setIsOrgSelectModalopen(true)}
        clearHandler={clearHandler}
        value={searchInputValue}
      />
      <OrgTreeSelectModal
        isOpen={isOrgSelectModalopen}
        closeModal={() => setIsOrgSelectModalopen(false)}
        isMultiple={false}
        ok={handleOrgSelectModal}
      />
    </>
  );
}

export default AppDeptSelectInput;
