import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useSysMessageFormStore from '@/stores/admin/useSysMessageFormStore';
import { FORM_TYPE_ADD } from '@/config/CommonConstant';

function MessageDetail() {
  /* formStore state input 변수 */
  const { detailInfo, getDetail, formType, cancel, goFormPage, clear } = useSysMessageFormStore();
  const { msgKey, msgKor, msgEng, msgChn, msgJpn, msgEtc } = detailInfo;

  const { detailId } = useParams();

  useEffect(() => {
    getDetail(detailId);
    return clear;
  }, []);

  return (
    <>
      <div className="conts-title">
        <h2>메시지 폼</h2>
      </div>
      <div className="boxForm">
        <div className="form-table">
          <div className="form-cell wid50">
            <div className="form-group wid100">
              <div className="box-view-list">
                <ul className="view-list">
                  <li className="accumlate-list">
                    <label className="t-label">메시지 키</label>
                    <span className="text-desc">{msgKey}</span>
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
                    <label className="t-label">설명(한국어)</label>
                    <span className="text-desc">{msgKor}</span>
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
                    <label className="t-label">설명(영어)</label>
                    <span className="text-desc">{msgEng}</span>
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
                    <label className="t-label">설명(중국어)</label>
                    <span className="text-desc">{msgChn}</span>
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
                    <label className="t-label">설명(일본어)</label>
                    <span className="text-desc">{msgJpn}</span>
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
                    <label className="t-label">설명(기타)</label>
                    <span className="text-desc">{msgEtc}</span>
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
          style={{ display: formType !== FORM_TYPE_ADD ? '' : 'none' }}
        >
          수정
        </button>
      </div>
    </>
  );
}
export default MessageDetail;
