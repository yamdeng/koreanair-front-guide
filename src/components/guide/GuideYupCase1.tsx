import AppTextInput from '@/components/common/AppTextInput';
import Config from '@/config/Config';
import { useState } from 'react';
import * as yup from 'yup';
import AppNavigation from '../common/AppNavigation';

import { useImmer } from 'use-immer';

import CommonUtil from '@/utils/CommonUtil';

const formName = 'SysMessageForm';

/* yup validation */
const yupFormSchema = yup.object().shape({
  msgKey: yup.string().required(),
  msgKor: yup.string().required(),
  msgEng: yup.string().required(),
  msgChn: yup.string(),
  detailInfo: yup.object().shape({
    name: yup.string().required('Name is a required field'),
    age: yup.number().required('age is a required field'),
    content: yup.string().required('content is a required field'),
  }),
});

/* form 초기화 */
const initFormValue = {
  msgKey: 'a',
  msgKor: 'b',
  msgEng: 'c',
  msgChn: '',
  detailInfo: {},
};

function GuideYupCase1() {
  const [formValue] = useImmer({ ...initFormValue });
  const [errors, setErrors] = useState<any>({});

  const save = async () => {
    const validateResult = await CommonUtil.validateYupForm(yupFormSchema, formValue);
    const { success, firstErrorFieldKey, errors } = validateResult;
    if (!success) {
      setErrors(errors);
      if (formName + firstErrorFieldKey) {
        document.getElementById(formName + firstErrorFieldKey).focus();
      }
    }
  };

  return (
    <>
      <AppNavigation />
      <div className="conts-title">
        <h2>
          GuideYupCase1 case(object, child(object)) :{' '}
          <a style={{ fontSize: 20 }} href={Config.hrefBasePath + `GuideYupCase1.tsx`}>
            GuideYupCase1
          </a>
        </h2>
      </div>
      <p>yup 가이드1</p>

      <h1>master object</h1>

      <div className="form-table">
        <div className="form-cell wid50">
          <div className="form-group wid100">
            <AppTextInput id={formName + 'msgKey'} errorMessage={errors.msgKey} />
          </div>
        </div>
      </div>
      <div className="form-table">
        <div className="form-cell wid50">
          <div className="form-group wid100">
            <AppTextInput id={formName + 'msgKor'} errorMessage={errors.msgKor} />
          </div>
        </div>
      </div>
      <div className="form-table">
        <div className="form-cell wid50">
          <div className="form-group wid100">
            <AppTextInput id={formName + 'msgEng'} errorMessage={errors.msgEng} />
          </div>
        </div>
      </div>
      <div className="form-table">
        <div className="form-cell wid50">
          <div className="form-group wid100">
            <AppTextInput id={formName + 'msgChn'} errorMessage={errors.msgChn} />
          </div>
        </div>
      </div>

      <h1>child object</h1>

      <div className="form-table">
        <div className="form-cell wid50">
          <div className="form-group wid100">
            <AppTextInput id={formName + 'detailInfo.name'} errorMessage={errors['detailInfo.name']} />
          </div>
        </div>
      </div>
      <div className="form-table">
        <div className="form-cell wid50">
          <div className="form-group wid100">
            <AppTextInput id={formName + 'detailInfo.age'} errorMessage={errors['detailInfo.age']} />
          </div>
        </div>
      </div>
      <div className="form-table">
        <div className="form-cell wid50">
          <div className="form-group wid100">
            <AppTextInput id={formName + 'detailInfo.content'} errorMessage={errors['detailInfo.content']} />
          </div>
        </div>
      </div>

      <p onClick={save} style={{ fontWeight: 'bold', fontSize: 20, padding: 10 }}>
        유효성체크(object)
      </p>
    </>
  );
}
export default GuideYupCase1;
