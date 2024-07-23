import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useSysMessageFormStore from '@/stores/admin/useSysMessageFormStore';

function MessageForm() {
  const {
    msgKey,
    msgKor,
    msgEng,
    msgChn,
    msgJpn,
    msgEtc,
    errors,
    changeInput,
    getDetail,
    save,
    remove,
    cancel,
    clear,
  } = useSysMessageFormStore();

  const { detailId } = useParams();

  useEffect(() => {
    if (detailId !== 'add') {
      getDetail(detailId);
    }
    return clear();
  }, []);

  return (
    <>
      <div className="conts-title">
        <h2>메시지 등록</h2>
      </div>
      <div className="detail-form">
        <ul className="detail-list">
          <li className="list">
            <label className="f-label">
              메시지코드 <span className="required">*</span>
            </label>
            <div className="cont">
              <div className="form-table">
                <div className="form-cell wid100">
                  <span className="form-group wid100 mr5">
                    <input
                      type="text"
                      className="form-tag"
                      placeholder=""
                      name="msgKey"
                      id="msgKey"
                      value={msgKey}
                      onChange={(event) => changeInput('msgKey', event.target.value)}
                    />
                    {errors.msgKey ? <span className="errorText">{errors.msgKey}</span> : null}
                  </span>
                </div>
              </div>
            </div>
          </li>
          <li className="list">
            <label className="f-label">
              한국어(KOR) <span className="required">*</span>
            </label>
            <div className="cont">
              <div className="form-table">
                <div className="form-cell wid100">
                  <span className="form-group wid100 mr5">
                    <input
                      type="text"
                      className="form-tag"
                      name="msgKor"
                      id="msgKor"
                      value={msgKor}
                      onChange={(event) => changeInput('msgKor', event.target.value)}
                      placeholder=""
                    />
                    {errors.msgKor ? <span className="errorText">{errors.msgKor}</span> : null}
                  </span>
                </div>
              </div>
            </div>
          </li>
          <li className="list">
            <label className="f-label">영어(ENG)</label>
            <div className="cont">
              <div className="form-table">
                <div className="form-cell wid100">
                  <span className="form-group wid100 mr5">
                    <input
                      type="text"
                      className="form-tag"
                      name="msgEng"
                      id="msgEng"
                      value={msgEng}
                      onChange={(event) => changeInput('msgEng', event.target.value)}
                      placeholder=""
                    />
                    {errors.msgEng ? <span className="errorText">{errors.msgEng}</span> : null}
                  </span>
                </div>
              </div>
            </div>
          </li>
          <li className="list">
            <label className="f-label">중국어(CHN)</label>
            <div className="cont">
              <div className="form-table">
                <div className="form-cell wid100">
                  <span className="form-group wid100 mr5">
                    <input
                      type="text"
                      className="form-tag"
                      name="msgChn"
                      id="msgChn"
                      value={msgChn}
                      onChange={(event) => changeInput('msgChn', event.target.value)}
                      placeholder=""
                    />
                    {errors.msgChn ? <span className="errorText">{errors.msgChn}</span> : null}
                  </span>
                </div>
              </div>
            </div>
          </li>
          <li className="list">
            <label className="f-label">일어(JPN)</label>
            <div className="cont">
              <div className="form-table">
                <div className="form-cell wid100">
                  <span className="form-group wid100 mr5">
                    <input
                      type="text"
                      className="form-tag"
                      name="msgJpn"
                      id="msgJpn"
                      value={msgJpn}
                      onChange={(event) => changeInput('msgJpn', event.target.value)}
                      placeholder=""
                    />
                    {errors.msgJpn ? <span className="errorText">{errors.msgJpn}</span> : null}
                  </span>
                </div>
              </div>
            </div>
          </li>
          <li className="list">
            <label className="f-label">기타</label>
            <div className="cont">
              <div className="form-table">
                <div className="form-cell wid100">
                  <span className="form-group wid100 mr5">
                    <input
                      type="text"
                      className="form-tag"
                      name="msgEtc"
                      id="msgEtc"
                      value={msgEtc}
                      onChange={(event) => changeInput('msgEtc', event.target.value)}
                      placeholder=""
                    />
                    {errors.msgEtc ? <span className="errorText">{errors.msgEtc}</span> : null}
                  </span>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div className="contents-btns">
        <button className="btn_text text_color_neutral-10 btn_confirm" onClick={save}>
          저장
        </button>
        <button className="btn_text text_color_darkblue-100 btn_close" onClick={remove}>
          삭제
        </button>
        <button className="btn_text text_color_darkblue-100 btn_close" onClick={cancel}>
          취소
        </button>
      </div>
    </>
  );
}
export default MessageForm;
