import ApiService from '@/services/ApiService';
import { useCallback, useEffect, useState } from 'react';
import AppTextInput from './AppTextInput';

function AppDeptReadOnlyInput(props) {
  const { value, useIdColumn = false, ...rest } = props;
  const [selectDeptInfo, setSelectDeptInfo] = useState(null);

  const searchInputValue = selectDeptInfo ? selectDeptInfo.nameKor : '';

  const searchDept = useCallback(
    async (deptCd) => {
      const apiUrl = import.meta.env.VITE_API_URL_DEPTS + `/${useIdColumn ? 'id' : 'code'}/` + deptCd;
      const apiResult = await ApiService.get(apiUrl);
      const data = apiResult.data;
      setSelectDeptInfo(data);
    },
    [value, useIdColumn]
  );

  useEffect(() => {
    if (value) {
      searchDept(value);
    }
  }, [value]);

  return (
    <>
      <AppTextInput {...rest} disabled value={searchInputValue} />
    </>
  );
}

export default AppDeptReadOnlyInput;
