import { FORM_TYPE_ADD, FORM_TYPE_UPDATE } from '@/config/CommonConstant';
import ApiService from '@/services/ApiService';
import ModalService from '@/services/ModalService';
import ToastService from '@/services/ToastService';
import history from '@/utils/history';
import { produce } from 'immer';
import _ from 'lodash';
import CommonUtil from '@/utils/CommonUtil';

/*

  form + lsit slice : yup를 master, detail, list를 별도로 정의했을때

*/

// yupFormSchema : 상위 form validate
// yupListFormSchema : 목록에 매핑되어있는 form validate
// yupListSchema : 목록 전용 form validate

export const formBaseState = {
  detailInfo: {},
  errors: {},
  detailFormErrors: {},
  listErrors: {},
  isDirty: false,
  isValid: false,
  formDetailId: null,
  formType: FORM_TYPE_ADD,
  formValue: {},
  detailFormValue: {},
  selectedListIndex: -1,
  list: [],
};

export const createFormSliceYup = (set, get) => ({
  // 목록에 매핑되는 formValue
  detailFormValue: {},

  // 선택된 목록 index
  selectedListIndex: -1,

  // 목록을 별도로 처리 하기 위한 변수
  list: [],

  // table 선택 index 변경
  changeSelectedListIndex: (index, selectedRowInfo) => {
    const detailFormValue = { ...selectedRowInfo };
    set({ selectedListIndex: index, detailFormValue });
  },

  // 기본 formValue input 속성 변경 : master form
  changeInput: (inputName, inputValue) => {
    set(
      produce((state: any) => {
        const formValue = state.formValue;
        _.set(formValue, inputName, inputValue);
        state.isDirty = true;
        state.formValue = formValue;
      })
    );
  },

  // 목록에 매핑되어 있는 formValue 수정
  changeDetailFormInput: (inputName, inputValue) => {
    set(
      produce((state: any) => {
        const detailFormValue = state.detailFormValue;
        _.set(detailFormValue, inputName, inputValue);
        state.isDirty = true;
        state.detailFormValue = detailFormValue;
      })
    );
  },

  // 목록에 매핑되어있는 formValue validate
  validateDetailFormValue: async () => {
    let success = true;
    const errors = {};
    const { yupListFormSchema, detailFormValue, formName } = get();
    const formValue = { ...detailFormValue };
    let firstErrorFieldKey = '';

    try {
      await yupListFormSchema.validate(formValue, { abortEarly: false });
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
      const applyFormName = formName ? formName : '';
      const applyFirstErrorFieldKey = applyFormName + firstErrorFieldKey;
      try {
        if (document.getElementById(applyFirstErrorFieldKey)) {
          document.getElementById(applyFirstErrorFieldKey).focus();
        }
      } catch (e) {
        // 로그를 찍을 필요가 없는 에러 catch
      }
    }

    const validResult = {
      isValid: success,
      errors: errors,
    };

    set({
      isDirty: true,
      detailFormErrors: errors,
    });
    return validResult;
  },

  // 목록 validate : list에 isError(true/false) 적용하기, erros를 잘 read해서 처리해야 할듯
  validateList: async () => {
    let success = true;
    const validResult: any = {
      firstListErrorPath: '',
      firstErrorIndex: -1,
      isListFirstError: false,
      listErrorIndexList: [],
    };
    const errors = {};
    const { yupListSchema, list } = get();
    try {
      if (yupListSchema && list) {
        await yupListSchema.validate(list, { abortEarly: false });
      }
    } catch (error: any) {
      success = false;
      console.log(error.errors);
      const yupErrors = error.inner;
      const firstYupError = yupErrors[0];
      const groupErrorInfo = _.groupBy(yupErrors, 'path');
      const errorKeys = Object.keys(groupErrorInfo);
      errorKeys.forEach((errorKey) => {
        errors[errorKey] = groupErrorInfo[errorKey][0].message;
      });

      // const listErrorIndexList = yupErrors
      //   .map((error) => {
      //     const match = error.path.match(/\[(\d+)\]/);
      //     return match ? parseInt(match[1], 10) : null;
      //   })
      //   .filter((index) => index !== null);

      // // 첫 번째 에러와 해당 경로 추출
      // if (listErrorIndexList.length > 0) {
      //   const applyListErrorIndexList = _.uniq(listErrorIndexList);
      //   const firstErrorIndex = applyListErrorIndexList[0];
      //   const firstError = yupErrors.find((error) => error.path.indexOf(`[${firstErrorIndex}]`) !== -1);
      //   validResult.listErrorIndexList = applyListErrorIndexList;
      //   validResult.firstListErrorPath = firstError.path;
      //   validResult.firstErrorIndex = firstErrorIndex;
      // }

      // list 에러 별도 처리
      const listValidResult = CommonUtil.getYupListErrorInfo(yupErrors, firstYupError.path, '');
      validResult.firstListErrorPath = listValidResult.firstListErrorPath;
      validResult.firstErrorIndex = listValidResult.firstErrorIndex;
      validResult.isListFirstError = listValidResult.isListFirstError;
      validResult.listErrorIndexList = listValidResult.listErrorIndexList;
    }

    validResult.isValid = success;
    validResult.errors = errors;

    set(
      produce((state: any) => {
        state.isDirty = true;
        state.isValid = success;
        state.listErrors = errors;
        const list = state.list;
        if (validResult.listErrorIndexList && validResult.listErrorIndexList.length) {
          // list 속성에 isError을 셋팅
          list.forEach((listInfo, index) => {
            if (validResult.listErrorIndexList.findIndex((listErrorIndex) => index === listErrorIndex) !== -1) {
              listInfo.isError = true;
            } else {
              listInfo.isError = false;
            }
          });
        }
      })
    );

    return validResult;
  },

  // 전체 form validate
  validate: async () => {
    let success = true;
    const errors = {};
    const { yupFormSchema, getApiParam, formName, validateList } = get();
    const listValidateResult = await validateList();
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
      const applyFormName = formName ? formName : '';
      const applyFirstErrorFieldKey = applyFormName + firstErrorFieldKey;
      try {
        if (document.getElementById(applyFirstErrorFieldKey)) {
          document.getElementById(applyFirstErrorFieldKey).focus();
        }
      } catch (e) {
        // 로그를 찍을 필요가 없는 에러 catch
      }
    }

    const validResult = {
      isValid: listValidateResult.isValid && success,
      errors: errors,
      listErrors: listValidateResult.errors,
    };

    set({
      isDirty: true,
      isValid: listValidateResult.isValid && success,
      listErrors: listValidateResult.errors,
      errors: errors,
    });
    return validResult;
  },

  // 목록에 매핑되어있는 form 저장
  saveDetailForm: async () => {
    const { validateDetailFormValue, selectedListIndex, updateList, detailFormValue } = get();
    const { isValid } = await validateDetailFormValue();
    if (isValid) {
      updateList(selectedListIndex, detailFormValue);
    }
  },

  // 목록 정보를 index 기준으로 수정
  updateList: (index, detailFormValue) => {
    set(
      produce((state: any) => {
        const beforeInfo = state.list[index];
        const beforeStauts = beforeInfo.status;
        const newDetailFormValue = { ...detailFormValue };
        if (beforeStauts === 'D' || beforeStauts === 'A') {
          newDetailFormValue.status = 'U';
        }
        state.list[index] = newDetailFormValue;
      })
    );
  },

  // 목록의 상태만 수정
  updateListStatus: (index, status, byPassBeforeStatus = false) => {
    set(
      produce((state: any) => {
        if (state.list && state.list.length) {
          const beforeInfo = state.list[index];
          const beforeStauts = beforeInfo.status;
          if (byPassBeforeStatus) {
            state.list[index].status = status;
          } else {
            if (beforeStauts === 'D' || beforeStauts === 'A') {
              // 기존상태가 삭제거나 추가 상태이면 변경하지 않음
            } else {
              // 'U'로 반영하는 경우만 존재하지만 아래처럼 반영
              state.list[index].status = status;
            }
          }
        }
      })
    );
  },

  // 서버에 전송할 파라미터 추출
  getApiParam: () => {
    const { formValue, list, excludeApiKeys } = get();
    const apiParam = { ...formValue, list: list };
    if (excludeApiKeys && excludeApiKeys.length) {
      excludeApiKeys.forEach((keyName) => {
        if (apiParam[keyName]) {
          delete apiParam[keyName];
        }
      });
    }
    return apiParam;
  },

  // 저장
  save: async () => {
    const { validate, getApiParam, formType, formDetailId, formApiPath, cancel } = get();
    const { isValid } = await validate();
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
          await cancel();
        },
      });
    }
  },

  remove: async () => {
    const { formDetailId, formApiPath, removeAfterNavigation } = get();
    ModalService.confirm({
      body: '삭제하시겠습니까?',
      ok: async () => {
        await ApiService.delete(`${formApiPath}/${formDetailId}`);
        ModalService.alert({
          body: '삭제되었습니다.',
          ok: async () => {
            removeAfterNavigation();
          },
        });
      },
    });
  },

  // 상세 가져오기 : list 키값은 fix 이므로 list가 키값이 아니면 override해서 처리
  getDetail: async (id) => {
    const { formApiPath } = get();
    const response: any = await ApiService.get(`${formApiPath}/${id}`);
    const detailInfo = response.data;
    if (detailInfo.list) {
      detailInfo.list.map((info) => {
        info.status = 'N';
        return info;
      });
    }
    set({
      detailInfo: detailInfo,
      formValue: detailInfo,
      list: detailInfo.list,
      formDetailId: id,
      formType: FORM_TYPE_UPDATE,
    });
  },

  // 수정 페이지로 이동
  goFormPage: () => {
    const { formDetailId, baseRoutePath } = get();
    history.push(`${baseRoutePath}/${formDetailId}/edit`);
  },

  // 에러 전체 수정
  setErrors: (newErrors) => {
    if (newErrors) {
      set({ errors: newErrors });
    }
  },

  // 특정 키 기준으로 에러 수정
  changeErrors: (errorKey, errorMessage) => {
    const { errors } = get();
    const newErrors = { ...errors };
    newErrors[errorKey] = errorMessage;
    set({ errors: newErrors });
  },

  // 행추가
  addRow: () => {
    set(
      produce((state: any) => {
        state.selectedListIndex = 0;
        state.list.unshift({
          status: 'A',
        });
        state.detailFormValue = {};
      })
    );
  },

  // 삭제 이후 navigation
  removeAfterNavigation: () => {
    const { baseRoutePath } = get();
    history.replace(`${baseRoutePath}`);
  },

  // 취소, [목록으로] 핸들러
  cancel: () => {
    const { baseRoutePath } = get();
    history.push(`${baseRoutePath}`);
  },
});
