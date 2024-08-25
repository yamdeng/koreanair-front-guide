import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import * as yup from 'yup';
import { useImmer } from 'use-immer';
import CommonUtil from '@/utils/CommonUtil';
import AppCodeSelect from '@/components/common/AppCodeSelect';
import AppTextInput from '@/components/common/AppTextInput';

const formName = 'useSysMessageFormStore';

/* yup validation */
const yupFormSchema = yup.object({
  code1: yup.string().required(),
  title: yup.string().required(),
});

/* form 초기화 */
const initFormValue = {
  code1: '',
  title: '',
};

/* TODO : 컴포넌트 이름을 확인해주세요 */
function AuditCheckListModal(props) {
  const { isOpen, closeModal, ok } = props;
  const [formValue, setFormValue] = useImmer({ ...initFormValue });
  const [errors, setErrors] = useState<any>({});

  const { code1, title } = formValue;

  const changeInput = (inputName, inputValue) => {
    setFormValue((formValue) => {
      formValue[inputName] = inputValue;
    });
  };

  const save = async () => {
    const validateResult = await CommonUtil.validateYupForm(yupFormSchema, formValue);
    const { success, firstErrorFieldKey, errors } = validateResult;
    if (success) {
      ok(formValue);
    } else {
      setErrors(errors);
      if (formName + firstErrorFieldKey) {
        document.getElementById(formName + firstErrorFieldKey).focus();
      }
    }
  };

  useEffect(() => {
    // TODO : isOpen일 경우에 상세 api 호출 할지 결정 : if(isOpen)
    if (isOpen) {
      //
    }
  }, [isOpen]);

  return (
    <>
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
          <h3 className="pop_title">TODO : 모달 타이틀</h3>
          <div className="pop_full_cont_box">
            <div className="pop_flex_group">
              <div className="pop_cont_form">
                <div className="editbox">
                  <div className="form-table">
                    <div className="form-cell wid100">
                      <div className="form-group wid100">
                        <AppCodeSelect
                          codeGrpId="CODE_GRP_301"
                          id="SysMessageFormmsgKey"
                          name="code1"
                          label="code1"
                          value={code1}
                          onChange={(value) => changeInput('code1', value)}
                          errorMessage={errors.code1}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <hr className="line"></hr>

                  <div className="form-table">
                    <div className="form-cell wid100">
                      <div className="form-group wid100">
                        <AppTextInput
                          id="SysMessageFormmsgKor"
                          name="title"
                          label="설명(한국어)"
                          value={title}
                          onChange={(value) => changeInput('title', value)}
                          errorMessage={errors.title}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <hr className="line"></hr>
                </div>
              </div>
            </div>
          </div>
          {/* 하단 버튼 영역 */}
          <div className="pop_btns">
            <button className="btn_text text_color_neutral-90 btn_close" onClick={closeModal}>
              취소
            </button>
            <button className="btn_text text_color_neutral-10 btn_confirm" onClick={save}>
              확인
            </button>
          </div>
          <span className="pop_close" onClick={closeModal}>
            X
          </span>
        </div>
      </Modal>
    </>
  );
}
export default AuditCheckListModal;
