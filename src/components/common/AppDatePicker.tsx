import { DATE_PICKER_TYPE_QUARTER } from '@/config/CommonConstant';
import CommonUtil from '@/utils/CommonUtil';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';

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

/*

    0.value : '2025-12-31 23:59:59' ===> YYYY-MM-DD HH:mm:ss, YYYY-\QQ
    1.onChange : onChange('문자열날짜값', Date 타입 값)
    2.pickerType : date(기본값), month, quarter, year
    3.dateFormat(valueFormat) : 기본값 ===> CommonUtil.getDateFormatByPickerType 함수 확인
    4.displayFormat(displayFormat)
    5.showTime
    6.name, id


    <DatePicker onChange={onChange} picker="week" />
    <DatePicker onChange={onChange} picker="month" />
    <DatePicker onChange={onChange} picker="quarter" />
    <DatePicker onChange={onChange} picker="year" />

    dayjs('2015/01/01', dateFormat)

*/

// const handlePressEnter = (event) => {
//   if (event.key === 'Enter') {
//     document.activeElement.blur(); // 엔터키 눌렀을 때 포커스 해제
//   }
// };

const AppDatePicker = (props) => {
  const {
    value = null,
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
  } = props;
  let applyDateValueFormat = CommonUtil.getDateFormatByPickerType(pickerType, showTime, excludeSecondsTime);
  if (valueFormat) {
    applyDateValueFormat = valueFormat;
  }
  const applyValue = value ? dayjs(value, applyDateValueFormat) : null;
  let applyTimeFormat = excludeSecondsTime ? 'HH:mm' : 'HH:mm:ss';
  if (timeFormat) {
    applyTimeFormat = timeFormat;
  }

  let applyDisplayFormat = applyDateValueFormat;
  // 쿼터일 경우 displayFormat 수동으로 수정
  if (pickerType === DATE_PICKER_TYPE_QUARTER) {
    applyDisplayFormat = displayFormat ? displayFormat : `YYYY-[Q]Q`;
  }

  return (
    <DatePicker
      onChange={(dayjsDate: any, dateString) => {
        onChange(dayjsDate.format(applyDateValueFormat), dayjsDate ? dayjsDate.toDate() : null);
      }}
      picker={pickerType}
      value={applyValue}
      format={applyDisplayFormat}
      showTime={
        showTime
          ? { format: applyTimeFormat, hourStep: hourStep, minuteStep: minuteStep, secondStep: secondStep }
          : false
      }
      showNow={showNow}
    />
  );
};
export default AppDatePicker;
