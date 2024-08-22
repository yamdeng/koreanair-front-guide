import CommonUtil from '@/utils/CommonUtil';
import CommonInputError from './CommonInputError';

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
        {...props}
        id={id}
        style={style}
        className={errorMessage ? 'form-tag error' : 'label-select form-tag'}
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
      <CommonInputError errorMessage={errorMessage} label={label} />
    </>
  );
}

export default AppTextArea;
