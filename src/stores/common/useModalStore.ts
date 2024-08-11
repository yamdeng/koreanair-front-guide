import { create } from 'zustand';

/* zustand store 생성 */
const useModalStore = create<any>((set) => ({
  modalData: {},
  modalType: '',
  isOpen: false,

  showModal: (modalType, modalData) => {
    set({
      modalType: modalType,
      modalData: modalData || {},
      isOpen: true,
    });
  },

  hideModal: () => {
    set({
      modalType: '',
      modalData: {},
      isOpen: false,
    });
  },
}));

export default useModalStore;
