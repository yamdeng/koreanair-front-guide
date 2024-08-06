import { useState } from 'react';
import { TreeSelect } from 'antd';
import CommonUtil from '@/utils/CommonUtil';
import classNames from 'classnames';

/*

    <AppTreeSelect 
      id={''}
      name={'id와 동일하기 전달'}
      label={''}
      value={value}
      options={[]}
      onChange={onChange}
      placeholder=''
      required={true}
      errorMessage=''
      allValue=''
      style={{width: '100%'}}
      labelOnlyTop={true}
    />

*/
function AppTreeSelect(props) {
  const {
    name = '',
    id = CommonUtil.getUUID(),
    label,
    value,
    treeData = [],
    onChange,
    placeHolder = '',
    required = false,
    errorMessage,
    style = { width: '100%' },
    labelOnlyTop = false,
    showSearch = false,
    treeCheckable = true,
  } = props;

  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

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
    selected: isSelectedClass || labelOnlyTop,
  });
  return (
    <>
      <TreeSelect
        {...props}
        status={!isFocused && errorMessage ? 'error' : ''}
        style={style}
        className={applyClassName}
        dropdownStyle={{
          maxHeight: 400,
          overflow: 'auto',
        }}
        id={id}
        name={name}
        value={value}
        placeholder={placeHolder}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        treeData={treeData}
        showSearch={showSearch}
        treeCheckable={treeCheckable}
      ></TreeSelect>
      <label className="f-label" htmlFor={id} style={{ display: label ? '' : 'none' }}>
        {label} {required ? <span className="required">*</span> : null}
      </label>
      <span className="errorText" style={{ display: errorMessage ? '' : 'none' }}>
        {errorMessage}
      </span>
    </>
  );
}

export default AppTreeSelect;
