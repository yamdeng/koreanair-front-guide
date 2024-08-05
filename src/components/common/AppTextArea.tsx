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
    rows=10
    style = {}
  />

*/

function AppTextArea(props) {
  const {
    name = '',
    id = CommonUtil.getUUID(),
    label,
    value,
    onChange,
    placeholder = '',
    required = false,
    errorMessage,
    style = { width: '100%', height: '200px' },
    disabled = false,
  } = props;
  return (
    <>
      <textarea
        id={id}
        style={style}
        className={errorMessage ? 'form-tag error' : 'form-tag'}
        name={name}
        value={value}
        onChange={(event) => {
          onChange(event.target.value, event);
        }}
        placeholder={placeholder}
        disabled={disabled}
      />
      <label className="f-label" htmlFor={id} style={{ display: label ? '' : 'none' }}>
        {label} {required ? <span className="required">*</span> : null}
      </label>
      <span className="errorText" style={{ display: errorMessage ? '' : 'none' }}>
        {errorMessage}
      </span>
    </>
  );
}

export default AppTextArea;
