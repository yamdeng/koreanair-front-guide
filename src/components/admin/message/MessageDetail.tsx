import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useSysMessageFormStore from '@/stores/admin/useSysMessageFormStore';

function MessageDetail() {
  const { msgKey, msgKor, msgEng, msgChn, msgJpn, msgEtc, gorFormPage, getDetail, cancel, clear } =
    useSysMessageFormStore();

  const { detailId } = useParams();

  useEffect(() => {
    getDetail(detailId);
    return clear();
  }, []);

  return (
    <>
      <div className="conts-title">
        <h2>메시지 상세</h2>
      </div>

      <div className="detail-form">
        <ul className="detail-list">
          <li className="list">
            <label className="f-label">메시지코드</label>
            <div className="cont">{msgKey}</div>
          </li>
          <li className="list">
            <label className="f-label">한국어(KOR)</label>
            <div className="cont">{msgKor}</div>
          </li>
          <li className="list">
            <label className="f-label">영어(ENG)</label>
            <div className="cont">{msgEng}</div>
          </li>
          <li className="list">
            <label className="f-label">중국어(CHN)</label>
            <div className="cont">{msgChn}</div>
          </li>
          <li className="list">
            <label className="f-label">일어(JPN)</label>
            <div className="cont">{msgJpn}</div>
          </li>
          <li className="list">
            <label className="f-label">기타</label>
            <div className="cont">{msgEtc}</div>
          </li>
        </ul>
      </div>

      <div className="contents-btns">
        <button className="btn_text text_color_darkblue-100 btn_correct" onClick={gorFormPage}>
          수정
        </button>
        <button className="btn_text text_color_neutral-10 btn_confirm" onClick={cancel}>
          목록
        </button>
      </div>
    </>
  );
}
export default MessageDetail;
