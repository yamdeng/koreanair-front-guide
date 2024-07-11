import withSourceView from '@/hooks/withSourceView';
import { useState } from 'react';
import DatePicker from 'react-datepicker';

import { TimePicker } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

/*

  react-datepicer : 값 인터페이스는 Date 타입으로 연동됨(time도 date로 인터페이스 됨)
   -timeIntervals : 표기 분 인터벌
   -dateFormat : displayFormat
   -placeholderText : placeholder
   -isClearable : clear 버튼 나옴
   X.now 기능은 존재하지 않음

  ant.design : 값 인터페이스는 dayjs로 연동됨
   -defaultOpenValue
   -defaultValue
   -클리어 버튼은 기본으로 있음
   -needConfirm=false로 지정해서 ok 버튼없이 타임이 적용되게끔 반영
   O.NOW 존재함

  TODO
   -react-datepicker : isClearable : clear 버튼 custom

*/
function ComponentGuideTimePicker() {
  const [startDate, setStartDate] = useState(new Date());

  const onChange = (time, timeString) => {
    console.log(time, timeString);
  };

  const timeFormat = 'HH:mm';
  // const timeFormat = 'HH:mm:ss';

  const defaultValue = '05:31';
  // const defaultValue = '05:00:11';

  const handleKeyDown = (event) => {
    debugger;
    if (event.key === 'Enter') {
      const value = event.target.value;
      debugger;
    }
  };
  return (
    <>
      <DatePicker
        selected={startDate}
        onChange={(date: any) => {
          console.log(`onChange call : ${date}`);
          setStartDate(date);
        }}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={10}
        timeCaption="Time"
        dateFormat="h:mm aa"
        // isClearable
      ></DatePicker>
      <br />
      <br />
      {/* <TimePicker
        onChange={onChange}
        defaultOpenValue={dayjs(defaultValue, timeFormat)}
        defaultValue={dayjs(defaultValue, timeFormat)}
        format={defaultValue}
      /> */}
      <TimePicker defaultValue={dayjs('12:15', 'HH:mm')} format={'HH:mm'} onKeyUp={handleKeyDown} needConfirm={false} />
    </>
  );
}

export default withSourceView(ComponentGuideTimePicker);
