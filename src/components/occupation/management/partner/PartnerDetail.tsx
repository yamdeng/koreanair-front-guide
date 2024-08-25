import { useEffect } from 'react';
import AppNavigation from '@/components/common/AppNavigation';
import { useParams } from 'react-router-dom';
//import { Viewer } from '@toast-ui/react-editor';
//import AppFileAttach from '@/components/common/AppFileAttach';

/* TODO : store 경로를 변경해주세요. */
import useOcuPartnerInfoFormStore from '@/stores/occupation/management/useOcuPartnerInfoFormStore';

/* TODO : 컴포넌트 이름을 확인해주세요 */
function OcuPartnerInfoDetail() {
  /* formStore state input 변수 */
  const { detailInfo, getDetail, cancel, goFormPage, clear } = useOcuPartnerInfoFormStore();
  const { prtnrId, prtnrNm, bizNo, rprsn, bizIndst, bizType, regDttm, regUserId, updDttm, updUserId } = detailInfo;

  const { detailId } = useParams();

  useEffect(() => {
    getDetail(detailId);
    return clear;
  }, []);

  return (
    <>
      <AppNavigation />
      <div className="conts-title">
        <h2>협력업체 상세</h2>
      </div>
      <div className="eidtbox">
        <div className="form-table">
          <div className="form-cell wid100">
            <div className="form-group wid100">
              <div className="box-view-list">
                <ul className="view-list">
                  <li className="accumlate-list">
                    <label className="t-label">협력업체_ID</label>
                    <span className="text-desc-type1">{prtnrId}</span>
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
                    <label className="t-label">협력업체_명</label>
                    <span className="text-desc-type1">{prtnrNm}</span>
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
                    <label className="t-label">사업자_번호</label>
                    <span className="text-desc-type1">{bizNo}</span>
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
                    <label className="t-label">대표자</label>
                    <span className="text-desc-type1">{rprsn}</span>
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
                    <label className="t-label">업태</label>
                    <span className="text-desc-type1">{bizIndst}</span>
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
                    <label className="t-label">업종</label>
                    <span className="text-desc-type1">{bizType}</span>
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
                    <label className="t-label">등록_일시</label>
                    <span className="text-desc-type1">{regDttm}</span>
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
                    <label className="t-label">등록자_ID</label>
                    <span className="text-desc-type1">{regUserId}</span>
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
                    <label className="t-label">수정_일시</label>
                    <span className="text-desc-type1">{updDttm}</span>
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
                    <label className="t-label">수정자_ID</label>
                    <span className="text-desc-type1">{updUserId}</span>
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
        <button className="btn_text text_color_darkblue-100 btn_close" onClick={goFormPage}>
          수정
        </button>
      </div>
    </>
  );
}
export default OcuPartnerInfoDetail;
