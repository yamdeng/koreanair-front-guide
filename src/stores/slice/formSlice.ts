import ApiService from '@/services/ApiService';
import ModalService from '@/services/ModalService';
import history from '@/utils/history';
import _ from 'lodash';

/*

  기본 form slice

*/
export const defaultFormExcludeKeys = [
  'autoSaveApiPath',
  'requiredFields',
  'excludeApiKeys',
  'errors',
  'isDirty',
  'isValid',
  'yupFormSchema',
  'formApiPath',
  'baseRoutePath',
  'detailInfo',
];

export const formBaseState = {
  detailInfo: {},
  errors: {},
  isDirty: false,
  isValid: false,
  requiredFields: [],
  excludeApiKeys: [],
  formDetailId: null,
  formType: 'add',
  formApiPath: '',
  formName: '',
  baseRoutePath: '',
  formValue: {},
};

// yup 연동 공통 slice : 가능하면 yup를 사용하는 방법으로 통일합니다
export const createFormSliceYup = (set, get) => ({
  changeInput: (inputName, inputValue) => {
    const { formValue } = get();
    formValue[inputName] = inputValue;
    set({ formValue: formValue });
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
      const apiParam = getApiParam();
      console.log(`apiParam : ${JSON.stringify(apiParam)}`);
      if (formType === 'add') {
        await ApiService.post(`${formApiPath}`, apiParam);
      } else {
        await ApiService.put(`${formApiPath}/${formDetailId}`, apiParam);
      }
      history.push(`${baseRoutePath}`);
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
          ok: () => {
            history.push(`${baseRoutePath}`);
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
      formType: 'update',
    });
  },

  goFormPage: () => {
    const { formDetailId, baseRoutePath } = get();
    history.push(`${baseRoutePath}/${formDetailId}/edit`);
  },

  cancel: () => {
    const { baseRoutePath } = get();
    history.push(`${baseRoutePath}`);
  },
});
