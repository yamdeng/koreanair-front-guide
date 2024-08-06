import { create } from 'zustand';

/* zustand store 생성 */
const useModalStore = create<any>((set) => ({
  modalData: {},
  modalType: '',
  displayModal: false,

  showModal: (modalType, modalData) => {
    set({
      modalType: modalType,
      modalData: modalData || {},
      displayModal: true,
    });
  },

  hideModal: () => {
    set({
      modalType: '',
      modalData: {},
      displayModal: false,
    });
  },
}));

export default useModalStore;
