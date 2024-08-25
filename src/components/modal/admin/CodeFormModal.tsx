import AppSelect from '@/components/common/AppSelect';
import AppTextInput from '@/components/common/AppTextInput';
import Code from '@/config/Code';
import useSysCodeFormStore from '@/stores/admin/useSysCodeFormStore';
import Modal from 'react-modal';

function CodeFormModal(props) {
  const { isOpen, closeModal, ok } = props;

  const { listUpdateIndex, formValue, errors, changeInput, validate, formType } = useSysCodeFormStore();

  const {
    codeId,
    codeNameKor,
    codeNameEng,
    codeField1,
    codeField2,
    codeField3,
    codeField4,
    codeField5,
    sortOrder,
    useYn,
    remark,
  } = formValue;

  const save = async () => {
    const isValid = await validate();
    if (isValid) {
      ok(formValue, formType, listUpdateIndex);
    }
  };

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
        <h3 className="pop_title">코드 수정</h3>
        <div className="pop_full_cont_box">
          <div className="pop_flex_group">
            <div className="pop_cont_form">
              <div className="boxForm">
                <div className="form-table">
                  <div className="form-cell wid50">
                    <div className="form-group wid100">
                      <AppTextInput
                        id="useSysCodeFormStorecodeId"
                        name="codeId"
                        label="코드ID"
                        value={codeId}
                        onChange={(value) => changeInput('codeId', value)}
                        required
                        errorMessage={errors.codeId}
                      />
                    </div>
                  </div>
                </div>
                <hr className="line"></hr>

                <div className="form-table">
                  <div className="form-cell wid50">
                    <div className="form-group wid100">
                      <AppTextInput
                        id="useSysCodeFormStorecodeNameKor"
                        name="codeNameKor"
                        label="코드명(한국어)"
                        value={codeNameKor}
                        onChange={(value) => changeInput('codeNameKor', value)}
                        required
                        errorMessage={errors.codeNameKor}
                      />
                    </div>
                  </div>
                </div>
                <hr className="line"></hr>

                <div className="form-table">
                  <div className="form-cell wid50">
                    <div className="form-group wid100">
                      <AppTextInput
                        id="useSysCodeFormStorecodeNameEng"
                        name="codeNameEng"
                        label="코드명(영어)"
                        value={codeNameEng}
                        onChange={(value) => changeInput('codeNameEng', value)}
                        errorMessage={errors.codeNameEng}
                        required
                      />
                    </div>
                  </div>
                </div>
                <hr className="line"></hr>

                <div className="form-table">
                  <div className="form-cell wid50">
                    <div className="form-group wid100">
                      <AppTextInput
                        id="useSysCodeFormStorecodeField1"
                        name="codeField1"
                        label="예비필드 1"
                        value={codeField1}
                        onChange={(value) => changeInput('codeField1', value)}
                        errorMessage={errors.codeField1}
                      />
                    </div>
                  </div>
                </div>
                <hr className="line"></hr>

                <div className="form-table">
                  <div className="form-cell wid50">
                    <div className="form-group wid100">
                      <AppTextInput
                        id="useSysCodeFormStorecodeField2"
                        name="codeField2"
                        label="예비필드 2"
                        value={codeField2}
                        onChange={(value) => changeInput('codeField2', value)}
                        errorMessage={errors.codeField2}
                      />
                    </div>
                  </div>
                </div>
                <hr className="line"></hr>

                <div className="form-table">
                  <div className="form-cell wid50">
                    <div className="form-group wid100">
                      <AppTextInput
                        id="useSysCodeFormStorecodeField3"
                        name="codeField3"
                        label="예비필드 3"
                        value={codeField3}
                        onChange={(value) => changeInput('codeField3', value)}
                        errorMessage={errors.codeField3}
                      />
                    </div>
                  </div>
                </div>
                <hr className="line"></hr>

                <div className="form-table">
                  <div className="form-cell wid50">
                    <div className="form-group wid100">
                      <AppTextInput
                        id="useSysCodeFormStorecodeField4"
                        name="codeField4"
                        label="예비필드 4"
                        value={codeField4}
                        onChange={(value) => changeInput('codeField4', value)}
                        errorMessage={errors.codeField4}
                      />
                    </div>
                  </div>
                </div>
                <hr className="line"></hr>

                <div className="form-table">
                  <div className="form-cell wid50">
                    <div className="form-group wid100">
                      <AppTextInput
                        id="useSysCodeFormStorecodeField5"
                        name="codeField5"
                        label="예비필드 5"
                        value={codeField5}
                        onChange={(value) => changeInput('codeField5', value)}
                        errorMessage={errors.codeField5}
                      />
                    </div>
                  </div>
                </div>
                <hr className="line"></hr>

                <div className="form-table">
                  <div className="form-cell wid50">
                    <div className="form-group wid100">
                      <AppTextInput
                        inputType="number"
                        id="useSysCodeFormStoresortOrder"
                        name="sortOrder"
                        label="정렬순서"
                        value={sortOrder}
                        onChange={(value) => changeInput('sortOrder', value)}
                        errorMessage={errors.sortOrder}
                        required
                      />
                    </div>
                  </div>
                </div>
                <hr className="line"></hr>

                <div className="form-table">
                  <div className="form-cell wid50">
                    <div className="form-group wid100">
                      <AppSelect
                        id="useSysCodeFormStoreuseYn"
                        name="useYn"
                        label="사용여부"
                        value={useYn}
                        options={Code.useYn}
                        onChange={(value) => changeInput('useYn', value)}
                        errorMessage={errors.useYn}
                        required
                      />
                    </div>
                  </div>
                </div>
                <hr className="line"></hr>

                <div className="form-table">
                  <div className="form-cell wid50">
                    <div className="form-group wid100">
                      <AppTextInput
                        id="useSysCodeFormStoreremark"
                        name="remark"
                        label="비고"
                        value={remark}
                        onChange={(value) => changeInput('remark', value)}
                        errorMessage={errors.remark}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pop_btns">
          <button className="btn_text text_color_neutral-90 btn_close" onClick={closeModal}>
            취소
          </button>
          <button className="btn_text text_color_neutral-10 btn_confirm" onClick={save}>
            저장
          </button>
        </div>
        <span className="pop_close" onClick={closeModal}>
          X
        </span>
      </div>
    </Modal>
  );
}

export default CodeFormModal;
