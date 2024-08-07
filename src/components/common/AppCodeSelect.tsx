import AppSelect from '@/components/common/AppSelect';
import CommonUtil from '@/utils/CommonUtil';
import { useState, useEffect } from 'react';
import ApiService from '@/services/ApiService';
import { getOptions, convertOptionsByCurrentLocale } from '@/services/CodeService';

function AppCodeSelect(props) {
  const {
    name = '',
    id = CommonUtil.getUUID(),
    label,
    value,
    onChange,
    placeHolder = '',
    required = false,
    errorMessage,
    applyAllSelect = false,
    allValue = '',
    style = { width: '100%' },
    labelOnlyTop = false,
    isRemote = false,
    codeGrpId = '',
  } = props;

  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (codeGrpId) {
      if (isRemote) {
        ApiService.get(`com/code-groups/${codeGrpId}/codes`).then((apiResult) => {
          const data = apiResult.data;
          const result = convertOptionsByCurrentLocale(data);
          setOptions(result);
        });
      } else {
        setOptions(getOptions(codeGrpId));
      }
    }
  }, [isRemote, codeGrpId]);

  return (
    <>
      <AppSelect
        {...props}
        style={style}
        id={id}
        options={options}
        name={name}
        label={label}
        value={value}
        placeholder={placeHolder}
        onChange={onChange}
        required={required}
        errorMessage={errorMessage}
        labelOnlyTop={labelOnlyTop}
        applyAllSelect={applyAllSelect}
        allValue={allValue}
      />
    </>
  );
}

export default AppCodeSelect;
