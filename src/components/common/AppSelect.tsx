import { useState } from 'react';
import { Select } from 'antd';
import CommonUtil from '@/utils/CommonUtil';
import classNames from 'classnames';

/*

    <AppSelect 
      id={''}
      name={'id와 동일하기 전달'}
      label={''}
      value={value}
      options={[]}
      onChange={onChange}
      placeholder=''
      required={true}
      errorMessage=''
      applyAllSelect={true}
      allValue=''
      style={{width: '100%'}}
      labelOnlyTop={true}
    />

*/
function AppSelect(props) {
  const {
    name = '',
    id = CommonUtil.getUUID(),
    label,
    value,
    options = [],
    onChange,
    placeHolder = '',
    required = false,
    errorMessage,
    applyAllSelect = false,
    allValue = '',
    style = { width: '100%' },
    labelOnlyTop = false,
  } = props;

  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const applyOptions = applyAllSelect ? [{ label: '전체', value: allValue }, ...options] : options;
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
    selected: isSelectedClass || labelOnlyTop || applyAllSelect,
  });
  return (
    <>
      <Select
        {...props}
        status={!isFocused && errorMessage ? 'error' : ''}
        style={style}
        className={applyClassName}
        id={id}
        name={name}
        value={value}
        options={applyOptions}
        placeholder={placeHolder}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      ></Select>
      <label className="f-label" htmlFor={id} style={{ display: label ? '' : 'none' }}>
        {label} {required ? <span className="required">*</span> : null}
      </label>
      <span className="errorText" style={{ display: errorMessage ? '' : 'none' }}>
        {errorMessage}
      </span>
    </>
  );
}

export default AppSelect;
