import Config from '@/config/Config';
import Helper from '@/utils/Helper';
import { nanoid } from 'nanoid';
import React, { forwardRef } from 'react';
import DatePicker from 'react-datepicker';

/*

    date-picker 공통
     : <AppDatePicker id='startDate' name='startDate' label='직책코드'
        value='2021-09-01' valueFormat='YYYY-MM-DD' onChange={(date) => {}} required={true} />

    props
     -id(option) : 라벨을 매핑시키기 위한 id(없으면 uuid로 정의)
     -name(option) : name 속성 값
     -label : input label
     -value : '2021-03-03'(string)
     -valueFormat(option) : date 문자열 값 포맷(기본값 : 'YYYY-MM-DD')
     -onChange : 날짜 값 변경 handler 함수
     -required(option) : 필수 값 여부

*/

function AppDatePicker(props) {
  let { id, name, label, value, valueFormat, onChange, required, errorMessage, onBlur, onlySearch, displayFormat } =
    props;
  let labelId = id ? id : nanoid();
  valueFormat = valueFormat || Config.defaultDateValueFormat;
  // @ts-ignore
  const CustomDatePickerInput = forwardRef(({ value, onClick }, ref) => {
    return (
      <React.Fragment>
        <input
          autoComplete="off"
          id={labelId}
          name={name}
          type="text"
          className={errorMessage ? 'form_tag invalid' : 'form_tag'}
          readOnly
          value={value}
          onClick={(event) => {
            event.preventDefault();
            onClick();
          }}
          onBlur={onBlur}
        />
        <label className="f_label" htmlFor={labelId}>
          {label} {required ? <span className="required">*</span> : null}
        </label>
        <span className="icon icon_calendar" onClick={onClick}>
          <i className="fas fa-calendar-alt"></i>
        </span>
        <span style={{ display: errorMessage ? '' : 'none' }} className="invalid_txt">
          {errorMessage}
        </span>
      </React.Fragment>
    );
  });
  let selectedDate = Helper.stringToDate(value, valueFormat);
  return (
    <React.Fragment>
      <DatePicker
        selected={selectedDate}
        showYearDropdown={true}
        showMonthDropdown={true}
        dropdownMode="select"
        dateFormat={displayFormat ? displayFormat : Config.defaultDateDisplayFormat}
        onChange={(date: any) => {
          let result = Helper.dateToString(date, valueFormat);
          if (onlySearch) {
            onChange(result);
          } else {
            onChange({ target: { name: name, value: result } });
          }
        }}
        customInput={<CustomDatePickerInput />}
      />
    </React.Fragment>
  );
}

export default AppDatePicker;
