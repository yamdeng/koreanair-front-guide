import { TimePicker } from 'antd';
import dayjs from 'dayjs';

function AppTimePikcer(props) {
  const {
    id,
    name,
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
    <TimePicker
      id={id}
      name={name}
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
  );
}

export default AppTimePikcer;
