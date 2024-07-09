import { Fragment } from 'react/jsx-runtime';
import { forwardRef } from 'react';
import DatePicker from 'react-datepicker';

function AppDatePicker(props: any) {
  const { id, name, label, value, valueFormat, onChange, required, errorMessage, onBlur, onlySearch, displayFormat } =
    props;

  console.log(value);
  console.log(valueFormat);
  const labelId = id;

  const CustomDatePickerInput = forwardRef<any, any>(({ value, onClick }, ref) => {
    return (
      <Fragment>
        <input
          autoComplete="off"
          id={labelId}
          name={name}
          type="text"
          className={errorMessage ? 'form_tag invalid' : 'form_tag'}
          readOnly
          ref={ref}
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
      </Fragment>
    );
  });

  return (
    <>
      <DatePicker
        selected={new Date()}
        showYearDropdown={true}
        showMonthDropdown={true}
        dropdownMode="select"
        dateFormat={displayFormat}
        onChange={(date: any) => {
          console.log(date);
          const result = '';
          if (onlySearch) {
            onChange(result);
          } else {
            onChange({ target: { name: name, value: result } });
          }
        }}
        customInput={<CustomDatePickerInput />}
      />
    </>
  );
}

export default AppDatePicker;
