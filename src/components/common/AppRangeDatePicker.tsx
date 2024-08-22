import { DATE_PICKER_TYPE_QUARTER } from '@/config/CommonConstant';
import CommonUtil from '@/utils/CommonUtil';
import { DatePicker } from 'antd';
import { useCallback } from 'react';
import CommonInputError from './CommonInputError';

const { RangePicker } = DatePicker;

import dayjs from 'dayjs';

const AppRangeDatePicker = (props) => {
  const {
    id = CommonUtil.getUUID(),
    name,
    label,
    required,
    errorMessage,
    defaultValue = [],
    value = [],
    onChange,
    pickerType = 'date',
    valueFormat,
    displayFormat,
    showNow = true,
    showTime = false,
    excludeSecondsTime = false,
    timeFormat,
    minuteStep = 5,
    hourStep = 1,
    secondStep = 1,
    needConfirm = null,
    minDate,
    maxDate,
    disabled,
    disabledHoiloday,
    disabledDates,
    style = { width: '100%' },
    placeholder = ['', ''],
  } = props;

  let applyDateValueFormat = CommonUtil.getDateFormatByPickerType(pickerType, showTime, excludeSecondsTime);
  if (valueFormat) {
    applyDateValueFormat = valueFormat;
  }

  const applyMinDate = minDate ? dayjs(minDate, applyDateValueFormat) : null;
  const applyMaxDate = maxDate ? dayjs(maxDate, applyDateValueFormat) : null;

  let applyValue: any = [];
  if (value && value.length) {
    applyValue = value.map((info) => {
      return info ? dayjs(info, applyDateValueFormat) : null;
    });
  }
  let applyTimeFormat = excludeSecondsTime ? 'HH:mm' : 'HH:mm:ss';
  if (timeFormat) {
    applyTimeFormat = timeFormat;
  }

  let applyDisplayFormat = applyDateValueFormat;
  if (displayFormat) {
    applyDisplayFormat = displayFormat;
  }

  // 쿼터일 경우 displayFormat 수동으로 수정 : 분기는 displayFormat이 fix임
  if (pickerType === DATE_PICKER_TYPE_QUARTER) {
    applyDisplayFormat = displayFormat ? displayFormat : `YYYY-[Q]Q`;
  }

  const disabledDate = useCallback(
    (current) => {
      if (current) {
        if (disabledHoiloday) {
          // Sunday - Saturday : 0 - 6
          const dayNumber = current.toDate().getDay();
          if (dayNumber === 0 || dayNumber === 6) {
            return true;
          }
        } else if (disabledDates && disabledDates.length) {
          if (disabledDates.find((info) => current.format(applyDateValueFormat) === info)) {
            return true;
          }
        }
      }
      return false;
    },
    [disabledHoiloday, disabledDates]
  );

  return (
    <>
      <RangePicker
        className={value || placeholder ? 'label-picker selected' : 'label-picker'}
        status={errorMessage ? 'error' : ''}
        style={style}
        id={{
          start: id,
        }}
        name={name}
        placeholder={placeholder}
        onChange={(dayjsDateArray: any) => {
          let valueStringArray = [];
          let valueDateArray = [];
          if (dayjsDateArray && dayjsDateArray.length) {
            valueStringArray = dayjsDateArray.map((dayjsDate) => {
              // quarter(분기) 타입일 경우에 각 월의 random값을 전달하고 있음
              if (pickerType === DATE_PICKER_TYPE_QUARTER) {
                return dayjsDate.format('YYYY-MM') + '-01';
              }
              return dayjsDate.format(applyDateValueFormat);
            });
            valueDateArray = dayjsDateArray.map((dayjsDate) => dayjsDate.toDate);
          }
          onChange(valueStringArray, valueDateArray);
        }}
        picker={pickerType}
        defaultValue={defaultValue}
        value={applyValue}
        format={applyDisplayFormat}
        showTime={
          showTime
            ? { format: applyTimeFormat, hourStep: hourStep, minuteStep: minuteStep, secondStep: secondStep }
            : false
        }
        showNow={showNow}
        needConfirm={needConfirm}
        minDate={applyMinDate}
        maxDate={applyMaxDate}
        disabled={disabled}
        disabledDate={disabledDate}
      />
      <label className="f-label" htmlFor={id} style={{ display: label ? '' : 'none' }}>
        {label} {required ? <span className="required">*</span> : null}
      </label>
      <CommonInputError errorMessage={errorMessage} label={label} />
    </>
  );
};
export default AppRangeDatePicker;
