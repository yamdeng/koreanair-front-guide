import ApiService from '@/services/ApiService';
import { useCallback, useEffect, useState } from 'react';
import AppTextInput from './AppTextInput';

function AppUserReadOnlyInput(props) {
  const { value, ...rest } = props;
  const [selectUserInfo, setSelectUserInfo] = useState(null);

  const searchInputValue = selectUserInfo ? selectUserInfo.nameKor : '';

  const searchUser = useCallback(
    async (userId) => {
      const apiUrl = import.meta.env.VITE_API_URL_USERS + '/' + userId;
      const apiResult = await ApiService.get(apiUrl);
      const data = apiResult.data;
      setSelectUserInfo(data);
    },
    [value]
  );

  useEffect(() => {
    if (value) {
      searchUser(value);
    }
  }, [value]);

  return (
    <>
      <AppTextInput {...rest} disabled value={searchInputValue} />
    </>
  );
}

export default AppUserReadOnlyInput;
