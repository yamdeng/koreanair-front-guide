import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AppTextInput from '@/components/common/AppTextInput';
import useSysMessageFormStore from '@/stores/admin/useSysMessageFormStore';
import { FORM_TYPE_UPDATE } from '@/config/CommonConstant';

function MessageForm() {
  /* formStore state input 변수 */
  const { errors, changeInput, getDetail, formType, formValue, save, remove, cancel, clear } = useSysMessageFormStore();

  const { msgKey, msgKor, msgEng, msgChn, msgJpn, msgEtc } = formValue;

  const { detailId } = useParams();

  useEffect(() => {
    if (detailId && detailId !== 'add') {
      getDetail(detailId);
    }
    return clear;
  }, []);

  return (
    <>
      <div className="conts-title">
        <h2>메시지 폼</h2>
      </div>
      <div className="editbox">
        <div className="form-table">
          <div className="form-cell wid50">
            <div className="form-group wid100">
              <AppTextInput
                id="useSysMessageFormStoremsgKey"
                name="msgKey"
                label="메시지 키"
                value={msgKey}
                onChange={(value) => changeInput('msgKey', value)}
                required
                errorMessage={errors.msgKey}
                disabled={formType === FORM_TYPE_UPDATE}
              />
            </div>
          </div>
        </div>

        <div className="form-table">
          <div className="form-cell wid50">
            <div className="form-group wid100">
              <AppTextInput
                id="useSysMessageFormStoremsgKor"
                name="msgKor"
                label="설명(한국어)"
                value={msgKor}
                onChange={(value) => changeInput('msgKor', value)}
                required
                errorMessage={errors.msgKor}
              />
            </div>
          </div>
        </div>

        <div className="form-table">
          <div className="form-cell wid50">
            <div className="form-group wid100">
              <AppTextInput
                id="useSysMessageFormStoremsgEng"
                name="msgEng"
                label="설명(영어)"
                value={msgEng}
                onChange={(value) => changeInput('msgEng', value)}
                required
                errorMessage={errors.msgEng}
              />
            </div>
          </div>
        </div>

        <div className="form-table">
          <div className="form-cell wid50">
            <div className="form-group wid100">
              <AppTextInput
                id="useSysMessageFormStoremsgChn"
                name="msgChn"
                label="설명(중국어)"
                value={msgChn}
                onChange={(value) => changeInput('msgChn', value)}
                errorMessage={errors.msgChn}
              />
            </div>
          </div>
        </div>

        <div className="form-table">
          <div className="form-cell wid50">
            <div className="form-group wid100">
              <AppTextInput
                id="useSysMessageFormStoremsgJpn"
                name="msgJpn"
                label="설명(일본어)"
                value={msgJpn}
                onChange={(value) => changeInput('msgJpn', value)}
                errorMessage={errors.msgJpn}
              />
            </div>
          </div>
        </div>

        <div className="form-table">
          <div className="form-cell wid50">
            <div className="form-group wid100">
              <AppTextInput
                id="useSysMessageFormStoremsgEtc"
                name="msgEtc"
                label="설명(기타)"
                value={msgEtc}
                onChange={(value) => changeInput('msgEtc', value)}
                errorMessage={errors.msgEtc}
              />
            </div>
          </div>
        </div>
      </div>
      {/* 하단 버튼 영역 */}
      <div className="contents-btns">
        <button className="btn_text text_color_neutral-10 btn_confirm" onClick={save}>
          저장
        </button>
        <button
          className="btn_text text_color_darkblue-100 btn_close"
          onClick={remove}
          style={{ display: formType !== 'add' ? '' : 'none' }}
        >
          삭제
        </button>
        <button className="btn_text text_color_darkblue-100 btn_close" onClick={cancel}>
          취소
        </button>
      </div>
    </>
  );
}
export default MessageForm;
