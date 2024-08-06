import useModalStore from '@/stores/common/useModalStore';
import ModalType from '@/config/ModalType';

class ModalService {
  // AlertModal 모달 오픈
  alert(modalData) {
    const { showModal } = useModalStore.getState();
    showModal(ModalType.ALERT_MODAL, modalData);
  }

  // ConfirmModal 모달 오픈
  confirm(modalData) {
    const { showModal } = useModalStore.getState();
    showModal(ModalType.CONFRIM_MODAL, modalData);
  }

  // AlertModalContainer에 정의한 모달 닫기
  closeAlertModal() {
    const { hideModal } = useModalStore.getState();
    hideModal();
  }
}

export default new ModalService();
