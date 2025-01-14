import withSourceView from '@/hooks/withSourceView';
import { useState } from 'react';
import AppTimePikcer from '@/components/common/AppTimePicker';

/*

  <AppTimePicker/> 예시 첫번째
   1.value, onChange, showNow
   2.분까지만 적용하기, 인터벌 주기
    -분만 적용하는 방법
    -인터벌 주는 방법

*/
function ComponentGuideTimePicker() {
  // value, onChange, showNow 기본 사용법
  const [firstTimeValue, setFirstTimeValue] = useState('22:25:50');

  // 분까지만 적용하기, 인터벌 주기
  const [minuteTimeValue, setMinuteTimeValue] = useState('22:30');

  // value, onChange 예시 : 첫번째 값은 '문자열날짜값', 두번째 값은 Date 객체
  const changeFirstTimePickerValue = (valueString, valueDate) => {
    console.log(`changeFirstTimePickerValue valueString : ${valueString}`);
    console.log(`changeFirstTimePickerValue valueDate : ${valueDate}`);
    setFirstTimeValue(valueString);
  };

  // value, onChange 예시 : 첫번째 값은 '문자열날짜값', 두번째 값은 Date 객체
  const changeMinuteTimePickerValue = (valueString, valueDate) => {
    console.log(`changeMinuteTimePickerValue valueString : ${valueString}`);
    console.log(`changeMinuteTimePickerValue valueDate : ${valueDate}`);
    setMinuteTimeValue(valueString);
  };

  return (
    <>
      <h3>value, onChange, showNow : {firstTimeValue}</h3>
      <AppTimePikcer onChange={changeFirstTimePickerValue} value={firstTimeValue} showNow={true} needConfirm={true} />

      <h3>interval : {minuteTimeValue}</h3>
      <AppTimePikcer
        onChange={changeMinuteTimePickerValue}
        value={minuteTimeValue}
        excludeSecondsTime
        minuteStep={10}
      />
    </>
  );
}

export default withSourceView(ComponentGuideTimePicker);
