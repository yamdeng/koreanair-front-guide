import ApiService from '@/services/ApiService';
import CommonUtil from '@/utils/CommonUtil';
import { Select } from 'antd';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import CommonInputError from './CommonInputError';
import CommonInputToolTip from './CommonInputToolTip';

/*

   #.공통 속성
    -id(string) : 에러발생시 포커스 이동시키기 위한 id
    -name(string) : yup에 등록되는 키값과 동일시키는 것을 추천
    -label(string)  : 라벨(input 상단에 표시되는 라벨)
    -value : 각 컴포넌트 타입에 따라 value 타입이 달라질 수 있음 
    -onChange : 각 컴포넌트 타입에 따라 함수 spec이 달라질 수 있음
    -placeholder : label 속성외의 placeholder를 보여주고 싶을때 사용
    -required : 필수 여부(라벨에 '*' 표시)
    -errorMessage(string) : 에러메시지가 존재시 border가 red로 바뀌고 input 하단에 에러메시지가 표기됨. 메시지 키값을 전달시 해당 키값이 반영됨
    -disabled(boolean)
    -style({}) : react의 style object({}) 형식으로 전달

   #.<AppSelect /> 전용 속성
    -value(string || string[])
    -onChange(string || string[], event)
    -options(object[]) : {[{ label: '라벨', value: '값' }]}
    -isMultiple(boolean) : false(다중선택 여부)
    -applyAllSelect(boolean) : false
    -allValue(string) : 전체 선택시 value 값(applyAllSelect 값이 true인 경우만 반영)
    -allLabel(string)
    -labelKey(string) : 'label'
    -valueKey(string) : 'value'
    -apiUrl : 원격으로 select 정보를 가져올때 사용

*/
function AppSelect(props) {
  const {
    id = CommonUtil.getUUID(),
    name = '',
    label,
    value,
    onChange,
    placeholder = '',
    required = false,
    errorMessage,
    disabled = false,
    style = { width: '100%' },
    options = [],
    isMultiple = false,
    applyAllSelect = false,
    allValue = '',
    allLabel = 'ALL',
    apiUrl = '',
    labelKey = 'label',
    valueKey = 'value',
    showSearch = true,
    labelOnlyTop = false,
    toolTipMessage = '',
    ...rest
  } = props;

  const [isFocused, setIsFocused] = useState(false);
  const [stateOptions, setStateOptions] = useState([]);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const rawOptions = apiUrl ? stateOptions : options;
  const applyOptions = applyAllSelect ? [{ [labelKey]: allLabel, [valueKey]: allValue }, ...rawOptions] : rawOptions;
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
    selected: isSelectedClass || labelOnlyTop || applyAllSelect || placeholder,
  });

  useEffect(() => {
    if (apiUrl) {
      ApiService.get(`${apiUrl}`).then((apiResult) => {
        const data = apiResult.data;
        setStateOptions(data);
      });
    }
  }, [apiUrl]);

  return (
    <>
      <Select
        {...rest}
        mode={isMultiple ? 'multiple' : ''}
        status={!isFocused && errorMessage ? 'error' : ''}
        style={style}
        className={applyClassName}
        id={id}
        name={name}
        value={value}
        options={applyOptions}
        placeholder={placeholder}
        disabled={disabled}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        fieldNames={{ label: labelKey, value: valueKey }}
        showSearch={showSearch}
        notFoundContent={null}
        optionFilterProp={labelKey}
      ></Select>
      <label className="f-label" htmlFor={id} style={{ display: label ? '' : 'none' }}>
        {label} {required ? <span className="required">*</span> : null}
        <CommonInputToolTip toolTipMessage={toolTipMessage} />
      </label>
      <CommonInputError errorMessage={errorMessage} label={label} />
    </>
  );
}

export default AppSelect;
