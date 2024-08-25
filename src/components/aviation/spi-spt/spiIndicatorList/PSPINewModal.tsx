import AppSelect from '@/components/common/AppSelect';
import AppTextArea from '@/components/common/AppTextArea';
import AppTextInput from '@/components/common/AppTextInput';
import { useState } from 'react';
import Modal from 'react-modal';

function PSPINewModal(props) {
  const { isOpen, closeModal } = props;
  const [inputValue, setInputValue] = useState('');
  const [expandedKeys] = useState(['0-0', '0-0-0', '0-0-0-0']);

  /*

    overlayClassName : alert-modal-overlay, middle-modal-overlay, full-modal-overlay
     : 크기에 따라 클래스 정의

    className : {커스텀}-modal-content
     모달 마다 별도의 class를 정의해서 커스텀하게 관리

  */
  /* treeData 가공 */
  const x = 3;
  const y = 2;
  const z = 1;
  const treeData = [];

  const generateData = (_level, _preKey = null, _tns = null) => {
    const preKey = _preKey || '0';
    const tns = _tns || treeData;

    const children = [];
    for (let i = 0; i < x; i++) {
      const key = `${preKey}-${i}`;
      tns.push({ title: key, key });
      if (i < y) {
        children.push(key);
      }
    }
    if (_level < 0) {
      return tns;
    }
    const level = _level - 1;
    children.forEach((key, index) => {
      tns[index].children = [];
      return generateData(level, key, tns[index].children);
    });
  };
  generateData(z);
  /* treeData 가공 end*/
  return (
    <Modal
      shouldCloseOnOverlayClick={false}
      isOpen={isOpen}
      ariaHideApp={false}
      overlayClassName={'alert-modal-overlay'}
      className={'alert-modal-content'}
      onRequestClose={() => {
        closeModal();
      }}
    >
      <div className="popup-container">
        <h3 className="pop_title">지표 신규</h3>
        <div className="pop_full_cont_box">
          <div className="pop_flex_group">
            <div className="pop_cont_form">
              <div className="editbox">
                <div className="form-table">
                  <div className="form-cell wid100">
                    <div className="form-group wid100">
                      <AppTextInput label="연도" placeholder="2024" required disabled />
                    </div>
                  </div>
                </div>
                <hr className="line"></hr>
                <div className="form-table">
                  <div className="form-cell wid100">
                    <div className="form-group wid100">
                      <AppTextInput label=" 지표구분" placeholder="국가연계지표" required disabled />
                    </div>
                  </div>
                </div>
                <hr className="line"></hr>
                <div className="form-table">
                  <div className="form-cell wid100">
                    <div className="form-group wid100">
                      <AppSelect label={'지표분류'} required />
                    </div>
                  </div>
                </div>
                <hr className="line"></hr>
                <div className="form-table">
                  <div className="form-cell wid100">
                    <div className="form-group wid100">
                      <AppSelect label={'산출기준'} required />
                    </div>
                  </div>
                </div>
                <hr className="line"></hr>
                <div className="form-table">
                  <div className="form-cell wid100">
                    <div className="form-group wid100">
                      <AppSelect label={'지표명'} required />
                    </div>
                  </div>
                </div>
                <hr className="line"></hr>
                <div className="form-table">
                  <div className="form-cell wid100">
                    <div className="form-group wid100">
                      <AppTextArea label="지표정의" errorMessage="" required />
                    </div>
                  </div>
                </div>
                <hr className="line"></hr>
                <div className="form-table">
                  <div className="form-cell wid100">
                    <div className="form-group wid100">
                      <AppTextInput inputType="number" label="주의" placeholder="0.262" required />
                    </div>
                  </div>
                </div>
                <hr className="line"></hr>
                <div className="form-table">
                  <div className="form-cell wid100">
                    <div className="form-group wid100">
                      <div className="form-group wid100">
                        <AppTextInput inputType="number" label="경계" placeholder="0.468" required />
                      </div>
                    </div>
                  </div>
                </div>
                <hr className="line"></hr>
                <div className="form-table">
                  <div className="form-cell wid100">
                    <div className="form-group wid100">
                      <div className="form-group wid100">
                        <AppTextInput inputType="number" label="심각" placeholder="0.468" required />
                      </div>
                    </div>
                  </div>
                </div>
                <hr className="line"></hr>
                <div className="form-table">
                  <div className="form-cell wid100">
                    <div className="form-group wid100">
                      <div className="form-group wid100">
                        <AppTextInput inputType="number" label="목표치(SPT)" placeholder="0.468" required />
                      </div>
                    </div>
                  </div>
                </div>
                <hr className="line"></hr>
                <div className="form-table">
                  <div className="form-cell wid100">
                    <div className="group-box-wrap wid100">
                      <span className="txt">
                        사용여부<span className="required">*</span>
                      </span>
                      <div className="radio-wrap ">
                        <label>
                          <input type="checkbox" checked />
                          <span>예</span>
                        </label>
                        <label>
                          <input type="checkbox" />
                          <span>아니오</span>
                        </label>
                      </div>
                      <span className="errorText"></span>
                    </div>
                  </div>
                </div>
                <hr className="line"></hr>
              </div>
            </div>
          </div>
        </div>

        <div className="pop_btns">
          <button className="btn_text text_color_neutral-10 btn_confirm" onClick={closeModal}>
            수정
          </button>
          <button className="btn_text text_color_neutral-90 btn_close" onClick={closeModal}>
            닫기
          </button>
        </div>
        <span className="pop_close" onClick={closeModal}>
          X
        </span>
      </div>
    </Modal>
  );
}

export default PSPINewModal;
