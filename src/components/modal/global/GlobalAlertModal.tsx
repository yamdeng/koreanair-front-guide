/*

    alert 공통 모달 : ModalType.ALERT_MODAL

    modalData 설명
    {
      title(option) : 모달 타이틀
      body : 모달 body(html string)
      okLabel(option) : 버튼 라벨명(기본값은 '확인')
      ok(option) : [확인] 버튼 핸들러 함수(기본은 모달 닫히게끔)
    }

    store
     -alertModalStore

*/

function GlobalAlertModal(props) {
  let { modalData } = props;
  let { title, body, okLabel } = modalData;
  body = ReactHelper.convertEnterStringToBrTag(body);
  okLabel = okLabel || Constant.LABEL_MODAL_OK;
  return (
    <div className="popup-container">
      <h3 className="pop_title">제목</h3>
      <p className="pop_cont" dangerouslySetInnerHTML={{ __html: '' }} />
      <div className="pop_btns">
        <button className="btn_text text_color_neutral-10 btn_confirm" onClick={closeModal}>
          확인
        </button>
      </div>
      <span className="pop_close" onClick={closeModal}>
        {/* <i className="fas fa-times"></i> */}X
      </span>
    </div>
  );
}

export default GlobalAlertModal;
