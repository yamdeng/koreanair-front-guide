import { useCallback } from 'react';
import useModalStore from '@/stores/common/useModalStore';
import ReactUtil from '@/utils/ReactUtil';
import { LABEL_MODAL_OK, LABEL_MODAL_CANCEL } from '@/config/CommonConstant';

function GlobalConfirmModal(props) {
  const { hideModal } = useModalStore();
  const { modalData } = props;
  const { title, body, okLabel, cancelLabel } = modalData;

  const ok = useCallback(() => {
    if (modalData.ok) {
      hideModal();
      modalData.ok();
    } else {
      hideModal();
    }
  }, [modalData]);

  const cancel = useCallback(() => {
    if (modalData.cancel) {
      hideModal();
      modalData.cancel();
    } else {
      hideModal();
    }
  }, [modalData]);

  return (
    <div className="popup-container">
      <h3 className="pop_title" style={{ display: title ? '' : 'none' }}>
        {title}
      </h3>
      <p className="pop_cont" dangerouslySetInnerHTML={{ __html: ReactUtil.convertEnterStringToBrTag(body) }} />
      <div className="pop_btns">
        <button className="btn_text text_color_neutral-90 btn_close" onClick={cancel}>
          {cancelLabel || LABEL_MODAL_CANCEL}
        </button>
        <button className="btn_text text_color_neutral-10 btn_confirm" onClick={ok}>
          {okLabel || LABEL_MODAL_OK}
        </button>
      </div>
      <span className="pop_close" onClick={hideModal}>
        X
      </span>
    </div>
  );
}

export default GlobalConfirmModal;
