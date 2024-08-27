import ApiService from '@/services/ApiService';
import ModalService from '@/services/ModalService';
import ToastService from '@/services/ToastService';
import history from '@/utils/history';
import _ from 'lodash';
import { FORM_TYPE_ADD, FORM_TYPE_UPDATE } from '@/config/CommonConstant';

/*

  기본 form slice

*/

export const formBaseState = {
  detailInfo: {},
  errors: {},
  isDirty: false,
  isValid: false,
  requiredFields: [],
  excludeApiKeys: [],
  formDetailId: null,
  formType: FORM_TYPE_ADD,
  formValue: {},
};

// yup 연동 공통 slice : 가능하면 yup를 사용하는 방법으로 통일합니다
export const createFormSliceYup = (set, get) => ({
  changeStateProps: (propsName, propsValue) => {
    set({ [propsName]: propsValue });
  },

  changeInput: (inputName, inputValue) => {
    const { formValue } = get();
    formValue[inputName] = inputValue;
    set({ formValue: formValue, isDirty: true });
  },

  getApiParam: () => {
    const state = get();
    const apiParam = state.formValue;
    return apiParam;
  },

  validate: async () => {
    let success = true;
    const errors = {};
    const { yupFormSchema, getApiParam, formName } = get();
    const formValue = getApiParam();
    let firstErrorFieldKey = '';

    try {
      await yupFormSchema.validate(formValue, { abortEarly: false });
    } catch (error: any) {
      success = false;
      console.log(error.errors);
      const yupErrors = error.inner;
      firstErrorFieldKey = yupErrors[0].path;
      const groupErrorInfo = _.groupBy(yupErrors, 'path');
      const errorKeys = Object.keys(groupErrorInfo);
      errorKeys.forEach((errorKey) => {
        errors[errorKey] = groupErrorInfo[errorKey][0].message;
      });
    }

    if (firstErrorFieldKey) {
      success = false;
      // alert(`firstErrorFieldKey : ${firstErrorFieldKey}`);
      if (document.getElementById(formName + firstErrorFieldKey)) {
        document.getElementById(formName + firstErrorFieldKey).focus();
      }
    }

    set({
      isDirty: true,
      isValid: success,
      errors: errors,
    });
    return success;
  },

  save: async () => {
    const { validate, getApiParam, formType, formDetailId, formApiPath, baseRoutePath } = get();
    const isValid = await validate();
    if (isValid) {
      ModalService.confirm({
        body: '저장하시겠습니까?',
        ok: async () => {
          const apiParam = getApiParam();
          console.log(`apiParam : ${JSON.stringify(apiParam)}`);
          if (formType === FORM_TYPE_ADD) {
            await ApiService.post(`${formApiPath}`, apiParam);
          } else {
            await ApiService.put(`${formApiPath}/${formDetailId}`, apiParam);
          }
          await set({ isDirty: false });
          ToastService.success('저장되었습니다.');
          history.push(`${baseRoutePath}`);
        },
      });
    }
  },

  remove: async () => {
    const { formDetailId, formApiPath, baseRoutePath } = get();
    // ModalService.alert({ body: '삭제하시겠습니까?' });
    ModalService.confirm({
      body: '삭제하시겠습니까?',
      ok: async () => {
        await ApiService.delete(`${formApiPath}/${formDetailId}`);
        ModalService.alert({
          body: '삭제되었습니다.',
          ok: async () => {
            history.replace(`${baseRoutePath}`);
          },
        });
      },
    });
  },

  getDetail: async (id) => {
    const { formApiPath } = get();
    const response: any = await ApiService.get(`${formApiPath}/${id}`);
    const detailInfo = response.data;
    set({
      detailInfo: detailInfo,
      formValue: detailInfo,
      formDetailId: id,
      formType: FORM_TYPE_UPDATE,
    });
  },

  // 모달 전용으로 formData를 set할때 사용
  setFormValue: (detailInfo, id = '') => {
    const copyDetailInfo = detailInfo ? _.cloneDeep(detailInfo) : null;
    set({
      detailInfo: copyDetailInfo,
      formValue: copyDetailInfo,
      formDetailId: id,
      formType: id ? FORM_TYPE_UPDATE : FORM_TYPE_ADD,
    });
  },

  goFormPage: () => {
    const { formDetailId, baseRoutePath } = get();
    history.push(`${baseRoutePath}/${formDetailId}/edit`);
  },

  setErrors: (newErrors) => {
    if (newErrors) {
      set({ errors: newErrors });
    }
  },

  changeErrors: (errorKey, errorMessage) => {
    const { errors } = get();
    errors[errorKey] = errorMessage;
    set({ errors: errors });
  },

  cancel: () => {
    const { baseRoutePath } = get();
    history.push(`${baseRoutePath}`);
  },
});
