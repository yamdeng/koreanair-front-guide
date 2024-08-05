import CommonUtil from '@/utils/CommonUtil';

/*

  <AppSearchnput 
    inputType={'number'},
    id={''}
    name={'id와 동일하기 전달'}
    value={value}
    onChange={onChange}
    label='이름 or messageKey'
    placeholder=''
    style = {}
    search = {() => {}}
  />

*/

function AppSearchnput(props) {
  const {
    inputType = 'text',
    name = '',
    id = CommonUtil.getUUID(),
    label,
    value,
    onChange,
    placeholder = '',
    style = {},
    search,
    disabled = false,
  } = props;
  return (
    <>
      <input
        id={id}
        type={inputType}
        style={style}
        className={'form-tag'}
        name={name}
        value={value}
        onChange={(event) => {
          onChange(event.target.value, event);
        }}
        onKeyDown={(event) => {
          if (event.key === 'Enter' && search) {
            search();
          }
        }}
        placeholder={placeholder}
        disabled={disabled}
      />
      <label className="f-label" htmlFor={id} style={{ display: label ? '' : 'none' }}>
        {label}
      </label>
      {value ? <button className="sch-btnClear" onClick={() => onChange('')}></button> : null}
      <button type="button" className="icon-sch" onClick={search}></button>
    </>
  );
}

export default AppSearchnput;
