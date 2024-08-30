import Modal from 'react-modal';
import useModalStore from '@/stores/common/useModalStore';
import ModalType from '@/config/ModalType';
import GlobalAlertModal from '../modal/global/GlobalAlertModal';
import GlobalConfirmModal from '../modal/global/GlobalConfirmModal';

function AlertModalContainer() {
  let modalComponent = null;
  let overlayClassName = '';
  const { modalType, isOpen, modalData, hideModal } = useModalStore();

  let contentClassName = '';
  overlayClassName = 'global-alert-modal-overlay';
  contentClassName = modalType + '-content';

  switch (modalType) {
    case ModalType.ALERT_MODAL:
      modalComponent = <GlobalAlertModal modalData={modalData} />;
      break;
    case ModalType.CONFRIM_MODAL:
      modalComponent = <GlobalConfirmModal modalData={modalData} />;
      break;
    default:
      break;
  }
  return (
    <Modal
      shouldCloseOnOverlayClick={false}
      isOpen={isOpen}
      ariaHideApp={false}
      overlayClassName={overlayClassName}
      className={contentClassName}
      onRequestClose={() => {
        hideModal();
      }}
    >
      {modalComponent}
    </Modal>
  );
}

export default AlertModalContainer;
