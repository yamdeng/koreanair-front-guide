import { FORM_TYPE_ADD, FORM_TYPE_UPDATE } from '@/config/CommonConstant';
import ApiService from '@/services/ApiService';
import ModalService from '@/services/ModalService';
import ToastService from '@/services/ToastService';
import CommonUtil from '@/utils/CommonUtil';

import history from '@/utils/history';
import { produce } from 'immer';
import _ from 'lodash';

/*

   form + lsit slice : yup를 하나로 정의했을때

*/

export const formBaseState = {
  detailInfo: {},
  errors: {},
  isDirty: false,
  isValid: false,
  formDetailId: null,
  formType: FORM_TYPE_ADD,
  formValue: {},
  selectedListIndex: -1,
};

export const createFormSliceYup = (set, get) => ({
  // 선택된 목록 index
  selectedListIndex: -1,

  // table 선택 index 변경
  changeSelectedListIndex: (index) => {
    set({ selectedListIndex: index });
  },

  // list가 아닌 input 속성 변경
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

  // list에 해당하는 속성 변경
  changeListFormInput: (inputName, inputValue) => {
    const { changeInput, selectedListIndex, updateListStatus } = get();
    changeInput(inputName, inputValue);
    updateListStatus(selectedListIndex, 'U', true);
  },

  // 목록의 상태 update : byPassBeforeStatus(true)인 경우는 이전 상태를 무시하고 강제 status 반영하기
  updateListStatus: (index, status, byPassBeforeStatus = false) => {
    set(
      produce((state: any) => {
        if (state.formValue && state.formValue.list && state.formValue.list.length) {
          const beforeInfo = state.formValue.list[index];
          const beforeStauts = beforeInfo.status;
          if (byPassBeforeStatus) {
            state.formValue.list[index].status = status;
          } else {
            if (beforeStauts === 'D' || beforeStauts === 'A') {
              // 기존상태가 삭제거나 추가 상태이면 변경하지 않음
            } else {
              // 'U'로 반영하는 경우만 존재하지만 아래처럼 반영
              state.formValue.list[index].status = status;
            }
          }
        }
      })
    );
  },

  // 서버에 전송할 파라미터 추출
  getApiParam: () => {
    const { formValue, excludeApiKeys } = get();
    const apiParam = { ...formValue };
    if (excludeApiKeys && excludeApiKeys.length) {
      excludeApiKeys.forEach((keyName) => {
        if (apiParam[keyName]) {
          delete apiParam[keyName];
        }
      });
    }
    return apiParam;
  },

  // 전체 form validate
  validate: async () => {
    let success = true;
    const validResult: any = {
      firstListErrorPath: '',
      firstErrorIndex: -1,
      isListFirstError: false,
      listErrorIndexList: [],
    };
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
      const firstYupError = yupErrors[0];
      firstErrorFieldKey = firstYupError.path;
      const groupErrorInfo = _.groupBy(yupErrors, 'path');
      const errorKeys = Object.keys(groupErrorInfo);
      errorKeys.forEach((errorKey) => {
        errors[errorKey] = groupErrorInfo[errorKey][0].message;
      });

      // list 에러 별도 처리
      const listValidResult = CommonUtil.getYupListErrorInfo(yupErrors, firstErrorFieldKey);
      validResult.firstListErrorPath = listValidResult.firstListErrorPath;
      validResult.firstErrorIndex = listValidResult.firstErrorIndex;
      validResult.isListFirstError = listValidResult.isListFirstError;
      validResult.listErrorIndexList = listValidResult.listErrorIndexList;
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

    validResult.isValid = success;
    validResult.errors = errors;

    set(
      produce((state: any) => {
        state.isDirty = true;
        state.isValid = success;
        state.errors = errors;
        const formValue = state.formValue;
        if (validResult.listErrorIndexList && validResult.listErrorIndexList.length) {
          // list 속성에 isError을 셋팅
          formValue.list.forEach((listInfo, index) => {
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

  // 자식 폼에서 저장시 validate 만 수행
  saveDetailForm: async () => {
    const { validate } = get();
    await validate();
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

  // 삭제
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
        state.formValue.list.unshift({
          status: 'A',
        });
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
