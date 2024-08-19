import useModalStore from '@/stores/common/useModalStore';
import ReactUtil from '@/utils/ReactUtil';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

function GlobalAlertModal(props) {
  const { hideModal } = useModalStore();
  const { modalData } = props;
  const { title, body, okLabel } = modalData;
  const { t } = useTranslation();

  const ok = useCallback(() => {
    if (modalData.ok) {
      hideModal();
      modalData.ok();
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
        <button className="btn_text text_color_neutral-10 btn_confirm" onClick={ok}>
          {okLabel || t('front.common.modal.close', '닫기')}
        </button>
      </div>
      <span className="pop_close" onClick={hideModal}>
        X
      </span>
    </div>
  );
}

export default GlobalAlertModal;
