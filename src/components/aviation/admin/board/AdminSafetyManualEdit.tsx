import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FORM_TYPE_ADD, FORM_TYPE_UPDATE } from '@/config/CommonConstant';
import AppTextInput from '@/components/common/AppTextInput';
import AppDatePicker from '@/components/common/AppDatePicker';
import AppTextArea from '@/components/common/AppTextArea';
import AppCodeSelect from '@/components/common/AppCodeSelect';
import AppFileAttach from '@/components/common/AppFileAttach';
import AppNavigation from '@/components/common/AppNavigation';

/* store  */
import { create } from 'zustand';
import { formBaseState, createFormSliceYup } from '@/stores/slice/formSlice';
import * as yup from 'yup';

/* yup validation */
const yupFormSchema = yup.object({
  jobType: yup.string().required('업무구분은 필수 입력 항목입니다.'),
  revisionDt: yup.string().required('개정일자는 필수 입력 항목입니다.'),
  manualName: yup.string().required('매뉴얼명은 필수 입력 항목입니다.'),
  languageType: yup.string().required('언어구분은 필수 입력 항목입니다.'),
  useYn: yup.string().required('사용여부는 필수 입력 항목입니다.'),
  notes: yup.string(),
  originalFileGroupSeq: yup.number().nullable(),
  newOldFileGroupSeq: yup.number().nullable(),
});

/* TODO : form 초기값 상세 셋팅 */
/* formValue 초기값 */
const initFormValue = {
  jobType: '',
  revisionDt: '',
  manualName: '',
  languageType: '',
  useYn: '',
  notes: '',
  originalFileGroupSeq: null,
  newOldFileGroupSeq: null,
};

/* form 초기화 */
const initFormData = {
  ...formBaseState,

  formApiPath: 'avn/admin/board/manuals',
  baseRoutePath: '/aviation/board-manage/safety-manual',
  formName: 'useManualFormStore',
  formValue: {
    ...initFormValue,
  },
};

/* zustand store 생성 */
const useManualFormStore = create<any>((set, get) => ({
  ...createFormSliceYup(set, get),

  ...initFormData,

  yupFormSchema: yupFormSchema,

  clear: () => {
    set({ ...formBaseState, formValue: { ...initFormValue } });
  },
}));

function AdminSafetyManualEdit() {
  /* formStore state input 변수 */
  const { errors, changeInput, getDetail, formType, formValue, save, remove, cancel, clear } = useManualFormStore();

  const { jobType, revisionDt, manualName, languageType, useYn, notes, originalFileGroupSeq, newOldFileGroupSeq } =
    formValue;

  const { detailId } = useParams();

  useEffect(() => {
    if (detailId && detailId !== 'add') {
      getDetail(detailId);
    }
    return clear;
  }, []);

  return (
    <>
      <AppNavigation />
      {/*경로 */}
      <div className="conts-title">
        <h2>안전메뉴얼 {formType === FORM_TYPE_ADD ? '신규' : '수정'} </h2>
      </div>
      {/* 입력영역 */}
      <div className="editbox">
        <div className="form-table line">
          <div className="form-cell wid50">
            <div className="form-group wid100">
              <AppCodeSelect
                apiUrl={`com/code-groups/CODE_GRP_148/codes`}
                applyAllSelect
                allValue=""
                allLabel="선택"
                id="ManualFormjobType"
                name="jobType"
                label="업무구분"
                labelKey="codeNameKor"
                valueKey="codeId"
                disabled={formType === FORM_TYPE_UPDATE ? true : false}
                value={jobType}
                onChange={(value) => changeInput('jobType', value)}
                errorMessage={errors.jobType}
                required
              />
            </div>
          </div>
          <div className="form-cell wid50">
            <div className="form-group wid100">
              <AppDatePicker
                label={'개정일자 '}
                id="ManualFormrevisionDt"
                name="revisionDt"
                value={revisionDt}
                disabled={formType === FORM_TYPE_UPDATE ? true : false}
                onChange={(value) => changeInput('revisionDt', value)}
                errorMessage={errors.revisionDt}
                required
              />
            </div>
          </div>
        </div>
        <hr className="line dp-n"></hr>
        <div className="form-table">
          <div className="form-cell wid100">
            <div className="form-group wid100">
              <AppTextInput
                label="메뉴얼명"
                id="ManualFormmanualName"
                name="manualName"
                value={manualName}
                onChange={(value) => changeInput('manualName', value)}
                errorMessage={errors.manualName}
                required
              />
            </div>
          </div>
        </div>
        <hr className="line"></hr>
        <div className="form-table line">
          <div className="form-cell wid50">
            <div className="form-group wid100">
              <AppCodeSelect
                apiUrl={`com/code-groups/CODE_GRP_147/codes`}
                applyAllSelect
                allValue=""
                allLabel="선택"
                id="ManualFormlanguageType"
                name="languageType"
                label="언어구분"
                labelKey="codeNameKor"
                valueKey="codeId"
                value={languageType}
                onChange={(value) => changeInput('languageType', value)}
                errorMessage={errors.jobType}
                required
              />
            </div>
          </div>
          <div className="form-cell wid50">
            <div className="form-group wid100">
              <AppCodeSelect
                apiUrl={`com/code-groups/CODE_GRP_146/codes`}
                applyAllSelect
                allValue=""
                allLabel="선택"
                id="useSafetyBoardFormStoreuseYn"
                name="useYn"
                label="사용여부"
                labelKey="codeNameKor"
                valueKey="codeId"
                value={useYn}
                onChange={(value) => changeInput('useYn', value)}
                errorMessage={errors.useYn}
                required
              />
            </div>
          </div>
        </div>
        <hr className="line dp-n"></hr>
        <div className="form-table">
          <div className="form-cell wid50">
            <div className="form-group wid100">
              <AppTextArea
                id="ManualFormnotes"
                name="notes"
                label="비고"
                value={notes}
                onChange={(value) => changeInput('notes', value)}
                errorMessage={errors.notes}
              />
            </div>
          </div>
        </div>

        <hr className="line"></hr>
        {/* 파일첨부영역 : drag */}
        <div className="form-table">
          <div className="form-cell wid50">
            <div className="form-group wid100">
              {/* 파일첨부영역 : drag */}
              <AppFileAttach
                label="원문첨부파일"
                fileGroupSeq={originalFileGroupSeq}
                workScope={'A'}
                updateFileGroupSeq={(newFileGroupSeq) => {
                  changeInput('originalFileGroupSeq', newFileGroupSeq);
                }}
                maxCount={1}
              />
            </div>
          </div>
        </div>
        <hr className="line"></hr>
        {/* 파일첨부영역 : drag */}
        <div className="form-table">
          <div className="form-cell wid50">
            <div className="form-group wid100">
              <AppFileAttach
                label="신구대조표 첨부파일"
                fileGroupSeq={newOldFileGroupSeq}
                workScope={'A'}
                updateFileGroupSeq={(newFileGroupSeq) => {
                  changeInput('newOldFileGroupSeq', newFileGroupSeq);
                }}
                maxCount={1}
              />
            </div>
          </div>
        </div>
        <hr className="line"></hr>
      </div>
      {/*//입력영역*/}
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
export default AdminSafetyManualEdit;
