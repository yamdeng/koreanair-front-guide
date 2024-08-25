import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FORM_TYPE_ADD, FORM_TYPE_UPDATE } from '@/config/CommonConstant';
import AppTextInput from '@/components/common/AppTextInput';
//import AppTextArea from '@/components/common/AppTextArea';
import AppCodeSelect from '@/components/common/AppCodeSelect';
import AppNavigation from '@/components/common/AppNavigation';

/* store  */
import { create } from 'zustand';
import { formBaseState, createFormSliceYup } from '@/stores/slice/formSlice';
import * as yup from 'yup';

// form-store
/* yup validation */
const yupFormSchema = yup.object({
  reportType: yup.string().required('리포트 구분은 필수 값 입니다.'),
  nameKo: yup.string().required('잠재적결과(KOR)은 필수 값 입니다.'),
  nameEn: yup.string().required('잠재적결과(ENG)은 필수 값 입니다.'),
  useYn: yup.string().required('사용여부는 필수 값 입니다.'),
  notes: yup.string(),
});

/* TODO : form 초기값 상세 셋팅 */
/* formValue 초기값 */
const initFormValue = {
  reportType: '',
  nameKo: '',
  nameEn: '',
  useYn: '',
  notes: '',
};

/* form 초기화 */
const initFormData = {
  ...formBaseState,

  formApiPath: 'avn/admin/criteria/consequences',
  baseRoutePath: '/aviation/hazard-manage/potential-consequence',
  formName: 'useKeConsequenceFormStore',
  formValue: {
    ...initFormValue,
  },
};

/* zustand store 생성 */
const useKeConsequenceFormStore = create<any>((set, get) => ({
  ...createFormSliceYup(set, get),

  ...initFormData,

  yupFormSchema: yupFormSchema,

  clear: () => {
    set({ ...formBaseState, formValue: { ...initFormValue } });
  },
}));

// form-view
function PotentialConEdit() {
  /* formStore state input 변수 */
  const { errors, changeInput, getDetail, formType, formValue, save, remove, cancel, clear } =
    useKeConsequenceFormStore();

  const { reportType, nameKo, nameEn, useYn, notes } = formValue;

  const { detailId } = useParams();

  useEffect(() => {
    if (detailId && detailId !== 'add') {
      getDetail(detailId);
    }
    return clear;
  }, []);

  return (
    <>
      {/*경로 */}
      <AppNavigation />
      <div className="conts-title">
        <h2>Potential Consequence {formType === FORM_TYPE_ADD ? '신규' : '수정'} </h2>
      </div>
      {/* 입력영역 */}
      {/* 입력영역 */}
      <div className="editbox">
        <div className="form-table">
          <div className="form-cell wid50">
            <div className="form-group wid100">
              <AppCodeSelect
                apiUrl={`com/code-groups/CODE_GRP_145/codes`}
                applyAllSelect
                allValue=""
                allLabel="선택"
                id="ConsequenceFormreportType"
                name="reportType"
                label="리포트 구분"
                labelKey="codeNameKor"
                valueKey="codeId"
                disabled={formType === FORM_TYPE_UPDATE ? true : false}
                value={reportType}
                onChange={(value) => changeInput('reportType', value)}
                errorMessage={errors.reportType}
                required
              />
            </div>
          </div>
        </div>
        <hr className="line"></hr>

        <div className="form-table line">
          <div className="form-cell wid50">
            <div className="form-group wid100">
              <AppTextInput
                id="useKeConsequenceFormStorenameKo"
                name="nameKo"
                label="잠재적결과 국문명"
                value={nameKo}
                onChange={(value) => changeInput('nameKo', value)}
                errorMessage={errors.nameKo}
                required
              />
            </div>
          </div>
          <div className="form-cell wid50">
            <div className="form-group wid100">
              <AppTextInput
                id="useKeConsequenceFormStorenameEn"
                name="nameEn"
                label="잠재적결과 영문명"
                value={nameEn}
                onChange={(value) => changeInput('nameEn', value)}
                errorMessage={errors.nameEn}
                required
              />
            </div>
          </div>
        </div>
        <hr className="line dp-n"></hr>

        <div className="form-table line">
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
          <div className="form-cell wid100">
            <div className="form-group wid100">
              <AppTextInput
                id="useKeConsequenceFormStorenotes"
                name="notes"
                label="비고"
                value={notes}
                onChange={(value) => changeInput('notes', value)}
                errorMessage={errors.notes}
              />
            </div>
          </div>
        </div>
        <hr className="line dp-n"></hr>
      </div>
      {/* 입력영역 */}

      {/* 하단 버튼 영역 */}
      <div className="contents-btns">
        <button className="btn_text text_color_neutral-10 btn_confirm" onClick={save}>
          저장
        </button>
        <button
          className="btn_text text_color_darkblue-100 btn_close"
          onClick={remove}
          style={{ display: formType !== 'add' ? '' : 'none' }}
          // style={{ display: formType === FORM_TYPE_UPDATE ? '' : 'none' }}
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

export default PotentialConEdit;
