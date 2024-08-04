import CommonUtil from '@/utils/CommonUtil';

/*

  <AppTextInput 
    inputType={'number'}
    id={''}
    name={'id와 동일하기 전달'}
    label='이름 or messageKey'
    value={value}
    onChange={onChange}
    placeholder=''
    errorMessage=''
    requried={true}
    hiddenClearButton={true}
    style = {}
  />

*/

function AppTextInput(props) {
  const {
    inputType = 'text',
    name = '',
    id = CommonUtil.getUUID(),
    label,
    value,
    onChange,
    placeholder = '',
    required = false,
    errorMessage,
    hiddenClearButton = false,
    style = {},
  } = props;
  return (
    <>
      <input
        id={id}
        type={inputType}
        style={style}
        className={errorMessage ? 'form-tag error' : 'form-tag'}
        name={name}
        value={value}
        onChange={(event) => {
          onChange(event.target.value, event);
        }}
        placeholder={placeholder}
      />
      <label className="f-label" htmlFor={id} style={{ display: label ? '' : 'none' }}>
        {label} {required ? <span className="required">*</span> : null}
      </label>
      {hiddenClearButton || !value ? null : <button className="btnClear" onClick={() => onChange('')}></button>}
      <span className="errorText" style={{ display: errorMessage ? '' : 'none' }}>
        {errorMessage}
      </span>
    </>
  );
}

export default AppTextInput;
