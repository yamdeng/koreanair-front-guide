import AppSelect from '@/components/common/AppSelect';
import Modal from 'react-modal';

const options = [
  { value: 'chocolate', label: 'Chocolate Chocolate Chocolate ChocolateChocolateChocolateChocolate' },
  { value: 'strawberry', label: 'StrawberryStrawberryStrawberryStrawberryStrawberryStrawberryStrawberry' },
  { value: 'vanilla', label: 'VanillaVanillaVanillaVanillaVanillaVanillaVanilla' },
];

function PSPILoadModal(props) {
  const { isOpen, closeModal, ok } = props;
  return (
    <Modal
      shouldCloseOnOverlayClick={false}
      isOpen={isOpen}
      ariaHideApp={false}
      overlayClassName={'alert-modal-overlay'}
      className={'confirm-modal-content'}
      onRequestClose={() => {
        closeModal();
      }}
    >
      <div className="popup-container">
        <h3 className="pop_title">지표 불러오기</h3>
        <div className="pop_cont">
          <div className="editbox">
            <div className="form-table">
              <div className="form-cell wid50">
                <div className="form-group wid100">
                  <AppSelect label={'대상연도'} required />
                </div>
              </div>
            </div>
            <hr className="line"></hr>
            <div className="form-table">
              <div className="form-cell wid50">
                <div className="form-group wid100">
                  <AppSelect label={'생산연도'} required />
                </div>
              </div>
            </div>
            <hr className="line"></hr>
            <div className="form-table">
              <div className="form-cell wid50">
                <div className="form-group wid100">
                  <AppSelect label={'지표구분'} required />
                </div>
              </div>
            </div>
            <hr className="line"></hr>
          </div>
        </div>

        <div className="pop_btns">
          <button className="btn_text text_color_neutral-90 btn_close" onClick={closeModal}>
            닫기
          </button>
          <button className="btn_text text_color_neutral-10 btn_confirm" onClick={closeModal}>
            저장
          </button>
        </div>
        <span className="pop_close">X</span>
      </div>
    </Modal>
  );
}

export default PSPILoadModal;
