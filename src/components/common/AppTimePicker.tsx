import CommonUtil from '@/utils/CommonUtil';
import { TimePicker } from 'antd';
import dayjs from 'dayjs';
import CommonInputError from './CommonInputError';

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
        {...props}
        className={value || placeholder ? 'label-picker selected' : 'label-picker'}
        status={errorMessage ? 'error' : ''}
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
      />
      <label className="f-label" htmlFor={id} style={{ display: label ? '' : 'none' }}>
        {label} {required ? <span className="required">*</span> : null}
      </label>
      <CommonInputError errorMessage={errorMessage} label={label} />
    </>
  );
}

export default AppTimePicker;
