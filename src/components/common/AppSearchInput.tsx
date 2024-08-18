import CommonUtil from '@/utils/CommonUtil';
import classNames from 'classnames';

/*

  <AppSearchInput 
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

function AppSearchInput(props) {
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
    style = {},
    search,
    disabled = false,
    clearHandler = null,
  } = props;
  let isActiveClass = false;
  if (placeholder) {
    isActiveClass = true;
  }
  const applyClassName = classNames('form-tag', {
    error: errorMessage,
    active: isActiveClass,
  });
  return (
    <>
      <input
        id={id}
        type={inputType}
        style={style}
        className={applyClassName}
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
        {label} {required ? <span className="required">*</span> : null}
      </label>
      {value ? (
        <button className="sch-btnClear" onClick={() => (clearHandler ? clearHandler() : onChange(''))}></button>
      ) : null}
      <button type="button" className="icon-sch" onClick={search}></button>
      <span className="errorText" style={{ display: errorMessage ? '' : 'none' }}>
        {errorMessage}
      </span>
    </>
  );
}

export default AppSearchInput;
