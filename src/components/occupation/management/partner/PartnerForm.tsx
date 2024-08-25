import { useEffect } from 'react';
import AppNavigation from '@/components/common/AppNavigation';
import { useFormDirtyCheck } from '@/hooks/useFormDirtyCheck';
import { useParams } from 'react-router-dom';
import AppTextInput from '@/components/common/AppTextInput';

/* TODO : store 경로를 변경해주세요. */
import useOcuPartnerInfoFormStore from '@/stores/occupation/management/useOcuPartnerInfoFormStore';

/* TODO : 컴포넌트 이름을 확인해주세요 */
function OcuPartnerInfoForm() {
  /* formStore state input 변수 */
  const { errors, changeInput, getDetail, formType, formValue, isDirty, save, remove, cancel, clear } =
    useOcuPartnerInfoFormStore();

  const { prtnrId, prtnrNm, bizNo, rprsn, bizIndst, bizType } = formValue;

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
        <h2>협력업체 입력, 수정</h2>
      </div>
      <div className="editbox">
        <div className="form-table">
          <div className="form-cell wid100">
            <div className="form-group wid100">
              <AppTextInput
                id="OcuPartnerInfoFormprtnrId"
                name="prtnrId"
                label="협력업체_ID"
                value={prtnrId}
                onChange={(value) => changeInput('prtnrId', value)}
                errorMessage={errors.prtnrId}
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
                id="OcuPartnerInfoFormprtnrNm"
                name="prtnrNm"
                label="협력업체_명"
                value={prtnrNm}
                onChange={(value) => changeInput('prtnrNm', value)}
                errorMessage={errors.prtnrNm}
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
                id="OcuPartnerInfoFormbizNo"
                name="bizNo"
                label="사업자_번호"
                value={bizNo}
                onChange={(value) => changeInput('bizNo', value)}
                errorMessage={errors.bizNo}
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
                id="OcuPartnerInfoFormrprsn"
                name="rprsn"
                label="대표자"
                value={rprsn}
                onChange={(value) => changeInput('rprsn', value)}
                errorMessage={errors.rprsn}
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
                id="OcuPartnerInfoFormbizIndst"
                name="bizIndst"
                label="업태"
                value={bizIndst}
                onChange={(value) => changeInput('bizIndst', value)}
                errorMessage={errors.bizIndst}
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
                id="OcuPartnerInfoFormbizType"
                name="bizType"
                label="업종"
                value={bizType}
                onChange={(value) => changeInput('bizType', value)}
                errorMessage={errors.bizType}
                required
              />
            </div>
          </div>
        </div>
        <hr className="line"></hr>
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
export default OcuPartnerInfoForm;
