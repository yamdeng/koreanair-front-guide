import ModalType from '@/config/ModalType';

function AlertModalContainer() {
  let modalComponent = null;
  let overlayClassName = '';
  let { modalType, displayModal, modalData } = alertModalStore;
  let contentClassName = '';
  overlayClassName = 'alert-modal-overlay';
  contentClassName = modalType + '-content';
  switch (modalType) {
    case ModalType.ALERT_MODAL:
      modalComponent = <AlertModal modalData={modalData} />;
      break;
    case ModalType.CONFRIM_MODAL:
      modalComponent = <ConfirmModal modalData={modalData} />;
      break;
    default:
      break;
  }
  return (
    <Modal
      shouldCloseOnOverlayClick={false}
      isOpen={displayModal}
      ariaHideApp={false}
      overlayClassName={overlayClassName}
      className={contentClassName}
      onRequestClose={() => {
        alertModalStore.hideModal();
      }}
    >
      {modalComponent}
    </Modal>
  );
}

export default AlertModalContainer;
