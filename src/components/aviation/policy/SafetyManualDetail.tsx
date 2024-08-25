import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CodeSerivce from '@/services/CodeService';
import AppFileAttach from '@/components/common/AppFileAttach';
import AppNavigation from '@/components/common/AppNavigation';

/* store  */
import { create } from 'zustand';
import { formBaseState, createFormSliceYup } from '@/stores/slice/formSlice';

/* form 초기화 */
const initFormData = {
  ...formBaseState,

  formApiPath: 'avn/policy/manuals',
  baseRoutePath: '/aviation/policy/safety-manual',
};

/* zustand store 생성 */
const useManualFormStore = create<any>((set, get) => ({
  ...createFormSliceYup(set, get),

  ...initFormData,

  clear: () => {
    set({ ...formBaseState });
  },
}));

/* TODO : 컴포넌트 이름을 확인해주세요 */
function SafetyManualDetail() {
  /* formStore state input 변수 */
  const { detailInfo, getDetail, cancel, clear } = useManualFormStore();
  const { jobType, revisionDt, manualName, languageType, notes, originalFileGroupSeq, newOldFileGroupSeq } = detailInfo;

  const { detailId } = useParams();

  useEffect(() => {
    getDetail(detailId);
    return clear;
  }, []);

  return (
    <>
      <AppNavigation />
      <div className="conts-title">
        <h2>안전메뉴얼 상세</h2>
      </div>
      {/*상세페이지*/}
      <div className="editbox">
        <div className="form-table line">
          <div className="form-cell wid100">
            <div className="form-group wid100">
              <div className="box-view-list">
                <ul className="view-list">
                  <li className="accumlate-list">
                    <label className="t-label">업무구분</label>
                    <span className="text-desc-type1">{CodeSerivce.getCodeLabelByValue('CODE_GRP_148', jobType)}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="form-cell wid100">
            <div className="form-group wid100">
              <div className="box-view-list">
                <ul className="view-list">
                  <li className="accumlate-list">
                    <label className="t-label">개정일자</label>
                    <span className="text-desc-type1">{revisionDt}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <hr className="line dp-n"></hr>
        <div className="form-table line">
          <div className="form-cell wid100">
            <div className="form-group wid100">
              <div className="box-view-list">
                <ul className="view-list">
                  <li className="accumlate-list">
                    <label className="t-label">메뉴얼명 </label>
                    <span className="text-desc-type1">{manualName}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <hr className="line dp-n"></hr>
        <div className="form-table line">
          <div className="form-cell wid100">
            <div className="form-group wid100">
              <div className="box-view-list">
                <ul className="view-list">
                  <li className="accumlate-list">
                    <label className="t-label">언어구분 </label>
                    <span className="text-desc-type1">
                      {CodeSerivce.getCodeLabelByValue('CODE_GRP_147', languageType)}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <hr className="line dp-n"></hr>
        <div className="form-table">
          <div className="form-cell wid100">
            <div className="form-group wid100">
              <div className="box-view-list">
                <ul className="view-list">
                  <li className="accumlate-list">
                    <label className="t-label">비고</label>
                    <span className="text-desc-type1">{notes}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <hr className="line"></hr>
        <div className="form-table line">
          <div className="form-cell wid100">
            <div className="form-group wid100">
              <div className="box-view-list">
                <ul className="view-list">
                  <li className="accumlate-list">
                    <label className="t-label">원문 첨부파일 </label>
                    <span className="text-desc-type1">
                      <AppFileAttach mode="view" fileGroupSeq={originalFileGroupSeq} disabled={true} />
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="form-cell wid100">
            <div className="form-group wid100">
              <div className="box-view-list">
                <ul className="view-list">
                  <li className="accumlate-list">
                    <label className="t-label">신구대조표 첨부파일</label>
                    <span className="text-desc-type1">
                      <AppFileAttach mode="view" fileGroupSeq={newOldFileGroupSeq} disabled={true} />
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <hr className="line dp-n"></hr>
      </div>
      {/*//상세페이지*/}
      {/* 하단 버튼 영역 */}
      <div className="contents-btns">
        <button className="btn_text text_color_neutral-10 btn_confirm" onClick={cancel}>
          목록으로
        </button>
      </div>
    </>
  );
}
export default SafetyManualDetail;
