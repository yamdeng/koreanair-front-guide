import { useState, useRef, useCallback } from 'react';
import Select, { components } from 'react-select';
import CommonUtil from '@/utils/CommonUtil';
import classNames from 'classnames';
import _ from 'lodash';
import ApiService from '@/services/ApiService';
import CommonInputError from './CommonInputError';

/*

  apiUrl
  labelKey = 'label'
  valueKey = 'value'
  onlySelect = true / false
  onSelect
  value
  onChange
  isValueString = true / false

*/
const CustomDropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      <button type="button" className="icon-sch" style={{ position: 'inherit' }}></button>
    </components.DropdownIndicator>
  );
};

function AppAutoComplete(props) {
  const {
    name = '',
    id = CommonUtil.getUUID(),
    label,
    value,
    onChange,
    placeholder = '',
    defaultOptions = [],
    required = false,
    errorMessage,
    style = { width: '100%' },
    disabled = false,
    isMultiple = false,
    apiUrl,
    labelKey = 'label',
    valueKey = 'value',
    onlySelect = false,
    onSelect,
    isValueString = false,
  } = props;

  const isServerLoaded = useRef(false);
  const [isFocused, setIsFocused] = useState(false);
  const [selectOptions, setSelectOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  // API 호출 함수
  const fetchOptions = useCallback(
    async (input) => {
      if (input.length < 1) return;
      setIsLoading(true);

      try {
        isServerLoaded.current = true;
        const apiResult = await ApiService.get(
          `${apiUrl}`,
          {
            searchWord: input,
          },
          { disableLoadingBar: true }
        );
        const data = apiResult.data || [];

        setSelectOptions(data);
      } catch (error) {
        console.error('Failed to fetch options:', error);
      } finally {
        setIsLoading(false);
      }
    },
    [apiUrl]
  );

  // debounce를 사용하여 입력 후 500ms 동안 추가 입력이 없을 때만 API 호출
  const debouncedFetchOptions = useCallback(_.debounce(fetchOptions, 500), []);

  // inputValue가 변경될 때마다 호출
  const handleInputChange = (newValue) => {
    debouncedFetchOptions(newValue);
  };

  const handleOnChange = useCallback(
    (selectedValue) => {
      let applySelectedValue = selectedValue;
      if (isValueString) {
        if (Array.isArray(selectedValue)) {
          applySelectedValue = selectedValue.map((info) => info[valueKey]);
        } else {
          applySelectedValue = selectedValue ? selectedValue[valueKey] : '';
        }
      }

      if (onlySelect) {
        onSelect(applySelectedValue);
      } else {
        onChange(applySelectedValue);
      }
    },
    [isValueString, onlySelect, valueKey]
  );

  let isSelectedClass = false;
  if (value) {
    if (Array.isArray(value)) {
      if (value.length) {
        isSelectedClass = true;
      }
    } else {
      isSelectedClass = true;
    }
  }

  const applyClassName = classNames('label-select', {
    selected: isSelectedClass || placeholder,
    focused: isFocused,
    disabled: disabled,
  });

  let applyValue = value;
  if (onlySelect) {
    applyValue = null;
  }

  if (isValueString) {
    applyValue = selectOptions.find((option) => option.value === value);
  }
  let applyOptions = selectOptions;
  if (defaultOptions && defaultOptions.length) {
    if (!isServerLoaded.current) {
      applyOptions = defaultOptions;
    }
  }

  return (
    <>
      <div className={applyClassName}>
        <Select
          {...props}
          components={{ DropdownIndicator: CustomDropdownIndicator }}
          id={id}
          name={name}
          value={applyValue}
          onInputChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleOnChange}
          options={applyOptions}
          isMulti={isMultiple}
          isLoading={isLoading}
          classNames={{
            control: (state) => (!state.isFocused && errorMessage ? 'select-in-valid' : ''),
          }}
          placeholder={placeholder}
          style={style}
          isDisabled={disabled}
          getOptionLabel={(info) => {
            return info[labelKey];
          }}
          getOptionValue={(info) => {
            return info[valueKey];
          }}
        />
      </div>
      <label className="f-label" htmlFor={id} style={{ display: label ? '' : 'none' }}>
        {label} {required ? <span className="required">*</span> : null}
      </label>
      <CommonInputError errorMessage={errorMessage} label={label} />
    </>
  );
}

export default AppAutoComplete;
