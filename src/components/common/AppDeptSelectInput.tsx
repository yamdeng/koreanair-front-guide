import { useState, useCallback, useEffect } from 'react';
import OrgTreeSelectModal from '../modal/OrgTreeSelectModal';
import AppSearchInput from './AppSearchInput';
import ApiService from '@/services/ApiService';

function AppDeptSelectInput(props) {
  const { value, onChange, ...rest } = props;
  const [isOrgSelectModalopen, setIsOrgSelectModalopen] = useState(false);
  const [selectDeptInfo, setSelectDeptInfo] = useState(null);

  const clearHandler = () => {
    onChange(null);
    setSelectDeptInfo(null);
  };

  const handleOrgSelectModal = (selectedValue) => {
    if (selectedValue) {
      setSelectDeptInfo(selectedValue);
      onChange(selectedValue.deptCd);
    }
    setIsOrgSelectModalopen(false);
  };

  const searchInputValue = selectDeptInfo ? selectDeptInfo.nameKor : '';

  const searchDept = useCallback(
    async (deptCd) => {
      const apiUrl = import.meta.env.VITE_API_URL_DEPTS + '/code/' + deptCd;
      const apiResult = await ApiService.get(apiUrl);
      const data = apiResult.data;
      setSelectDeptInfo(data);
    },
    [value]
  );

  useEffect(() => {
    if (value) {
      searchDept(value);
    }
  }, [value]);

  return (
    <>
      <AppSearchInput
        {...rest}
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
