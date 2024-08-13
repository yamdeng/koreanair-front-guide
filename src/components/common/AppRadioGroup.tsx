import CommonUtil from '@/utils/CommonUtil';
import classNames from 'classnames';

function AppRadioGroup(props) {
  const {
    id = CommonUtil.getUUID(),
    name = '',
    label,
    options = [],
    value,
    onChange,
    required = false,
    errorMessage,
    disabled = false,
    noBorder = false,
    labelKey = 'label',
    valueKey = 'value',
  } = props;
  const selectedValue = value;
  const applyClassName = classNames('radio-wrap', { error: errorMessage, 'border-no': noBorder });
  return (
    <>
      <span className="txt" style={{ display: !noBorder && label ? '' : 'none' }}>
        {label} {required ? <span className="required">*</span> : null}
      </span>
      <div id={id} className={applyClassName}>
        {options.map((info) => {
          const label = info[labelKey];
          const value = info[valueKey];
          return (
            <label key={label}>
              <input
                type="radio"
                name={name}
                disabled={disabled}
                value={value}
                checked={selectedValue === value}
                onChange={(event) => {
                  onChange(event.target.value, event);
                }}
              />
              <span>{label}</span>
            </label>
          );
        })}
      </div>
      <span className="errorText" style={{ display: errorMessage ? '' : 'none' }}>
        error
      </span>
    </>
  );
}

export default AppRadioGroup;
