import Modal from 'react-modal';
import AppFileAttach from '../common/AppFileAttach';

function CommonFileAttachModal(props) {
  const { isOpen, closeModal, changeFileGroupSeq, fileGroupSeq } = props;
  return (
    <Modal
      shouldCloseOnOverlayClick={false}
      isOpen={isOpen}
      ariaHideApp={false}
      overlayClassName={'alert-modal-overlay'}
      className={'list-common-modal-content'}
      onRequestClose={() => {
        closeModal();
      }}
    >
      <div className="popup-container">
        <h3 className="pop_title">첨부파일</h3>
        <div className="pop_cont">
          <div className="editbox">
            <div className="form-table">
              <div className="form-cell wid50">
                <div className="form-group wid100">
                  <AppFileAttach
                    label="첨부파일"
                    fileGroupSeq={fileGroupSeq}
                    workScope={'A'}
                    onlyImageUpload={false}
                    updateFileGroupSeq={(newFileGroupSeq) => {
                      changeFileGroupSeq(newFileGroupSeq);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="pop_btns">
        <button className="btn_text text_color_neutral-10 btn_confirm" onClick={closeModal}>
          저장
        </button>
      </div>
      <span className="pop_close" onClick={closeModal}>
        X
      </span>
    </Modal>
  );
}

export default CommonFileAttachModal;
