import AppDatePicker from '@/components/common/AppDatePicker';
import AppNavigation from '../common/AppNavigation';

import { useState } from 'react';

/*

  <AppDatePicker/> 예시 두번째
   1.min, max
   2.disabled : input 자체를 disabled 하는 방법
   3.지정한 날짜 disabled 시키기
    -토,일 선택 못하게
    -비활성할 날짜를 배열로 전달

*/

function GuideAppDatePicker2() {
  // input disabled
  const [disabled, setDisabled] = useState(false);

  const toggleDisabled = () => {
    setDisabled(!disabled);
  };

  // min, max 체크할때 사용할 데이터 'date' 유형일 경우
  const [datePickerTypeValue, setDatePickerTypeValue] = useState('2024-08-05');
  const [dateTypeMinDate] = useState('2024-08-01');
  const [dateTypeMaxDate] = useState('2025-01-16');

  // min, max 체크할때 사용할 데이터 'month' 유형일 경우
  const [monthPickerTypeValue, setMonthPickerTypeValue] = useState('2024-08');
  const [monthTypeMinDate] = useState('2024-08');
  const [monthTypeMaxDate] = useState('2025-10');

  // date picker 예시
  const changeDatePickerTypeValue = (valueString, valueDate) => {
    console.log(`changeDatePickerTypeValue valueString : ${valueString}`);
    console.log(`changeDatePickerTypeValue valueDate : ${valueDate}`);
    setDatePickerTypeValue(valueString);
  };

  // month picker 예시
  const changeMonthPickerTypeValue = (valueString, valueDate) => {
    console.log(`changeMonthPickerTypeValue valueString : ${valueString}`);
    console.log(`changeMonthPickerTypeValue valueDate : ${valueDate}`);
    setMonthPickerTypeValue(valueString);
  };

  // 수동으로 disabledDate 전달
  const disabledDates = ['2024-08-06', '2024-08-07'];

  return (
    <>
      <AppNavigation />
      <div className="conts-title">
        <h2>AppDatePicker case2</h2>
      </div>
      <button onClick={toggleDisabled}>disabled toggle</button>
      <h3>max, min (date 유형) : {datePickerTypeValue} </h3>
      <AppDatePicker
        onChange={changeDatePickerTypeValue}
        value={datePickerTypeValue}
        pickerType="date"
        minDate={dateTypeMinDate}
        maxDate={dateTypeMaxDate}
        disabled={disabled}
      />
      <br />
      <br />

      <h3>max, min (month 유형) : {datePickerTypeValue} </h3>
      <AppDatePicker
        onChange={changeMonthPickerTypeValue}
        value={monthPickerTypeValue}
        pickerType="month"
        minDate={monthTypeMinDate}
        maxDate={monthTypeMaxDate}
        disabled={disabled}
      />
      <br />
      <br />

      <h3>holiday 제거 : {datePickerTypeValue} </h3>
      <AppDatePicker
        onChange={changeDatePickerTypeValue}
        value={datePickerTypeValue}
        pickerType="date"
        disabledHoiloday
      />
      <br />
      <br />

      <h3>disabledDates 전달하기 : {datePickerTypeValue} </h3>
      <AppDatePicker
        onChange={changeDatePickerTypeValue}
        value={datePickerTypeValue}
        pickerType="date"
        disabledDates={disabledDates}
      />
    </>
  );
}

export default GuideAppDatePicker2;
