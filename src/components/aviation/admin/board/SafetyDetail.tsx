import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { create } from 'zustand';
import { formBaseState, createFormSliceYup } from '@/stores/slice/formSlice';
import AppFileAttach from '@/components/common/AppFileAttach';
import CodeService from '@/services/CodeService';
import AppNavigation from '@/components/common/AppNavigation';

/* form 초기화 */
const initFormData = {
  ...formBaseState,

  formApiPath: 'avn/admin/board/safety-policis',
  baseRoutePath: '/aviation/board-manage/safety-policy',
};

/* zustand store 생성 */
const useSafetyBoardDetailStore = create<any>((set, get) => ({
  ...createFormSliceYup(set, get),

  ...initFormData,
}));

/* TODO : 컴포넌트 이름을 확인해주세요 */
function SafetyDetail() {
  /* formStore state input 변수 */
  const { detailInfo, getDetail, formType, cancel, goFormPage, clear } = useSafetyBoardDetailStore();
  const { policyType, titleKo, content, useYn, fileGroupSeq } = detailInfo;
  const { detailId } = useParams();

  useEffect(() => {
    getDetail(detailId);
    return clear;
  }, []);

  return (
    <>
      <AppNavigation />
      <div className="conts-title">
        <h2>안전정책 상세</h2>
      </div>
      {/*상세페이지*/}
      <div className="editbox">
        <div className="form-table">
          <div className="form-cell wid100">
            <div className="form-group wid100">
              <div className="box-view-list">
                <ul className="view-list">
                  <li className="accumlate-list">
                    <label className="t-label">정책구분</label>
                    <span className="text-desc-type1">
                      {CodeService.getCodeLabelByValue('CODE_GRP_144', policyType)}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <hr className="line"></hr>
        <div className="form-table">
          <div className="form-cell wid100">
            <div className="form-group wid100">
              <div className="box-view-list">
                <ul className="view-list">
                  <li className="accumlate-list">
                    <label className="t-label">제목</label>
                    <span className="text-desc-type1">{titleKo}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <hr className="line"></hr>
        <div className="form-table">
          <div className="form-cell wid100">
            <div className="form-group wid100">
              <div className="box-view-list">
                <ul className="view-list">
                  <li className="accumlate-list">
                    <label className="t-label">내용</label>
                    <span className="text-desc-type1">{content}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <hr className="line"></hr>
        <div className="form-table">
          <div className="form-cell wid100">
            <div className="form-group wid100">
              <div className="box-view-list">
                <ul className="view-list">
                  <li className="accumlate-list">
                    <label className="t-label">사용여부</label>
                    <span className="text-desc-type1">{CodeService.getCodeLabelByValue('CODE_GRP_146', useYn)}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <hr className="line"></hr>
        <div className="form-table">
          <div className="form-cell wid100">
            <div className="form-group wid100">
              <div className="box-view-list">
                <ul className="view-list">
                  <li className="accumlate-list">
                    <label className="t-label">첨부파일</label>
                    <span className="text-desc-type1">
                      <AppFileAttach mode="view" onlyImageUpload={true} fileGroupSeq={fileGroupSeq} disabled={true} />
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <hr className="line"></hr>
        <hr className="line dp-n"></hr>
      </div>
      {/*//상세페이지*/}

      {/* 하단 버튼 영역 */}
      <div className="contents-btns">
        <button className="btn_text text_color_neutral-10 btn_confirm" onClick={cancel}>
          목록으로
        </button>
        <button
          className="btn_text text_color_darkblue-100 btn_close"
          onClick={goFormPage}
          style={{ display: formType !== 'add' ? '' : 'none' }}
        >
          수정
        </button>
      </div>
    </>
  );
}
export default SafetyDetail;
