import { useCallback } from 'react';
import ReactUtil from '@/utils/ReactUtil';
import Modal from 'react-modal';
import { LABEL_MODAL_OK } from '@/config/CommonConstant';

function AlertModal(props) {
  const { isOpen, closeModal, ok, title, body, okLabel } = props;

  const okHandle = useCallback(() => {
    if (ok) {
      ok();
    } else {
      closeModal();
    }
  }, [ok]);

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
        <h3 className="pop_title" style={{ display: title ? '' : 'none' }}>
          {title}
        </h3>
        <p className="pop_cont" dangerouslySetInnerHTML={{ __html: ReactUtil.convertEnterStringToBrTag(body) }} />
        <div className="pop_btns">
          <button className="btn_text text_color_neutral-10 btn_confirm" onClick={okHandle}>
            {okLabel || LABEL_MODAL_OK}
          </button>
        </div>
        <span className="pop_close" onClick={closeModal}>
          X
        </span>
      </div>
    </Modal>
  );
}

export default AlertModal;
