import AppNavigation from '@/components/common/AppNavigation';
import Config from '@/config/Config';
import { useFormDirtyCheck } from '@/hooks/useFormDirtyCheck';
import CommonUtil from '@/utils/CommonUtil';
import { useState } from 'react';
import { useImmer } from 'use-immer';
import * as yup from 'yup';
import AppTextInput from '../common/AppTextInput';

/* form 초기화 */
const initFormValue = {
  msgKey: '',
  msgKor: '',
};

function GuideFormUnload() {
  /* yup validation */
  const yupFormSchema = yup.object({
    msgKey: yup.string().required(),
    msgKor: yup.string().required(),
  });

  const [formValue, setFormValue] = useImmer({ ...initFormValue });
  const [errors, setErrors] = useState<any>({});
  const [isDirty, setIsDirty] = useState<any>(false);
  const { msgKey, msgKor } = formValue;

  useFormDirtyCheck(isDirty);

  const changeInput = (inputName, inputValue) => {
    setFormValue((formValue) => {
      formValue[inputName] = inputValue;
    });
    setIsDirty(true);
  };

  const save = async () => {
    const validateResult = await CommonUtil.validateYupForm(yupFormSchema, formValue);
    const { success, errors } = validateResult;
    if (!success) {
      setErrors(errors);
    }
  };

  return (
    <>
      <AppNavigation />
      <div className="conts-title">
        <h2>
          useFormDirtyCheck :{' '}
          <a style={{ fontSize: 20 }} href={Config.hrefBasePath + `GuideFormUnload.tsx`}>
            GuideFormUnload
          </a>
        </h2>
      </div>
      <div className="editbox">
        <div className="form-table">
          <div className="form-cell wid100">
            <div className="form-group wid100">
              <AppTextInput label="msgKey" value={msgKey} onChange={(value) => changeInput('msgKey', value)} />
            </div>
          </div>
        </div>
        <div className="form-table">
          <div className="form-cell wid100">
            <div className="form-group wid100">
              <AppTextInput
                label="msgKor"
                errorMessage={errors.msgKor}
                value={msgKor}
                onChange={(value) => changeInput('msgKor', value)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="pop_btns">
        <button className="btn_text text_color_neutral-10 btn_confirm" onClick={save}>
          확인
        </button>
      </div>
    </>
  );
}
export default GuideFormUnload;
