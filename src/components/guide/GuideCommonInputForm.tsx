import AppAutoComplete from '@/components/common/AppAutoComplete';
import AppCheckbox from '@/components/common/AppCheckbox';
import AppCheckboxGroup from '@/components/common/AppCheckboxGroup';
import AppCodeSelect from '@/components/common/AppCodeSelect';
import AppDatePicker from '@/components/common/AppDatePicker';
import AppDeptSelectInput from '@/components/common/AppDeptSelectInput';
import AppEditor from '@/components/common/AppEditor';
import AppFileAttach from '@/components/common/AppFileAttach';
import AppRadioGroup from '@/components/common/AppRadioGroup';
import AppSelect from '@/components/common/AppSelect';
import AppTextArea from '@/components/common/AppTextArea';
import AppTextInput from '@/components/common/AppTextInput';
import AppTimePicker from '@/components/common/AppTimePicker';
import AppTreeSelect from '@/components/common/AppTreeSelect';
import AppUserSelectInput from '@/components/common/AppUserSelectInput';
import Config from '@/config/Config';
import { createFormSliceYup, formBaseState } from '@/stores/slice/formSlice';
import { useState } from 'react';
import * as yup from 'yup';
import { create } from 'zustand';
import AppNavigation from '../common/AppNavigation';
import AppRangeDatePicker from '../common/AppRangeDatePicker';
import AppSearchInput from '../common/AppSearchInput';

/* yup validation */
const yupFormSchema = yup.object({
  deptCd: yup.string().required(),
  nameKor: yup.string(),
  nameEng: yup.string(),
  nameChn: yup.string(),
  nameJpn: yup.string(),
  nameEtc: yup.string(),
  upperDeptCd: yup.string(),
  treeType: yup.string(),
  fullPath: yup.string(),
  sortOrder: yup.number().nullable(),
  rprsnUserId: yup.string(),
  compCd: yup.string(),
  eaiYn: yup.string(),
  postName: yup.string(),
  regUserId: yup.string(),
  regDttm: yup.string(),
});

/* TODO : form 초기값 상세 셋팅 */
/* formValue 초기값 */
const initFormValue = {
  deptCd: '',
  nameKor: '',
  nameEng: '',
  nameChn: '',
  nameJpn: '',
  nameEtc: '',
  upperDeptCd: '',
  treeType: '',
  fullPath: '',
  sortOrder: null,
  rprsnUserId: '',
  compCd: '',
  eaiYn: '',
  postName: '',
  regUserId: '',
  regDttm: '',
};

/* form 초기화 */
const initFormData = {
  ...formBaseState,

  formApiPath: 'TODO : api path',
  baseRoutePath: 'TODO : UI route path',
  formName: 'SysDeptForm',
  formValue: {
    ...initFormValue,
  },
};

/* zustand store 생성 */
const useSysDeptFormStore = create<any>((set, get) => ({
  ...createFormSliceYup(set, get),

  ...initFormData,

  yupFormSchema: yupFormSchema,

  clear: () => {
    set({ ...formBaseState, formValue: { ...initFormValue } });
  },
}));

/* TODO : 컴포넌트 이름을 확인해주세요 */
function SysDeptForm() {
  const [checkedRequired, setCheckedRequired] = useState(false);
  const [checkedDisabled, setCheckedDisabled] = useState(false);
  const [checkedErrorMessage, setCheckedErrorMessage] = useState(false);
  const [checkedPlaceHolder, setCheckedPlaceHolder] = useState(false);
  const [checkedValue, setCheckedValue] = useState(false);
  const [checkedToolTip, setCheckedToolTip] = useState(false);
  const [stringValue, setStringValue] = useState('aaa');
  const [numberValue, setNumberValue] = useState(0);

  /* formStore state input 변수 */
  const { changeInput, formType, formValue, save, remove, cancel } = useSysDeptFormStore();

  const { upperDeptCd, rprsnUserId, regUserId, regDttm } = formValue;

  return (
    <>
      <AppNavigation />
      <div className="conts-title">
        <h2>
          app-input 공통 속성 :{' '}
          <a style={{ fontSize: 20 }} href={Config.hrefBasePath + `GuideCommonInputForm.tsx`}>
            GuideCommonInputForm
          </a>
        </h2>
      </div>
      <div className="editbox">
        <div className="form-table">
          <div className="form-cell wid50">
            <div className="group-box-wrap wid100">
              <AppCheckbox
                label="required"
                value={checkedRequired}
                onChange={(value) => {
                  setCheckedRequired(value);
                }}
              />
            </div>
          </div>
          <div className="form-cell wid50">
            <div className="group-box-wrap wid100">
              <AppCheckbox
                label="disabeld"
                value={checkedDisabled}
                onChange={(value) => {
                  setCheckedDisabled(value);
                }}
              />
            </div>
          </div>
          <div className="form-cell wid50">
            <div className="group-box-wrap wid100">
              <AppCheckbox
                label="errorMessage"
                value={checkedErrorMessage}
                onChange={(value) => {
                  setCheckedErrorMessage(value);
                }}
              />
            </div>
          </div>
          <div className="form-cell wid50">
            <div className="group-box-wrap wid100">
              <AppCheckbox
                label="placeholder"
                value={checkedPlaceHolder}
                onChange={(value) => {
                  setCheckedPlaceHolder(value);
                }}
              />
            </div>
          </div>
          <div className="form-cell wid50">
            <div className="group-box-wrap wid100">
              <AppCheckbox
                label="value"
                value={checkedValue}
                onChange={(value) => {
                  setCheckedValue(value);
                }}
              />
            </div>
          </div>
          <div className="form-cell wid50">
            <div className="group-box-wrap wid100">
              <AppCheckbox
                label="toolTip"
                value={checkedToolTip}
                onChange={(value) => {
                  setCheckedToolTip(value);
                }}
              />
            </div>
          </div>
        </div>

        <div className="form-table">
          <div className="form-cell wid100">
            <div className="form-group wid100">
              <AppSearchInput
                id="SysDeptFormdeptCd"
                name="deptCd"
                label="AppSearchInput"
                value={checkedValue ? stringValue : ''}
                onChange={(value) => {
                  setStringValue(value);
                }}
                errorMessage={checkedErrorMessage ? 'error' : ''}
                required={checkedRequired}
                disabled={checkedDisabled}
                placeholder={checkedPlaceHolder ? '선택해주세요' : ''}
                toolTipMessage={checkedToolTip ? 'aaa\nbbb\ncccc' : ''}
              />
            </div>
          </div>
        </div>
        <hr className="line"></hr>
        <div className="form-table">
          <div className="form-cell wid100">
            <div className="form-group wid100">
              <AppTextInput
                id="SysDeptFormdeptCd"
                name="deptCd"
                label="AppTextInput"
                value={checkedValue ? stringValue : ''}
                errorMessage={checkedErrorMessage ? 'error' : ''}
                required={checkedRequired}
                disabled={checkedDisabled}
                placeholder={checkedPlaceHolder ? '선택해주세요' : ''}
                toolTipMessage={checkedToolTip ? 'aaa\nbbb\ncccc' : ''}
              />
            </div>
          </div>
        </div>
        <hr className="line"></hr>

        <div className="form-table">
          <div className="form-cell wid100">
            <div className="form-group wid100">
              <AppTextInput
                inputType="number"
                id="SysDeptFormnameKor"
                name="AppTextInput(number)"
                label="AppTextInput(number)"
                value={checkedValue ? numberValue : ''}
                onChange={(value) => {
                  setNumberValue(value);
                }}
                errorMessage={checkedErrorMessage ? 'error' : ''}
                required={checkedRequired}
                disabled={checkedDisabled}
                placeholder={checkedPlaceHolder ? '선택해주세요' : ''}
                toolTipMessage={checkedToolTip ? 'aaa\nbbb\ncccc' : ''}
              />
            </div>
          </div>
        </div>
        <hr className="line"></hr>

        <div className="form-table">
          <div className="form-cell wid100">
            <div className="form-group wid100">
              <AppSelect
                id="SysDeptFormnameEng"
                name="nameEng"
                label="AppSelect"
                value={checkedValue ? 'aaa' : ''}
                options={[{ label: 'aaa', value: 'aaa' }]}
                errorMessage={checkedErrorMessage ? 'error' : ''}
                required={checkedRequired}
                disabled={checkedDisabled}
                placeholder={checkedPlaceHolder ? '선택해주세요' : ''}
                toolTipMessage={checkedToolTip ? 'aaa\nbbb\ncccc' : ''}
              />
            </div>
          </div>
        </div>
        <hr className="line"></hr>

        <div className="form-table">
          <div className="form-cell wid100">
            <div className="form-group wid100">
              <AppCodeSelect
                codeGrpId="CODE_GRP_303"
                id="SysDeptFormnameChn"
                name="nameChn"
                label="AppCodeSelect"
                value={checkedValue ? '200001003' : ''}
                errorMessage={checkedErrorMessage ? 'error' : ''}
                required={checkedRequired}
                disabled={checkedDisabled}
                placeholder={checkedPlaceHolder ? '선택해주세요' : ''}
                toolTipMessage={checkedToolTip ? 'aaa\nbbb\ncccc' : ''}
              />
            </div>
          </div>
        </div>
        <hr className="line"></hr>

        <div className="form-table">
          <div className="form-cell wid100">
            <div className="form-group wid100">
              <AppTextArea
                id="SysDeptFormnameJpn"
                name="nameJpn"
                label="AppTextArea"
                value={checkedValue ? stringValue : ''}
                errorMessage={checkedErrorMessage ? 'error' : ''}
                required={checkedRequired}
                disabled={checkedDisabled}
                placeholder={checkedPlaceHolder ? '선택해주세요' : ''}
                toolTipMessage={checkedToolTip ? 'aaa\nbbb\ncccc' : ''}
              />
            </div>
          </div>
        </div>
        <hr className="line"></hr>

        <div className="form-table">
          <div className="form-cell wid100">
            <div className="form-group wid100">
              <AppEditor
                id="SysDeptFormnameEtc"
                name="nameEtc"
                label="AppEditor"
                value={stringValue}
                onChange={(value) => {
                  setStringValue(value);
                }}
                errorMessage={checkedErrorMessage ? 'error' : ''}
                required={checkedRequired}
                placeholder={'선택해주세요'}
              />
            </div>
          </div>
        </div>
        <hr className="line"></hr>

        <div className="form-table">
          <div className="form-cell wid100">
            <div className="form-group wid100">
              <AppDatePicker
                id="SysDeptFormupperDeptCd"
                name="upperDeptCd"
                label="AppDatePicker"
                value={checkedValue ? '2024-08-18' : ''}
                errorMessage={checkedErrorMessage ? 'error' : ''}
                required={checkedRequired}
                disabled={checkedDisabled}
                placeholder={checkedPlaceHolder ? '선택해주세요' : ''}
                toolTipMessage={checkedToolTip ? 'aaa\nbbb\ncccc' : ''}
              />
            </div>
          </div>
        </div>
        <hr className="line"></hr>

        <div className="form-table">
          <div className="form-cell wid100">
            <div className="form-group wid100">
              <AppRangeDatePicker
                id="AppRangeDatePicker"
                name="AppRangeDatePicker"
                label="AppRangeDatePicker"
                value={upperDeptCd}
                errorMessage={checkedErrorMessage ? 'error' : ''}
                required={checkedRequired}
                disabled={checkedDisabled}
                placeholder={checkedPlaceHolder ? '선택해주세요' : ''}
                toolTipMessage={checkedToolTip ? 'aaa\nbbb\ncccc' : ''}
              />
            </div>
          </div>
        </div>
        <hr className="line"></hr>
        <div className="form-table">
          <div className="form-cell wid100">
            <div className="form-group wid100">
              <AppTimePicker
                id="SysDeptFormtreeType"
                name="treeType"
                label="AppTimePicker"
                value={checkedValue ? '11:21:00' : ''}
                errorMessage={checkedErrorMessage ? 'error' : ''}
                required={checkedRequired}
                disabled={checkedDisabled}
                placeholder={checkedPlaceHolder ? '선택해주세요' : ''}
                toolTipMessage={checkedToolTip ? 'aaa\nbbb\ncccc' : ''}
              />
            </div>
          </div>
        </div>
        <hr className="line"></hr>

        <div className="form-table">
          <div className="form-cell wid100">
            <div className="group-box-wrap wid100">
              <AppCheckbox
                id="SysDeptFormfullPath"
                name="fullPath"
                label="AppCheckbox"
                errorMessage={checkedErrorMessage ? 'error' : ''}
                required={checkedRequired}
                disabled={checkedDisabled}
                toolTipMessage={checkedToolTip ? 'aaa\nbbb\ncccc' : ''}
              />
            </div>
          </div>
        </div>
        <hr className="line"></hr>

        <div className="form-table">
          <div className="form-cell wid100">
            <div className="group-box-wrap wid100">
              <AppCheckboxGroup
                id="SysDeptFormsortOrder"
                name="sortOrder"
                label="AppCheckboxGroup"
                options={[
                  { value: '111', label: '111_LABEL' },
                  { value: '222', label: '222_LABEL' },
                ]}
                value={[]}
                onChange={(value) => changeInput('sortOrder', value)}
                errorMessage={checkedErrorMessage ? 'error' : ''}
                required={checkedRequired}
                disabled={checkedDisabled}
                toolTipMessage={checkedToolTip ? 'aaa\nbbb\ncccc' : ''}
              />
            </div>
          </div>
        </div>
        <hr className="line"></hr>

        <div className="form-table">
          <div className="form-cell wid100">
            <div className="group-box-wrap wid100">
              <AppRadioGroup
                id="SysDeptFormrprsnUserId"
                name="rprsnUserId"
                label="AppRadioGroup"
                options={[
                  { value: '111', label: '111_LABEL' },
                  { value: '222', label: '222_LABEL' },
                  { value: '333', label: '333_LABEL' },
                  { value: '444', label: '444_LABEL' },
                  { value: '555', label: '555_LABEL' },
                  { value: '666', label: '666_LABEL' },
                ]}
                value={rprsnUserId}
                onChange={(value) => changeInput('rprsnUserId', value)}
                errorMessage={checkedErrorMessage ? 'error' : ''}
                required={checkedRequired}
                disabled={checkedDisabled}
                toolTipMessage={checkedToolTip ? 'aaa\nbbb\ncccc' : ''}
              />
            </div>
          </div>
        </div>
        <hr className="line"></hr>

        <div className="form-table">
          <div className="form-cell wid100">
            <div className="form-group wid100">
              <AppFileAttach
                label="AppFileAttach"
                fileGroupSeq={null}
                workScope={'업무구문(A,O,S)'}
                required={checkedRequired}
                disabled={checkedDisabled}
                errorMessage={checkedErrorMessage ? 'error' : ''}
                toolTipMessage={checkedToolTip ? 'aaa\nbbb\ncccc' : ''}
              />
            </div>
          </div>
        </div>
        <hr className="line"></hr>

        <div className="form-table">
          <div className="form-cell wid100">
            <div className="form-group wid100">
              <AppUserSelectInput
                id="SysDeptFormeaiYn"
                name="eaiYn"
                label="AppUserSelectInput"
                value={checkedValue ? { nameKor: '안용성' } : null}
                errorMessage={checkedErrorMessage ? 'error' : ''}
                required={checkedRequired}
                disabled={checkedDisabled}
                placeholder={checkedPlaceHolder ? '선택해주세요' : ''}
                toolTipMessage={checkedToolTip ? 'aaa\nbbb\ncccc' : ''}
              />
            </div>
          </div>
        </div>
        <hr className="line"></hr>

        <div className="form-table">
          <div className="form-cell wid100">
            <div className="form-group wid100">
              <AppDeptSelectInput
                id="SysDeptFormpostName"
                name="postName"
                label="AppDeptSelectInput"
                value={checkedValue ? { nameKor: '개발팀' } : null}
                errorMessage={checkedErrorMessage ? 'error' : ''}
                required={checkedRequired}
                disabled={checkedDisabled}
                placeholder={checkedPlaceHolder ? '선택해주세요' : ''}
                toolTipMessage={checkedToolTip ? 'aaa\nbbb\ncccc' : ''}
              />
            </div>
          </div>
        </div>
        <hr className="line"></hr>

        <div className="form-table">
          <div className="form-cell wid100">
            <div className="form-group wid100">
              <AppAutoComplete
                id="SysDeptFormregUserId"
                name="regUserId"
                label="AppAutoComplete"
                value={regUserId}
                options={[]}
                onChange={(value) => changeInput('regUserId', value)}
                errorMessage={checkedErrorMessage ? 'error' : ''}
                required={checkedRequired}
                disabled={checkedDisabled}
                placeholder={checkedPlaceHolder ? '선택해주세요' : ''}
                toolTipMessage={checkedToolTip ? 'aaa\nbbb\ncccc' : ''}
              />
            </div>
          </div>
        </div>
        <hr className="line"></hr>

        <div className="form-table">
          <div className="form-cell wid100">
            <div className="form-group wid100">
              <AppTreeSelect
                id="SysDeptFormregDttm"
                name="regDttm"
                label="AppTreeSelect"
                fieldNames={{ label: '라벨키', value: 'value키' }}
                treeData={[]}
                treeDefaultExpandAll={false}
                treeCheckable={false}
                value={regDttm}
                onChange={(value) => changeInput('regDttm', value)}
                errorMessage={checkedErrorMessage ? 'error' : ''}
                required={checkedRequired}
                disabled={checkedDisabled}
                placeholder={checkedPlaceHolder ? '선택해주세요' : ''}
                toolTipMessage={checkedToolTip ? 'aaa\nbbb\ncccc' : ''}
              />
            </div>
          </div>
        </div>
        <hr className="line"></hr>
      </div>
      {/* 하단 버튼 영역 */}
      <div className="contents-btns">
        <button className="btn_text text_color_neutral-10 btn_confirm" onClick={save}>
          저장
        </button>
        <button
          className="btn_text text_color_darkblue-100 btn_close"
          onClick={remove}
          style={{ display: formType !== 'add' ? '' : 'none' }}
        >
          삭제
        </button>
        <button className="btn_text text_color_darkblue-100 btn_close" onClick={cancel}>
          취소
        </button>
      </div>
    </>
  );
}
export default SysDeptForm;
