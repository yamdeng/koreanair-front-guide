import CommonUtil from '@/utils/CommonUtil';
import classNames from 'classnames';

function AppCheckbox(props) {
  const {
    id = CommonUtil.getUUID(),
    name = '',
    label,
    checkboxTitle = '',
    value = false,
    onChange,
    required = false,
    errorMessage,
    disabled = false,
    noBorder = false,
  } = props;
  const applyClassName = classNames('radio-wrap', { error: errorMessage, 'border-no': noBorder });

  return (
    <>
      <span className="txt" style={{ display: !noBorder && label ? '' : 'none' }}>
        {label} {required ? <span className="required">*</span> : null}
      </span>
      <div id={id} className={applyClassName}>
        <label key={label}>
          <input
            type="checkbox"
            name={name}
            disabled={disabled}
            checked={value}
            onChange={(event) => {
              onChange(event.target.checked, event);
            }}
          />
          <span>{checkboxTitle ? checkboxTitle : label}</span>
        </label>
      </div>
      <span className="errorText" style={{ display: errorMessage ? '' : 'none' }}>
        error
      </span>
    </>
  );
}

export default AppCheckbox;
