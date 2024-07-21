import AppDatePicker from '@/components/common/AppDatePicker';
import { DATE_PICKER_TYPE_DATE, DATE_PICKER_TYPE_QUARTER } from '@/config/CommonConstant';
import withSourceView from '@/hooks/withSourceView';
import { useState } from 'react';
import { DatePicker } from 'antd';

/*

  1.max, min

  2.valueformat 수정


*/
function ComponentGuideDatePicker() {
  // value, onChange 기본 사용법
  const [firstDateValue, setFirstDateValue] = useState('2024-08-04');

  // 'YYYY-MM-DD' format 유형 타입 사용 방법
  const [datePickerTypeValue, setDatePickerTypeValue] = useState('2024-08-05');

  // 'YYYY-MM-DD HH:mm:ss' format 유형 타입 사용 방법
  const [dateTimePickerTypeValue, setDateTimePickerTypeValue] = useState('2024-08-05 23:10:15');

  // 'YYYY-MM-DD HH:mm' format 유형 타입 사용 방법
  const [dateTimePickerType2Value, setDateTimePickerType2Value] = useState('2024-08-05 23:20');

  // const [monthPickerTypeValue, setMonthPickerTypeValue] = useState('2024-08-05');
  // const [yearPickerTypeValue, setYearPickerTypeValue] = useState('2024-08-05');
  const [quaterPickerTypeValue, setQuaterPickerTypeValue] = useState('2024-08-03');

  // value, onChange 예시 : 첫번째 값은 '문자열날짜값', 두번째 값은 Date 객체
  const changeFirstDatePickerValue = (valueString, valueDate) => {
    console.log(`changeFirstDatePickerValue valueString : ${valueString}`);
    console.log(`changeFirstDatePickerValue valueDate : ${valueDate}`);
    setFirstDateValue(valueString);
  };

  // date picker 예시
  const changeDatePickerTypeValue = (valueString, valueDate) => {
    console.log(`changeDatePickerTypeValue valueString : ${valueString}`);
    console.log(`changeDatePickerTypeValue valueDate : ${valueDate}`);
    setDatePickerTypeValue(valueString);
  };

  // date time picker 예시
  const changeDateTimePickerTypeValue = (valueString, valueDate) => {
    console.log(`changeDateTimePickerTypeValue valueString : ${valueString}`);
    console.log(`changeDateTimePickerTypeValue valueDate : ${valueDate}`);
    setDateTimePickerTypeValue(valueString);
  };

  // date time picker 예시 : 분까지만 표기하고 싶을때
  const changeDateTimePickerType2Value = (valueString, valueDate) => {
    console.log(`changeDateTimePickerType2Value valueString : ${valueString}`);
    console.log(`changeDateTimePickerType2Value valueDate : ${valueDate}`);
    setDateTimePickerType2Value(valueString);
  };

  // quater picker 예시
  const changeQuaterPickerTypeValue = (valueString, valueDate) => {
    console.log(`changeQuaterPickerTypeValue valueString : ${valueString}`);
    console.log(`changeQuaterPickerTypeValue valueDate : ${valueDate}`);
    setQuaterPickerTypeValue(valueString);
  };

  const onChange = (valueString, valueDate) => {
    console.log(`changeQuaterPickerTypeValue valueString : ${valueString}`);
    console.log(`changeQuaterPickerTypeValue valueDate : ${valueDate}`);
    debugger;
    setQuaterPickerTypeValue(valueString);
  };

  return (
    <>
      <h3>value, onChange, showNow : {firstDateValue}</h3>
      <AppDatePicker onChange={changeFirstDatePickerValue} value={firstDateValue} showNow={false} />

      <h3>picker type date(기본값) : {datePickerTypeValue} </h3>
      <AppDatePicker onChange={changeDatePickerTypeValue} value={datePickerTypeValue} pickerType="date" />

      <h3>picker type : dateTime : {dateTimePickerTypeValue} </h3>
      <AppDatePicker
        onChange={changeDateTimePickerTypeValue}
        value={dateTimePickerTypeValue}
        showTime
        secondStep={10}
      />

      <h3>picker type : dateTime(분만 표기) : {dateTimePickerType2Value} </h3>
      <AppDatePicker
        onChange={changeDateTimePickerType2Value}
        value={dateTimePickerType2Value}
        showTime
        excludeSecondsTime
      />

      <h3>picker type date(기본값) : {datePickerTypeValue} </h3>
      <AppDatePicker
        onChange={changeDatePickerTypeValue}
        value={datePickerTypeValue}
        pickerType={DATE_PICKER_TYPE_DATE}
      />

      <h3>picker type quater : {quaterPickerTypeValue} </h3>
      <AppDatePicker
        onChange={changeQuaterPickerTypeValue}
        value={quaterPickerTypeValue}
        pickerType={DATE_PICKER_TYPE_QUARTER}
      />

      <DatePicker onChange={onChange} picker="quarter" />
    </>
  );
}

export default withSourceView(ComponentGuideDatePicker);
