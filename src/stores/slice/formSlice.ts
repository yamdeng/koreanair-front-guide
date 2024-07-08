/* eslint-disable sonarjs/cognitive-complexity */
import _ from 'lodash';

/*

  기본 form slice

*/

/*

  TODO
   -autoSaveApiPath를 전달받음

*/

export const defaultFormExcludeKeys = [
  'autoSaveApiPath',
  'requiredFields',
  'excludeApiKeys',
  'errors',
  'isDirty',
  'isValid',
  'yupFormSchema',
];

export const formBaseState = {
  errors: {},
  isDirty: false,
  isValid: false,
  requiredFields: [],
  excludeApiKeys: [],
  formDetailId: null,
  formType: 'add',
};

export const createFormSlice = (set, get) => ({
  changeInput: (inputName, inputValue) => {
    set({ [inputName]: inputValue });
  },

  getApiParam: () => {
    const state = get();
    const stateKeys = Object.keys(state);
    const excludeFilterKeys = defaultFormExcludeKeys;
    if (state.excludeApiKeys && state.excludeApiKeys.length) {
      excludeFilterKeys.push(...state.excludeApiKeys);
    }
    const applyStateKeys = stateKeys.filter((key) => {
      if (typeof state[key] === 'function') {
        return false;
      } else if (excludeFilterKeys.includes(key)) {
        return false;
      }
      return true;
    });
    const apiParam = {};
    applyStateKeys.forEach((apiRequestKey) => {
      apiParam[apiRequestKey] = state[apiRequestKey];
    });
    return apiParam;
  },

  validate: () => {
    let success = true;
    const errors = {};
    const state = get();
    const { requiredFields } = get();
    let firstErrorFieldKey = '';
    if (requiredFields && requiredFields.length) {
      requiredFields.forEach((fieldKey: string) => {
        const fieldValue = state[fieldKey];
        if (_.isArray(fieldValue)) {
          if (!fieldValue.length) {
            errors[fieldKey] = 'required field';
            if (!firstErrorFieldKey) {
              firstErrorFieldKey = fieldKey;
            }
          }
        } else {
          if (_.isNumber(fieldValue)) {
            if (fieldValue === null || fieldValue === undefined) {
              errors[fieldKey] = 'required field';
              if (!firstErrorFieldKey) {
                firstErrorFieldKey = fieldKey;
              }
            }
          } else {
            if (!fieldValue) {
              errors[fieldKey] = 'required field';
              if (!firstErrorFieldKey) {
                firstErrorFieldKey = fieldKey;
              }
            }
          }
        }
      });
    }

    if (firstErrorFieldKey) {
      success = false;
      // alert(`firstErrorFieldKey : ${firstErrorFieldKey}`);
      if (document.getElementById(firstErrorFieldKey)) {
        document.getElementById(firstErrorFieldKey).focus();
      }
    }

    set({
      isDirty: true,
      isValid: success,
      errors: errors,
    });
    return success;
  },
});

// yup 연동 공통 slice
export const createFormSliceYup = (set, get) => ({
  changeInput: (inputName, inputValue) => {
    set({ [inputName]: inputValue });
  },

  getApiParam: () => {
    const state = get();
    const stateKeys = Object.keys(state);
    const excludeFilterKeys = defaultFormExcludeKeys;
    if (state.excludeApiKeys && state.excludeApiKeys.length) {
      excludeFilterKeys.push(...state.excludeApiKeys);
    }
    const applyStateKeys = stateKeys.filter((key) => {
      if (typeof state[key] === 'function') {
        return false;
      } else if (excludeFilterKeys.includes(key)) {
        return false;
      }
      return true;
    });
    const apiParam = {};
    applyStateKeys.forEach((apiRequestKey) => {
      apiParam[apiRequestKey] = state[apiRequestKey];
    });
    return apiParam;
  },

  validate: async () => {
    let success = true;
    const errors = {};
    const { yupFormSchema, getApiParam } = get();
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
      if (document.getElementById(firstErrorFieldKey)) {
        document.getElementById(firstErrorFieldKey).focus();
      }
    }

    set({
      isDirty: true,
      isValid: success,
      errors: errors,
    });
    return success;
  },
});
