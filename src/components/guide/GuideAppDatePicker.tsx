import AppDatePicker from '@/components/common/AppDatePicker';
import AppNavigation from '../common/AppNavigation';
import {
  DATE_PICKER_TYPE_DATE,
  DATE_PICKER_TYPE_MONTH,
  DATE_PICKER_TYPE_QUARTER,
  DATE_PICKER_TYPE_YEAR,
} from '@/config/CommonConstant';
import CommonUtil from '@/utils/CommonUtil';
import { useState } from 'react';
import Config from '@/config/Config';

/*

  <AppDatePicker/> 예시 첫번째
   1.value, onChange, showNow
   2.pickerType : date, month, quarter, year
   3.time과 datepicker 같이 사용하기
    -분만 적용하는 방법
    -인터벌 주는 방법

*/
function GuideAppDatePicker() {
  // value, onChange, showNow 기본 사용법
  const [firstDateValue, setFirstDateValue] = useState('2024-08-04');

  // 'YYYY-MM-DD' format 유형 사용 방법
  const [datePickerTypeValue, setDatePickerTypeValue] = useState('2024-08-05');

  // 'YYYY-MM-DD HH:mm:ss' format 유형 사용 방법
  const [dateTimePickerTypeValue, setDateTimePickerTypeValue] = useState('2024-08-05 23:10:15');

  // 'YYYY-MM-DD HH:mm' format 유형 사용 방법
  const [dateTimePickerType2Value, setDateTimePickerType2Value] = useState('2024-08-05 23:20');

  // 쿼터 format 유형 사용 방법
  const [quaterPickerTypeValue, setQuaterPickerTypeValue] = useState('2024-04-01');

  // 'YYYY-MM' format 유형 사용 방법
  const [monthPickerTypeValue, setMonthPickerTypeValue] = useState('2024-08');

  // 'YYYY' format 유형 사용 방법
  const [yearPickerTypeValue, setYearPickerTypeValue] = useState('2023');

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
    <>
      <AppNavigation />
      <div className="conts-title">
        <h2>
          AppDatePicker case1 :{' '}
          <a style={{ fontSize: 20 }} href={Config.hrefBasePath + `GuideAppDatePicker.tsx`}>
            GuideAppDatePicker
          </a>
        </h2>
      </div>
      <h3>value, onChange, showNow : {firstDateValue}</h3>
      <AppDatePicker onChange={changeFirstDatePickerValue} value={firstDateValue} showNow={true} needConfirm={true} />
      <br />
      <br />

      <h3>picker type date(기본값) : {datePickerTypeValue} </h3>
      <AppDatePicker onChange={changeDatePickerTypeValue} value={datePickerTypeValue} pickerType="date" />
      <br />
      <br />

      <h3>picker type : dateTime : {dateTimePickerTypeValue} </h3>
      <AppDatePicker
        onChange={changeDateTimePickerTypeValue}
        value={dateTimePickerTypeValue}
        showTime
        secondStep={10}
      />
      <br />
      <br />

      <h3>picker type : dateTime(분만 표기) : {dateTimePickerType2Value} </h3>
      <AppDatePicker
        onChange={changeDateTimePickerType2Value}
        value={dateTimePickerType2Value}
        showTime
        excludeSecondsTime
      />
      <br />
      <br />

      <h3>picker type date(기본값) : {datePickerTypeValue} </h3>
      <AppDatePicker
        onChange={changeDatePickerTypeValue}
        value={datePickerTypeValue}
        pickerType={DATE_PICKER_TYPE_DATE}
      />
      <br />
      <br />

      <h3>
        picker type quater : {quaterPickerTypeValue}({CommonUtil.convertDateToQuarterValueString(quaterPickerTypeValue)}
        ){' '}
      </h3>
      <AppDatePicker
        onChange={changeQuaterPickerTypeValue}
        value={quaterPickerTypeValue}
        pickerType={DATE_PICKER_TYPE_QUARTER}
      />
      <br />
      <br />

      <h3>picker type month : {quaterPickerTypeValue}</h3>
      <AppDatePicker
        onChange={changeMonthPickerTypeValue}
        value={monthPickerTypeValue}
        pickerType={DATE_PICKER_TYPE_MONTH}
      />
      <br />
      <br />

      <h3>picker type year : {yearPickerTypeValue}</h3>
      <AppDatePicker
        onChange={changeYearPickerTypeValue}
        value={yearPickerTypeValue}
        pickerType={DATE_PICKER_TYPE_YEAR}
      />
    </>
  );
}

export default GuideAppDatePicker;
