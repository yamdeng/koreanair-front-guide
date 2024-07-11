import withSourceView from '@/hooks/withSourceView';
import { useState } from 'react';
import DatePicker from 'react-datepicker';

function ComponentGuideDatePicker() {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <DatePicker
      selected={startDate}
      onChange={(date: any) => setStartDate(date)}
      showTimeSelect
      showTimeSelectOnly
      timeIntervals={1}
      timeCaption="Time"
      dateFormat="h:mm aa"
    />
  );
}

export default withSourceView(ComponentGuideDatePicker);
