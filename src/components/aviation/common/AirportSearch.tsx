import AppAutoComplete from '@/components/common/AppAutoComplete';

function AirportSearch(props) {
  const { ...rest } = props;
  return (
    <AppAutoComplete
      {...rest}
      apiUrl="avn/common/airports"
      labelKey="label"
      valueKey="airportCode"
      dataKey="data.list"
      isMultiple={false}
      isValueString
    />
  );
}

export default AirportSearch;
