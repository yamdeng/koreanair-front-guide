import { useEffect } from 'react';
import AppNavigation from '@/components/common/AppNavigation';
import { useFormDirtyCheck } from '@/hooks/useFormDirtyCheck';
import { useParams } from 'react-router-dom';
import AppCodeSelect from '@/components/common/AppCodeSelect';
import AppTextInput from '@/components/common/AppTextInput';

import useOcuSealSpaceFormStore from '@/stores/occupation/management/useOcuSealSpaceFormStore';

/* TODO : 컴포넌트 이름을 확인해주세요 */
function OcuSealSpaceForm() {
  /* formStore state input 변수 */
  const { errors, changeInput, getDetail, formType, formValue, isDirty, save, remove, cancel, clear } =
    useOcuSealSpaceFormStore();

  const {
    sectCd,
    deptCd,
    areaCd,
    bizPlace,
    positionCls1,
    positionCls2,
    hndChmcl,
    hzdFactor,
    stdRuleCd,
    wrkCompanyNm,
    entExtIntrv,
    wrkContent,
    pohtoId1,
    pohtoId2,
    regDttm,
    regUserId,
  } = formValue;

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
        <h2>밀폐공간현황</h2>
      </div>
      <div className="editbox">
        <div className="form-table">
          <div className="form-cell wid100">
            <div className="form-group wid100">
              <AppCodeSelect
                codeGrpId="CODE_GRP_OC001"
                id="OcuSealSpaceFormsectCd"
                name="sectCd"
                label="부문"
                value={sectCd}
                onChange={(value) => changeInput('sectCd', value)}
                errorMessage={errors.sectCd}
              />
            </div>
          </div>
        </div>
        <hr className="line"></hr>

        <div className="form-table">
          <div className="form-cell wid100">
            <div className="form-group wid100">
              <AppCodeSelect
                codeGrpId=""
                id="OcuSealSpaceFormdeptCd"
                name="deptCd"
                label="부서"
                value={deptCd}
                onChange={(value) => changeInput('deptCd', value)}
                errorMessage={errors.deptCd}
              />
            </div>
          </div>
        </div>
        <hr className="line"></hr>

        <div className="form-table">
          <div className="form-cell wid100">
            <div className="form-group wid100">
              <AppCodeSelect
                codeGrpId="CODE_GRP_OC007"
                id="OcuSealSpaceFormareaCd"
                name="areaCd"
                label="권역"
                value={areaCd}
                onChange={(value) => changeInput('areaCd', value)}
                errorMessage={errors.areaCd}
              />
            </div>
          </div>
        </div>
        <hr className="line"></hr>

        <div className="form-table">
          <div className="form-cell wid100">
            <div className="form-group wid100">
              <AppTextInput
                id="OcuSealSpaceFormbizPlace"
                name="bizPlace"
                label="사업장"
                value={bizPlace}
                onChange={(value) => changeInput('bizPlace', value)}
                errorMessage={errors.bizPlace}
              />
            </div>
          </div>
        </div>
        <hr className="line"></hr>

        <div className="form-table">
          <div className="form-cell wid100">
            <div className="form-group wid100">
              <AppTextInput
                id="OcuSealSpaceFormpositionCls1"
                name="positionCls1"
                label="위치분류1"
                value={positionCls1}
                onChange={(value) => changeInput('positionCls1', value)}
                errorMessage={errors.positionCls1}
              />
            </div>
          </div>
        </div>
        <hr className="line"></hr>

        <div className="form-table">
          <div className="form-cell wid100">
            <div className="form-group wid100">
              <AppTextInput
                id="OcuSealSpaceFormpositionCls2"
                name="positionCls2"
                label="위치분류2"
                value={positionCls2}
                onChange={(value) => changeInput('positionCls2', value)}
                errorMessage={errors.positionCls2}
              />
            </div>
          </div>
        </div>
        <hr className="line"></hr>

        <div className="form-table">
          <div className="form-cell wid100">
            <div className="form-group wid100">
              <AppTextInput
                id="OcuSealSpaceFormhndChmcl"
                name="hndChmcl"
                label="취급화학물질"
                value={hndChmcl}
                onChange={(value) => changeInput('hndChmcl', value)}
                errorMessage={errors.hndChmcl}
              />
            </div>
          </div>
        </div>
        <hr className="line"></hr>

        <div className="form-table">
          <div className="form-cell wid100">
            <div className="form-group wid100">
              <AppTextInput
                id="OcuSealSpaceFormhzdFactor"
                name="hzdFactor"
                label="유해인자"
                value={hzdFactor}
                onChange={(value) => changeInput('hzdFactor', value)}
                errorMessage={errors.hzdFactor}
              />
            </div>
          </div>
        </div>
        <hr className="line"></hr>

        <div className="form-table">
          <div className="form-cell wid100">
            <div className="form-group wid100">
              <AppCodeSelect
                codeGrpId="CODE_GRP_OC008"
                id="OcuSealSpaceFormstdRuleCd"
                name="stdRuleCd"
                label="기준규칙_코드"
                value={stdRuleCd}
                onChange={(value) => changeInput('stdRuleCd', value)}
                errorMessage={errors.stdRuleCd}
              />
            </div>
          </div>
        </div>
        <hr className="line"></hr>

        <div className="form-table">
          <div className="form-cell wid100">
            <div className="form-group wid100">
              <AppTextInput
                id="OcuSealSpaceFormwrkCompanyNm"
                name="wrkCompanyNm"
                label="작업_업체_명"
                value={wrkCompanyNm}
                onChange={(value) => changeInput('wrkCompanyNm', value)}
                errorMessage={errors.wrkCompanyNm}
              />
            </div>
          </div>
        </div>
        <hr className="line"></hr>

        <div className="form-table">
          <div className="form-cell wid100">
            <div className="form-group wid100">
              <AppTextInput
                id="OcuSealSpaceFormentExtIntrv"
                name="entExtIntrv"
                label="출입_주기"
                value={entExtIntrv}
                onChange={(value) => changeInput('entExtIntrv', value)}
                errorMessage={errors.entExtIntrv}
              />
            </div>
          </div>
        </div>
        <hr className="line"></hr>

        <div className="form-table">
          <div className="form-cell wid100">
            <div className="form-group wid100">
              <AppTextInput
                id="OcuSealSpaceFormwrkContent"
                name="wrkContent"
                label="작업_내용"
                value={wrkContent}
                onChange={(value) => changeInput('wrkContent', value)}
                errorMessage={errors.wrkContent}
              />
            </div>
          </div>
        </div>
        <hr className="line"></hr>

        <div className="form-table">
          <div className="form-cell wid100">
            <div className="form-group wid100">
              <AppTextInput
                id="OcuSealSpaceFormpohtoId1"
                name="pohtoId1"
                label="첨부_사진_ID1"
                value={pohtoId1}
                onChange={(value) => changeInput('pohtoId1', value)}
                errorMessage={errors.pohtoId1}
              />
            </div>
          </div>
        </div>
        <hr className="line"></hr>

        <div className="form-table">
          <div className="form-cell wid100">
            <div className="form-group wid100">
              <AppTextInput
                id="OcuSealSpaceFormpohtoId2"
                name="pohtoId2"
                label="첨부_사진_ID2"
                value={pohtoId2}
                onChange={(value) => changeInput('pohtoId2', value)}
                errorMessage={errors.pohtoId2}
              />
            </div>
          </div>
        </div>
        <hr className="line"></hr>

        <div className="form-table">
          <div className="form-cell wid100">
            <div className="form-group wid100">
              <AppTextInput
                id="OcuSealSpaceFormregDttm"
                name="regDttm"
                label="등록_일시"
                value={regDttm}
                onChange={(value) => changeInput('regDttm', value)}
                errorMessage={errors.regDttm}
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
                id="OcuSealSpaceFormregUserId"
                name="regUserId"
                label="등록자_ID"
                value={regUserId}
                onChange={(value) => changeInput('regUserId', value)}
                errorMessage={errors.regUserId}
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
export default OcuSealSpaceForm;
