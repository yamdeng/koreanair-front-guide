import { useState, useEffect, useCallback } from 'react';
import UserSelectModal from '../modal/UserSelectModal';
import UserSelectWithOrgTreeModal from '../modal/UserSelectWithOrgTreeModal';
import AppSearchInput from './AppSearchInput';
import ApiService from '@/services/ApiService';

function AppUserSelectInput(props) {
  const { value, onChange, withOrgTree = false, ...rest } = props;
  const [isUserSelectModalopen, setIsUserSelectModalopen] = useState(false);
  const [selectUserInfo, setSelectUserInfo] = useState(null);

  const clearHandler = () => {
    onChange(null);
    setSelectUserInfo(null);
  };

  const handleOrgSelectModal = (selectedValue) => {
    if (selectedValue) {
      setSelectUserInfo(selectedValue);
      onChange(selectedValue.userId);
    }
    setIsUserSelectModalopen(false);
  };

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
      <AppSearchInput
        {...rest}
        disabled
        search={() => setIsUserSelectModalopen(true)}
        clearHandler={clearHandler}
        value={searchInputValue}
      />
      {withOrgTree ? (
        <UserSelectWithOrgTreeModal
          isOpen={isUserSelectModalopen}
          closeModal={() => setIsUserSelectModalopen(false)}
          isMultiple={false}
          ok={handleOrgSelectModal}
        />
      ) : (
        <UserSelectModal
          isOpen={isUserSelectModalopen}
          closeModal={() => setIsUserSelectModalopen(false)}
          isMultiple={false}
          ok={handleOrgSelectModal}
        />
      )}
    </>
  );
}

export default AppUserSelectInput;
