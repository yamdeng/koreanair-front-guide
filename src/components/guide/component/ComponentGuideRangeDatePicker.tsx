import AppRangeDatePicker from '@/components/common/AppRangeDatePicker';
import {
  DATE_PICKER_TYPE_DATE,
  DATE_PICKER_TYPE_MONTH,
  DATE_PICKER_TYPE_QUARTER,
  DATE_PICKER_TYPE_YEAR,
} from '@/config/CommonConstant';
import withSourceView from '@/hooks/withSourceView';
import CommonUtil from '@/utils/CommonUtil';
import { useState } from 'react';
import _ from 'lodash';

/*

  <AppRangeDatePicker> 예시 첫번째
   1.value, onChange, showNow
   2.pickerType : date, month, quarter, year
   3.time과 datepicker 같이 사용하기
    -분만 적용하는 방법
    -인터벌 주는 방법

*/

function ComponentGuideRangeDatePicker() {
  // value, onChange, showNow 기본 사용법
  const [firstDateValue, setFirstDateValue] = useState(['2024-08-04', '2024-08-05']);

  // 'YYYY-MM-DD' format 유형 사용 방법
  const [datePickerTypeValue, setDatePickerTypeValue] = useState(['2024-08-05', '2024-08-10']);

  // 'YYYY-MM-DD HH:mm:ss' format 유형 사용 방법
  const [dateTimePickerTypeValue, setDateTimePickerTypeValue] = useState([
    '2024-08-05 23:10:15',
    '2024-08-25 23:10:15',
  ]);

  // 'YYYY-MM-DD HH:mm' format 유형 사용 방법
  const [dateTimePickerType2Value, setDateTimePickerType2Value] = useState(['2024-08-05 23:20', '2024-08-13 23:20']);

  // 쿼터 format 유형 사용 방법
  const [quaterPickerTypeValue, setQuaterPickerTypeValue] = useState(['2024-04-01', '2024-09-01']);

  // 'YYYY-MM' format 유형 사용 방법
  const [monthPickerTypeValue, setMonthPickerTypeValue] = useState(['2024-08', '2025-12']);

  // 'YYYY' format 유형 사용 방법
  const [yearPickerTypeValue, setYearPickerTypeValue] = useState(['2023', '2025']);

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

  // month picker 예시
  const changeMonthPickerTypeValue = (valueString, valueDate) => {
    console.log(`changeMonthPickerTypeValue valueString : ${valueString}`);
    console.log(`changeMonthPickerTypeValue valueDate : ${valueDate}`);
    setMonthPickerTypeValue(valueString);
  };

  // year picker 예시
  const changeYearPickerTypeValue = (valueString, valueDate) => {
    console.log(`changeYearPickerTypeValue valueString : ${valueString}`);
    console.log(`changeYearPickerTypeValue valueDate : ${valueDate}`);
    setYearPickerTypeValue(valueString);
  };

  return (
    <div className="datePickerTest">
      <h3>value, onChange, showNow : {_.toString(firstDateValue)}</h3>
      <AppRangeDatePicker onChange={changeFirstDatePickerValue} value={firstDateValue} showNow={false} />

      <h3>picker type date(기본값) : {_.toString(datePickerTypeValue)} </h3>
      <AppRangeDatePicker onChange={changeDatePickerTypeValue} value={datePickerTypeValue} pickerType="date" />

      <h3>picker type : dateTime : {_.toString(dateTimePickerTypeValue)} </h3>
      <AppRangeDatePicker
        onChange={changeDateTimePickerTypeValue}
        value={dateTimePickerTypeValue}
        showTime
        secondStep={10}
      />

      <h3>picker type : dateTime(분만 표기) : {_.toString(dateTimePickerType2Value)} </h3>
      <AppRangeDatePicker
        onChange={changeDateTimePickerType2Value}
        value={dateTimePickerType2Value}
        showTime
        excludeSecondsTime
      />

      <h3>picker type date(기본값) : {_.toString(datePickerTypeValue)} </h3>
      <AppRangeDatePicker
        onChange={changeDatePickerTypeValue}
        value={datePickerTypeValue}
        pickerType={DATE_PICKER_TYPE_DATE}
      />

      <h3>
        picker type quater : {_.toString(quaterPickerTypeValue)}(
        {_.toString(CommonUtil.convertDateToQuarterValueString(quaterPickerTypeValue))}){' '}
      </h3>
      <AppRangeDatePicker
        onChange={changeQuaterPickerTypeValue}
        value={quaterPickerTypeValue}
        pickerType={DATE_PICKER_TYPE_QUARTER}
      />

      <h3>picker type month : {_.toString(monthPickerTypeValue)}</h3>
      <AppRangeDatePicker
        onChange={changeMonthPickerTypeValue}
        value={monthPickerTypeValue}
        pickerType={DATE_PICKER_TYPE_MONTH}
      />

      <h3>picker type year : {_.toString(yearPickerTypeValue)}</h3>
      <AppRangeDatePicker
        onChange={changeYearPickerTypeValue}
        value={yearPickerTypeValue}
        pickerType={DATE_PICKER_TYPE_YEAR}
      />
    </div>
  );
}

export default withSourceView(ComponentGuideRangeDatePicker);
