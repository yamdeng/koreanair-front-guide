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
  childeList1: yup
    .array()
    .min(1, '목록은 최소 하나여야 합니다.')
    .of(
      yup.object().shape({
        name: yup.string().required('Name is a required field'),
        age: yup.number().required('age is a required field'),
        content: yup.string().required('content is a required field'),
      })
    ),
});

const childeList1 = [];
// const childeList1 = [
//   { name: '', age: null },
//   { name: 'aaa', age: null, content: '' },
// ];

/* form 초기화 */
const initFormValue = {
  msgKey: 'aa',
  msgKor: 'b',
  msgEng: 'c',
  msgChn: '',
  childeList1: childeList1,
};

function GuideYupCase2() {
  const [formValue] = useImmer({ ...initFormValue });
  const [errors, setErrors] = useState<any>({});

  const { childeList1 } = formValue;

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
    <div className="editbox">
      <AppNavigation />
      <div className="conts-title">
        <h2>
          GuideYupCase2 case(object, child(list)) :{' '}
          <a style={{ fontSize: 20 }} href={Config.hrefBasePath + `GuideYupCase2.tsx`}>
            GuideYupCase2
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

      {/* childList1에 목록이 하나도 없을 경우 */}
      <h1>{errors.childeList1}</h1>

      <h1>child list</h1>
      <div>
        {childeList1.map((childInfo, index) => {
          // const { name, age, content } = childInfo;
          return (
            <div className="form-table" key={index}>
              <div className="form-cell wid50">
                <div className="form-group wid100">
                  <AppTextInput
                    id={formName + `childeList1[${index}].name`}
                    errorMessage={errors[`childeList1[${index}].name`]}
                  />
                </div>
              </div>
              <div className="form-cell wid50">
                <div className="form-group wid100">
                  <AppTextInput
                    id={formName + `childeList1[${index}].age`}
                    errorMessage={errors[`childeList1[${index}].age`]}
                  />
                </div>
              </div>
              <div className="form-cell wid50">
                <div className="form-group wid100">
                  <AppTextInput
                    id={formName + `childeList1[${index}].content`}
                    errorMessage={errors[`childeList1[${index}].content`]}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <p onClick={save} style={{ fontWeight: 'bold', fontSize: 20, padding: 10 }}>
        유효성체크(list)
      </p>
    </div>
  );
}
export default GuideYupCase2;
