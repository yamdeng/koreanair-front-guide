import AppCodeSelect from '@/components/common/AppCodeSelect';
import AppTextArea from '@/components/common/AppTextArea';
import AppTextInput from '@/components/common/AppTextInput';

import { FORM_TYPE_ADD, FORM_TYPE_UPDATE } from '@/config/CommonConstant';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

//정의된 코드 사용 시 사용

import { createFormSliceYup, formBaseState } from '@/stores/slice/formSlice';
import * as yup from 'yup';
import { create } from 'zustand';
import AppFileAttach from '@/components/common/AppFileAttach';
import AppNavigation from '@/components/common/AppNavigation';

/* yup validation */
const yupFormSchema = yup.object({
  policyType: yup.string().required('정책구분은 필수 입력 항목입니다.'),
  titleKo: yup.string().required('제목은 필수 입력 항목입니다.'),
  content: yup.string(),
  useYn: yup.string().required('사용여부는 필수 입력 항목입니다.'),
  fileGroupSeq: yup.number().nullable(),
});

/* form 초기화 */
const initFormData = {
  ...formBaseState,

  formApiPath: 'avn/admin/board/safety-policis',
  baseRoutePath: '/aviation/board-manage/safety-policy',
  formName: 'useSafetyBoardFormStore',
  formValue: {
    policyType: '',
    titleKo: '',
    content: '',
    useYn: '',
    fileGroupSeq: null,
  },
};

/* zustand store 생성 */
const useSafetyBoardFormStore = create<any>((set, get) => ({
  ...createFormSliceYup(set, get),

  ...initFormData,

  yupFormSchema: yupFormSchema,

  clear: () => {
    set({
      formValue: {
        boardId: '',
        policyType: '',
        titleKo: '',
        content: '',
        useYn: '',
        fileGroupSeq: null,
      },
      formType: FORM_TYPE_ADD,
    });
  },
}));

function SafetyEdit() {
  /* formStore state input 변수 */
  const { errors, changeInput, getDetail, formType, formValue, save, remove, cancel, clear } =
    useSafetyBoardFormStore();

  // input value 분해할당
  const { policyType, titleKo, content, useYn, fileGroupSeq } = formValue;

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
      <div className="conts-title">
        <h2>안전정책 {formType === FORM_TYPE_ADD ? '신규' : '수정'} </h2>
      </div>
      {/* 입력영역 */}
      <div className="editbox">
        <div className="form-table">
          <div className="form-cell wid50">
            <div className="form-group wid100">
              <AppCodeSelect
                apiUrl={`com/code-groups/CODE_GRP_144/codes`}
                applyAllSelect
                allValue=""
                allLabel="선택"
                id="useSafetyBoardFormStorepolicyType"
                name="policyType"
                label="정책구분"
                labelKey="codeNameKor"
                valueKey="codeId"
                disabled={formType === FORM_TYPE_UPDATE ? true : false}
                value={policyType}
                onChange={(value) => changeInput('policyType', value)}
                errorMessage={errors.policyType}
                required
              />
            </div>
          </div>
        </div>
        <hr className="line"></hr>
        <div className="form-table">
          <div className="form-cell wid100">
            <div className="form-group wid100">
              <AppTextInput
                id="useSafetyBoardFormStoretitleKo"
                name="titleKo"
                label="제목"
                value={titleKo}
                onChange={(value) => changeInput('titleKo', value)}
                errorMessage={errors.titleKo}
                required
              />
            </div>
          </div>
        </div>
        <hr className="line"></hr>
        <div className="form-table">
          <div className="form-cell wid50">
            <div className="form-group wid100">
              <AppTextArea
                id="useSafetyBoardFormStorecontent"
                name="content"
                label="내용"
                value={content}
                onChange={(value) => changeInput('content', value)}
                errorMessage={errors.content}
              />
            </div>
          </div>
        </div>
        <hr className="line"></hr>
        <div className="form-table">
          <div className="form-cell wid100">
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
        <hr className="line"></hr>
        {/* 파일첨부영역 : drag */}
        <div className="form-table">
          <div className="form-cell wid50">
            <div className="form-group wid100">
              <AppFileAttach
                label="파일첨부"
                fileGroupSeq={fileGroupSeq}
                workScope={'A'}
                onlyImageUpload={true}
                updateFileGroupSeq={(newFileGroupSeq) => {
                  changeInput('fileGroupSeq', newFileGroupSeq);
                }}
                maxCount={1}
              />
              <span style={{ color: 'red' }}>* 1건의 이미지만 업로드 가능합니다.</span>
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
          style={{ display: formType === FORM_TYPE_UPDATE ? '' : 'none' }}
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
export default SafetyEdit;
