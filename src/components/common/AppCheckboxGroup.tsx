import { useCallback } from 'react';
import CommonUtil from '@/utils/CommonUtil';
import classNames from 'classnames';

function AppCheckboxGroup(props) {
  const {
    id = CommonUtil.getUUID(),
    label,
    options = [],
    value = [],
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

  const changeCheckbox = useCallback(
    (event, checkBoxValue) => {
      const checked = event.target.checked;
      const resultValue = [...value];
      if (checked) {
        resultValue.push(checkBoxValue);
      } else {
        const searchIndex = resultValue.findIndex((info) => info === checkBoxValue);
        resultValue.splice(searchIndex, 1);
      }
      onChange(resultValue);
    },
    [value]
  );

  return (
    <>
      <span className="txt" style={{ display: !noBorder && label ? '' : 'none' }}>
        {label} {required ? <span className="required">*</span> : null}
      </span>
      <div id={id} className={applyClassName}>
        {options.map((info) => {
          const label = info[labelKey];
          const value = info[valueKey];
          const checked = selectedValue.find((info) => info === value);
          return (
            <label key={label}>
              <input
                type="checkbox"
                name={label}
                disabled={disabled}
                value={value}
                checked={checked ? true : false}
                onChange={(event) => {
                  changeCheckbox(event, value);
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

export default AppCheckboxGroup;
