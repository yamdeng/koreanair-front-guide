import { useEffect } from 'react';
import AppNavigation from '@/components/common/AppNavigation';
import { useParams } from 'react-router-dom';
import Code from '@/config/Code';
import { createFormSliceYup, formBaseState } from '@/stores/slice/formSlice';
import { create } from 'zustand';

/* TODO : store 경로를 변경해주세요. */
// import HazardTaxonomyDetailStore from '@/stores/guide/useKeHazardLv3FormStore';

/* form 초기화 */
const initFormData = {
  ...formBaseState,

  formApiPath: 'avn/admin/criteria/taxonomies',
  baseRoutePath: '/aviation/hazard-manage/taxonomy',
  formName: 'HazardTaxonomyDetailStore',
  formValue: {
    hazardLv1Id: '',
    hazardLv2Id: '',
    hazardLv3Id: '',
    lvText1: '',
    lvText2: '',
    lvText3: '',
    hazardDetail: '',
    sources: '',
    potentialConsequence: '',
    useYn: '',
    notes: '',
    viewOrder: '',
  },
};

/* zustand store 생성 */
const HazardTaxonomyDetailStore = create<any>((set, get) => ({
  ...createFormSliceYup(set, get),

  ...initFormData,
}));

/* TODO : 컴포넌트 이름을 확인해주세요 */
function TaxonomyDetail() {
  /* formStore state input 변수 */
  const { detailInfo, getDetail, formType, cancel, goFormPage, clear } = HazardTaxonomyDetailStore();
  const {
    // hazardLv1Id,
    // hazardLv2Id,
    // hazardLv3Id,
    lvText1,
    lvText2,
    lvText3,
    hazardDetail,
    sources,
    potentialConsequence,
    useYn,
    notes,
    viewOrder,
  } = detailInfo;
  const { detailId } = useParams();

  useEffect(() => {
    getDetail(detailId);
    return clear;
  }, []);

  return (
    <>
      <AppNavigation />
      <div className="conts-title">
        <h2>Taxonomy 상세</h2>
      </div>
      <div className="eidtbox">
        <div className="form-table">
          <div className="form-cell wid100">
            <div className="form-group wid100">
              <div className="box-view-list">
                <ul className="view-list">
                  <li className="accumlate-list">
                    <label className="t-label">Level 1</label>
                    <span className="text-desc-type1">{lvText1}</span>
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
                    <label className="t-label">Level 2</label>
                    <span className="text-desc-type1">{lvText2}</span>
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
                    <label className="t-label">Level 3</label>
                    <span className="text-desc-type1">{lvText3}</span>
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
                    <label className="t-label">위해요인 내용</label>
                    <span className="text-desc-type1">{hazardDetail}</span>
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
                    <label className="t-label">출처</label>
                    <span className="text-desc-type1">{sources}</span>
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
                    <label className="t-label">잠재결과</label>
                    <span className="text-desc-type1">{potentialConsequence}</span>
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
                    <span className="text-desc-type1">{Code.getCodeLabelByValue('useYn', useYn)}</span>
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
                    <label className="t-label">비고</label>
                    <span className="text-desc-type1">{notes}</span>
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
                    <label className="t-label">정렬순서</label>
                    <span className="text-desc-type1">{viewOrder}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <hr className="line"></hr>
      </div>
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
export default TaxonomyDetail;
