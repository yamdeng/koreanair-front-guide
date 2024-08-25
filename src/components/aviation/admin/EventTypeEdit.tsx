import { useEffect } from 'react';
import AppNavigation from '@/components/common/AppNavigation';
import { useFormDirtyCheck } from '@/hooks/useFormDirtyCheck';
import { useParams } from 'react-router-dom';
import AppTextInput from '@/components/common/AppTextInput';
import AppSelect from '@/components/common/AppSelect';
import { create } from 'zustand';
import { formBaseState, createFormSliceYup } from '@/stores/slice/formSlice';
import * as yup from 'yup';
import AppCodeSelect from '@/components/common/AppCodeSelect';
import { FORM_TYPE_UPDATE } from '@/config/CommonConstant';
import Code from '@/config/Code';

/* yup validation */
const yupFormSchema = yup.object({
  reportType: yup.string().required(),
  eventName: yup.string().required(),
  useYn: yup.string().required(),
  notes: yup.string(),
});

/* TODO : form 초기값 상세 셋팅 */
/* formValue 초기값 */
const initFormValue = {
  //eventId: null,
  reportType: '',
  eventName: '',
  useYn: '',
  notes: '',
};

/* form 초기화 */
const initFormData = {
  ...formBaseState,

  formApiPath: 'avn/admin/criteria/event-types',
  baseRoutePath: '/aviation/eventtype-manage',
  formName: 'EventTypeEditStore',
  formValue: {
    ...initFormValue,
  },
};

/* zustand store 생성 */
const EventTypeEditStore = create<any>((set, get) => ({
  ...createFormSliceYup(set, get),

  ...initFormData,

  yupFormSchema: yupFormSchema,

  clear: () => {
    set({ ...formBaseState, formValue: { ...initFormValue } });
  },
}));

/* TODO : 컴포넌트 이름을 확인해주세요 */
function EventTypeEdit() {
  /* formStore state input 변수 */
  const { errors, changeInput, getDetail, formType, formValue, isDirty, save, remove, cancel, clear } =
    EventTypeEditStore();

  const { reportType, eventName, useYn, notes } = formValue;

  const { detailId } = useParams();

  useFormDirtyCheck(isDirty);

  useEffect(() => {
    if (detailId && detailId !== 'add') {
      getDetail(detailId);
    }
    return clear;
  }, []);

  return (
    <>
      <AppNavigation />
      <div className="conts-title">
        <h2>EVENT TYPE 신규</h2>
      </div>
      <div className="editbox">
        <div className="form-table">
          <div className="form-cell wid100">
            <div className="form-group wid100">
              <AppCodeSelect
                codeGrpId="CODE_GRP_145"
                id="EventTypeFormreportType"
                name="reportType"
                label="리포트 구분"
                applyAllSelect
                allLabel="선택"
                disabled={formType === FORM_TYPE_UPDATE ? true : false}
                value={reportType}
                onChange={(value) => changeInput('reportType', value)}
                errorMessage={errors.reportType}
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
                id="EventTypeFormeventName"
                name="eventName"
                label="이벤트명"
                value={eventName}
                onChange={(value) => changeInput('eventName', value)}
                errorMessage={errors.eventName}
                required
              />
            </div>
          </div>
        </div>
        <hr className="line"></hr>

        <div className="form-table">
          <div className="form-cell wid100">
            <div className="form-group wid100">
              <AppSelect
                id="EventTypeFormuseYn"
                name="useYn"
                label="사용여부"
                options={Code.useYn}
                value={useYn}
                onChange={(value) => changeInput('useYn', value)}
                errorMessage={errors.useYn}
                required
              />
            </div>
          </div>
        </div>
        <hr className="line dp-n"></hr>

        <div className="form-table">
          <div className="form-cell wid100">
            <div className="form-group wid100">
              <AppTextInput
                id="EventTypeFormnotes"
                name="notes"
                label="비고"
                value={notes}
                onChange={(value) => changeInput('notes', value)}
                errorMessage={errors.notes}
              />
            </div>
          </div>
        </div>
        <hr className="line dp-n"></hr>
      </div>
      {/* 하단 버튼 영역 */}
      <div className="contents-btns">
        <button className="btn_text text_color_neutral-10 btn_confirm" onClick={save}>
          저장
        </button>
        <button
          className="btn_text text_color_darkblue-100 btn_close"
          onClick={remove}
          //style={{ display: formType !== 'add' ? '' : 'none' }}
          style={{ display: formType === FORM_TYPE_UPDATE ? '' : 'none' }}
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
export default EventTypeEdit;
