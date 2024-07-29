import { Select } from 'antd';

/*

    1.value, onChange
    2.placeholder


    99.max count
    99.다국어를 how?

*/
function AppSelect(props) {
  const { value, options = [], onChange, placeHolder = '', applyAllSelect = false, allValue = 'all' } = props;
  const applyOptions = applyAllSelect ? [{ label: '전체', value: allValue }, ...options] : options;
  return (
    <Select {...props} value={value} options={applyOptions} placeholder={placeHolder} onChange={onChange}></Select>
  );
}

export default AppSelect;
