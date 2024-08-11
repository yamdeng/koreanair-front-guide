import Modal from 'react-modal';

/*

    alert 공통 모달 : ModalType.ALERT_MODAL

    props 설명
    {
      title(option) : 모달 타이틀
      body : 모달 body(html string)
      okLabel(option) : 버튼 라벨명(기본값은 '확인')
      ok(option) : [확인] 버튼 핸들러 함수(기본은 모달 닫히게끔)
    }

*/
function AlertModal(props) {
  const { isOpen, closeModal } = props;
  return (
    <Modal
      shouldCloseOnOverlayClick={false}
      isOpen={isOpen}
      ariaHideApp={false}
      overlayClassName={'alert-modal-overlay'}
      className={'alert-modal-content'}
      onRequestClose={() => {
        closeModal();
      }}
    >
      <div className="popup-container">
        <h3 className="pop_title">제목</h3>
        <p className="pop_cont" dangerouslySetInnerHTML={{ __html: '' }} />
        <div className="pop_btns">
          <button className="btn_text btn_green" onClick={closeModal}>
            확인
          </button>
        </div>
        <span className="pop_close" onClick={closeModal}>
          <i className="fas fa-times"></i>
        </span>
      </div>
    </Modal>
  );
}

export default AlertModal;
