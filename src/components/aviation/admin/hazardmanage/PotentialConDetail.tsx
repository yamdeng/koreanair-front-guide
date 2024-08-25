import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CodeSerivce from '@/services/CodeService';
import AppNavigation from '@/components/common/AppNavigation';

/* store  */
import { create } from 'zustand';
import { formBaseState, createFormSliceYup } from '@/stores/slice/formSlice';
import CodeService from '@/services/CodeService';

/* form 초기화 */
const initFormData = {
  ...formBaseState,

  formApiPath: 'avn/admin/criteria/consequences',
  baseRoutePath: '/aviation/hazard-manage/potential-consequence',
  // formName: 'KeConsequenceDetailStore',
  // formValue: {
  //   reportType: '',
  //   nameKo: '',
  //   nameEn: '',
  //   useYn: '',
  //   notes: '',
  // },
};

/* zustand store 생성 */
const KeConsequenceDetailStore = create<any>((set, get) => ({
  ...createFormSliceYup(set, get),

  ...initFormData,

  clear: () => {
    set({ ...formBaseState });
  },
}));

/* TODO : 컴포넌트 이름을 확인해주세요 */
function PotentialConDetail() {
  /* formStore state input 변수 */
  const { detailInfo, getDetail, formType, cancel, goFormPage, clear } = KeConsequenceDetailStore();
  const { reportType, nameKo, nameEn, useYn, notes } = detailInfo;
  const { detailId } = useParams();

  useEffect(() => {
    getDetail(detailId);
    return clear;
  }, []);

  return (
    <>
      <AppNavigation />
      <div className="conts-title">
        <h2>Potential Consequence 상세</h2>
      </div>
      <div className="boxForm">
        <div className="form-table">
          <div className="form-cell wid50">
            <div className="form-group wid100">
              <div className="box-view-list">
                <ul className="view-list">
                  <li className="accumlate-list">
                    <label className="t-label">리포트 구분</label>
                    <span className="text-desc">{CodeService.getCodeLabelByValue('CODE_GRP_145', reportType)}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="form-cell wid50">
            <div className="form-group wid100">
              <div className="box-view-list">
                <ul className="view-list">
                  <li className="accumlate-list">
                    <label className="t-label">잠재적결과(KOR)</label>
                    <span className="text-desc">{nameKo}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <hr className="line"></hr>

        <div className="form-table">
          <div className="form-cell wid50">
            <div className="form-group wid100">
              <div className="box-view-list">
                <ul className="view-list">
                  <li className="accumlate-list">
                    <label className="t-label">잠재적결과(ENG)</label>
                    <span className="text-desc">{nameEn}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="form-cell wid50">
            <div className="form-group wid100">
              <div className="box-view-list">
                <ul className="view-list">
                  <li className="accumlate-list">
                    <label className="t-label">사용여부</label>
                    <span className="text-desc">{CodeSerivce.getCodeLabelByValue('CODE_GRP_146', useYn)}</span>
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
                    <span className="text-desc">{notes}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <hr className="line dp-n"></hr>
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
export default PotentialConDetail;
