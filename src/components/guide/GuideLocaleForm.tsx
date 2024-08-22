import AppNavigation from '@/components/common/AppNavigation';
import Config from '@/config/Config';
import AppTextInput from '../common/AppTextInput';
import AppSelect from '../common/AppSelect';
import * as yup from 'yup';
import { useState } from 'react';
import { useImmer } from 'use-immer';
import CommonUtil from '@/utils/CommonUtil';

/* form 초기화 */
const initFormValue = {
  msgKey: '',
  msgKor: '',
};

function GuideLocaleForm() {
  /* yup validation */
  const yupFormSchema = yup.object({
    msgKey: yup.string().required(),
    msgKor: yup.string().required('front.validation.validation.required'),
  });

  const [formValue] = useImmer({ ...initFormValue });
  const [errors, setErrors] = useState<any>({});
  const { msgKey, msgKor } = formValue;

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
          다국어 form case :{' '}
          <a style={{ fontSize: 20 }} href={Config.hrefBasePath + `GuideLocaleForm.tsx`}>
            GuideLocaleForm
          </a>
        </h2>
      </div>
      <div className="editbox">
        <div className="form-table">
          <div className="form-cell wid100">
            <div className="form-group wid100">
              <AppTextInput label="error(수동)" errorMessage="에러입니다." />
            </div>
          </div>
        </div>
        <div className="form-table">
          <div className="form-cell wid100">
            <div className="form-group wid100">
              <AppSelect label="error(메시지키)" errorMessage="front.validation.validation.required" />
            </div>
          </div>
        </div>
        <div className="form-table">
          <div className="form-cell wid100">
            <div className="form-group wid100">
              <AppTextInput label="메시지키" errorMessage={errors.msgKey} value={msgKey} />
            </div>
          </div>
        </div>
        <div className="form-table">
          <div className="form-cell wid100">
            <div className="form-group wid100">
              <AppSelect label="msgKor" errorMessage={errors.msgKor} value={msgKor} />
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
export default GuideLocaleForm;
