import { useState } from 'react';
import { TimePicker } from 'antd';
import dayjs from 'dayjs';
import CommonUtil from '@/utils/CommonUtil';

function AppTimePicker(props) {
  const {
    id = CommonUtil.getUUID(),
    name,
    label,
    required,
    placeholder = '',
    errorMessage,
    defaultValue = null,
    value = null,
    onChange,
    valueFormat,
    displayFormat,
    showNow,
    excludeSecondsTime = false,
    minuteStep = 5,
    hourStep = 1,
    secondStep = 1,
    needConfirm = null,
    disabled,
    style = { width: '100%' },
  } = props;

  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  let applyDateValueFormat = 'HH:mm:ss';
  if (excludeSecondsTime) {
    applyDateValueFormat = 'HH:mm';
  }
  if (valueFormat) {
    applyDateValueFormat = valueFormat;
  }

  let applyDisplayFormat = applyDateValueFormat;
  if (displayFormat) {
    applyDisplayFormat = displayFormat;
  }

  const applyValue = value ? dayjs(value, applyDateValueFormat) : null;

  return (
    <>
      <TimePicker
        className={value ? 'label-picker selected' : 'label-picker'}
        status={!isFocused && errorMessage ? 'error' : ''}
        style={style}
        id={id}
        name={name}
        placeholder={placeholder}
        onChange={(dayjsDate: any) => {
          const valueString = dayjsDate.format(applyDateValueFormat);
          onChange(valueString, dayjsDate ? dayjsDate.toDate() : null);
        }}
        defaultValue={defaultValue}
        value={applyValue}
        format={applyDisplayFormat}
        showNow={showNow}
        needConfirm={needConfirm}
        disabled={disabled}
        minuteStep={minuteStep}
        hourStep={hourStep}
        secondStep={secondStep}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <label className="f-label" htmlFor={id} style={{ display: label ? '' : 'none' }}>
        {label} {required ? <span className="required">*</span> : null}
      </label>
      <span className="errorText" style={{ display: errorMessage ? '' : 'none' }}>
        {errorMessage}
      </span>
    </>
  );
}

export default AppTimePicker;
