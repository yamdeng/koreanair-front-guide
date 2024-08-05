import { useState } from 'react';
import Select, { components } from 'react-select';
import CommonUtil from '@/utils/CommonUtil';
import classNames from 'classnames';

const CustomDropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      <button type="button" className="icon-sch" style={{ position: 'inherit' }}></button>
    </components.DropdownIndicator>
  );
};

function AppAutoComplete(props) {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

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
    style = { width: '100%' },
    isMulti = false,
    disabled = false,
  } = props;

  const applyClassName = classNames('label-select', {
    focused: isFocused,
    disabled: disabled,
  });

  return (
    <>
      <div className={applyClassName}>
        <Select
          {...props}
          components={{ DropdownIndicator: CustomDropdownIndicator }}
          id={id}
          name={name}
          value={value}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={onChange}
          options={options}
          isMulti={isMulti}
          classNames={{
            control: (state) => (!state.isFocused && errorMessage ? 'select-in-valid' : ''),
          }}
          placeHolder={placeHolder}
          style={style}
          isDisabled={disabled}
        />
      </div>
      <label className="f-label" htmlFor={id} style={{ display: label ? '' : 'none' }}>
        {label} {required ? <span className="required">*</span> : null}
      </label>
      <span className="errorText" style={{ display: errorMessage ? '' : 'none' }}>
        {errorMessage}
      </span>
    </>
  );
}

export default AppAutoComplete;
