import { useState, useCallback } from 'react';
import Select from 'react-select';
import _ from 'lodash';
import ApiService from '@/services/ApiService';

function GuideAppAutoCompleteRaw() {
  const [selectValue, setSelectValue] = useState(null);
  const [selectUser, setSelectUser] = useState(null);
  const [selectValue2, setSelectValue2] = useState(null);
  const [selectOptions, setSelectOptions] = useState([]);
  const [userList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [onlyKeyValue, setOnlyKeyValue] = useState(null);

  const handleOnlyKeyChange = (valueInfo) => {
    if (Array.isArray(valueInfo)) {
      setOnlyKeyValue(valueInfo.map((info) => info.value));
    } else {
      setOnlyKeyValue(valueInfo ? valueInfo.value : '');
    }
  };

  // API 호출 함수
  const fetchOptions = async (input) => {
    if (input.length < 1) return; // 입력된 문자가 없으면 API 호출하지 않음
    setIsLoading(true);

    try {
      // 실제 API 호출 로직
      // com/users
      const apiResult = await ApiService.get(`com/users`, {
        searchWord: input,
      });
      const data = apiResult.data;

      // 받아온 데이터를 react-select 옵션 형식으로 변환
      const newOptions = data.map((item) => ({
        value: item.userId,
        label: item.nameKor,
      }));

      setUserList(data);
      setSelectOptions(newOptions);
    } catch (error) {
      console.error('Failed to fetch options:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // debounce를 사용하여 입력 후 500ms 동안 추가 입력이 없을 때만 API 호출
  const debouncedFetchOptions = useCallback(_.debounce(fetchOptions, 500), []);

  // inputValue가 변경될 때마다 호출
  const handleInputChange = (newValue) => {
    debouncedFetchOptions(newValue);
  };

  return (
    <>
      <h1>basic : selectValue</h1>
      <Select
        value={selectValue}
        onInputChange={handleInputChange}
        onChange={(value) => {
          setSelectValue(value);
        }}
        options={selectOptions}
        isLoading={isLoading}
        placeholder="Search..."
        noOptionsMessage={() => 'No options'}
        isMulti
      />
      <p>{JSON.stringify(selectValue)}</p>

      <h1>custom label, key : selectUser</h1>
      <Select
        value={selectUser}
        onInputChange={handleInputChange}
        onChange={(value) => {
          setSelectUser(value);
        }}
        options={userList}
        isLoading={isLoading}
        placeholder="Search..."
        noOptionsMessage={() => 'No options'}
        getOptionLabel={(info) => {
          return info['nameKor'];
        }}
        getOptionValue={(info) => {
          return info['userId'];
        }}
        isMulti
      />
      <p>{JSON.stringify(selectUser)}</p>

      <h1>onlySelect : selectValue2</h1>
      <Select
        value={null}
        onInputChange={handleInputChange}
        onChange={(value) => {
          setSelectValue2(value);
        }}
        options={selectOptions}
        isLoading={isLoading}
        placeholder="Search..."
        noOptionsMessage={() => 'No options'}
      />
      <p>{JSON.stringify(selectValue2)}</p>

      <h1>only key 만적용 : onlyKeyValue</h1>
      <Select
        value={selectOptions.find((option) => option.value === onlyKeyValue)}
        onInputChange={handleInputChange}
        onChange={(value) => {
          handleOnlyKeyChange(value);
        }}
        options={selectOptions}
        isLoading={isLoading}
        placeholder="Search..."
        noOptionsMessage={() => 'No options'}
        isMulti
      />
      <p>{JSON.stringify(onlyKeyValue)}</p>
    </>
  );
}
export default GuideAppAutoCompleteRaw;
