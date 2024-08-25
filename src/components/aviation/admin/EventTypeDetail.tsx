import AppNavigation from '@/components/common/AppNavigation';
import ApiService from '@/services/ApiService';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

/* store */

/* TODO : 컴포넌트 이름을 확인해주세요 */
function EventTypeDetail() {
  const navigate = useNavigate();
  const [detailInfo, setDetailInfo] = useState<any>({});

  const { eventId, reportType, eventName, useYn, notes, viewOrder, regUserId, regDttm, updUserId, updDttm } =
    detailInfo;

  const { detailId } = useParams();

  const cancel = () => {
    navigate(-1);
  };

  const goFormPage = () => {
    // TODO : [수정] 버튼 처리
    navigate('/aviation/eventtype-manage/add/edit');
  };

  useEffect(() => {
    // ApiService.get('TODO: detailId with api path').then((apiResult) => {
    //   const detailInfo = apiResult.data || {};
    //   setDetailInfo(detailInfo);
    // });
  }, []);

  return (
    <>
      <AppNavigation />
      <div className="conts-title">
        <h2>TODO : 헤더 타이틀</h2>
      </div>
      <div className="eidtbox">
        <div className="form-table">
          <div className="form-cell wid100">
            <div className="form-group wid100">
              <div className="box-view-list">
                <ul className="view-list">
                  <li className="accumlate-list">
                    <label className="t-label">이벤트 ID</label>
                    <span className="text-desc-type1">{eventId}</span>
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
                    <label className="t-label">Report Type, code_group = &#39;Report Type&#39;</label>
                    <span className="text-desc-type1">{reportType}</span>
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
                    <label className="t-label">이벤트명</label>
                    <span className="text-desc-type1">{eventName}</span>
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
                    <span className="text-desc-type1">{useYn}</span>
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
                    <label className="t-label">메모</label>
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
                    <label className="t-label">표시순서, -1은 표시하지 않음. 0부터 시작</label>
                    <span className="text-desc-type1">{viewOrder}</span>
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
                    <label className="t-label">등록자 사번</label>
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
                    <label className="t-label">등록일시</label>
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
                    <label className="t-label">수정자 사번</label>
                    <span className="text-desc-type1">{updUserId}</span>
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
                    <label className="t-label">수정일시</label>
                    <span className="text-desc-type1">{updDttm}</span>
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
export default EventTypeDetail;
