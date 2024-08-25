import { useEffect } from 'react';
import AppNavigation from '@/components/common/AppNavigation';
import { useFormDirtyCheck } from '@/hooks/useFormDirtyCheck';
import { useParams } from 'react-router-dom';
import AppCodeSelect from '@/components/common/AppCodeSelect';
import AppTextInput from '@/components/common/AppTextInput';
import AppDatePicker from '@/components/common/AppDatePicker';
import AppEditor from '@/components/common/AppEditor';
import { Upload } from 'antd';

/* TODO : store 경로를 변경해주세요. */
import useOcuMajorDssTrainingFormStore from '@/stores/occupation/management/useOcuMajorDssTrainingFormStore';

/* TODO : 컴포넌트 이름을 확인해주세요 */
function OcuMajorDssTrainingForm() {
  /* formStore state input 변수 */
  const { errors, changeInput, getDetail, formType, formValue, isDirty, save, remove, cancel, clear } =
    useOcuMajorDssTrainingFormStore();

  const { dssTypeCd, etcType, trainDt, trainLocation, prtc, trainNm, evalContent, fileId, linkId, regDttm, regUserId } =
    formValue;
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
        <h2>중대재해대응훈련</h2>
      </div>
      <div className="editbox">
        <div className="form-table line">
          <div className="form-cell wid50">
            <div className="form-group wid100">
              <AppTextInput
                id="OcuMajorDssTrainingFormregUserId"
                name="regUserId"
                label="작성자"
                value={regUserId}
                onChange={(value) => changeInput('regUserId', value)}
                errorMessage={errors.regUserId}
                required
              />
            </div>
          </div>
          <div className="form-cell wid50">
            <div className="form-group wid100">
              <AppDatePicker
                id="OcuMajorDssTrainingFormregDttm"
                name="regDttm"
                label="작성일자"
                value={regDttm}
                onChange={(value) => changeInput('regDttm', value)}
                errorMessage={errors.regDttm}
                required
              />
            </div>
          </div>
          <div className="form-cell wid50">
            <div className="form-group wid100">
              <AppCodeSelect label={'부문'} codeGrpId="CODE_GRP_OC001" value={'정비본부'} required disabled />
            </div>
          </div>
        </div>
        <hr className="line dp-n"></hr>
        <div className="form-table line">
          <div className="form-cell wid50">
            <div className="form-group wid100">
              <AppCodeSelect label="부서" codeGrpId="CODE_GRP_OC001" value={'정비팀'} required disabled />
            </div>
          </div>
          <div className="form-cell wid50">
            <div className="form-group wid100">
              <AppCodeSelect
                id="OcuMajorDssTrainingFormdssTypeCd"
                name="dssTypeCd"
                label="재난유형"
                codeGrpId="CODE_GRP_OC006"
                value={dssTypeCd}
                onChange={(value) => changeInput('dssTypeCd', value)}
                errorMessage={errors.dssTypeCd}
                required
              />
            </div>
          </div>
          <div className="form-cell wid50">
            <div className="form-group wid100">
              <AppTextInput
                id="OcuMajorDssTrainingFormetcType"
                name="etcType"
                label="기타유형"
                value={etcType}
                onChange={(value) => changeInput('etcType', value)}
                errorMessage={errors.etcType}
                placeholder="기타 선택 시 입력"
              />
            </div>
          </div>
        </div>
        <hr className="line dp-n"></hr>
        <div className="form-table line">
          <div className="form-cell wid50">
            <div className="form-group wid100">
              <AppDatePicker
                id="OcuMajorDssTrainingFormtrainDt"
                name="trainDt"
                label="훈련 실시일자"
                value={trainDt}
                onChange={(value) => changeInput('trainDt', value)}
                errorMessage={errors.trainDt}
                required
              />
            </div>
          </div>
          <div className="form-cell wid50">
            <div className="form-group wid100">
              <AppTextInput
                id="OcuMajorDssTrainingFormtrainLocation"
                name="trainLocation"
                label="훈련장소"
                value={trainLocation}
                onChange={(value) => changeInput('trainLocation', value)}
                errorMessage={errors.trainLocation}
                required
              />
            </div>
          </div>
          <div className="form-cell wid50">
            <div className="form-group wid100">
              <AppTextInput
                id="OcuMajorDssTrainingFormprtc"
                name="prtc"
                label="참석자"
                value={prtc}
                onChange={(value) => changeInput('prtc', value)}
                errorMessage={errors.prtc}
                required
              />
            </div>
          </div>
        </div>
        <hr className="line dp-n"></hr>
        <div className="form-table">
          <div className="form-cell wid50">
            <div className="form-group wid100">
              <AppTextInput
                id="OcuMajorDssTrainingFormtrainNm"
                name="trainNm"
                label="훈련명"
                value={trainNm}
                onChange={(value) => changeInput('trainNm', value)}
                errorMessage={errors.trainNm}
                required
              />
            </div>
          </div>
        </div>
        <hr className="line"></hr>
        <div className="form-table">
          <div className="form-cell wid50">
            <div className="form-group wid100">
              <AppEditor
                id="OcuMajorDssTrainingFormevalContent"
                name="evalContent"
                label="내용 및 평가"
                value={evalContent}
                onChange={(value) => changeInput('evalContent', value)}
                errorMessage={errors.evalContent}
                required
                placeholder="입력해주세요."
              />
            </div>
          </div>
        </div>
        <hr className="line"></hr>

        {/* 파일첨부영역 : button */}
        <div className="form-table hide">
          <div className="form-cell wid100">
            <div className="form-group wid100">
              <AppTextInput
                id="OcuMajorDssTrainingFormfileId"
                name="fileId"
                label="첨부_파일_ID"
                value={fileId}
                onChange={(value) => changeInput('fileId', value)}
                errorMessage={errors.fileId}
              />
            </div>
          </div>
        </div>

        <div className="form-table">
          <div className="form-cell wid50">
            <div className="form-group wid100">
              <Upload>
                <div className="btn-area">
                  <button type="button" name="button" className="btn-big btn_text btn-darkblue-line">
                    + Upload
                  </button>
                </div>
              </Upload>
            </div>
          </div>
        </div>

        <div className="form-table hide">
          <div className="form-cell wid100">
            <div className="form-group wid100">
              <AppTextInput
                id="OcuMajorDssTrainingFormlinkId"
                name="linkId"
                label="첨부_링크_ID"
                value={linkId}
                onChange={(value) => changeInput('linkId', value)}
                errorMessage={errors.linkId}
              />
            </div>
          </div>
        </div>

        <hr className="line"></hr>
        <div className="form-table line">
          <div className="form-cell wid50">
            <div className="group-box-wrap line wid100">
              <span className="txt">링크 첨부</span>
              {/* 링크팝업명: MU1P5detail2Modal */}
              <button type="button" name="button" className="btn-plus">
                추가
              </button>
              <div className="file-link">
                <div className="link-box">
                  <a href="javascript:void(0);">첨부Link첨부Link첨부Link</a>
                  <a href="javascript:void(0);">
                    <span className="close-btn">close</span>
                  </a>
                </div>
                <div className="link-box">
                  <a href="javascript:void(0);">첨부Link</a>
                  <a href="javascript:void(0);">
                    <span className="close-btn">close</span>
                  </a>
                </div>
                <div className="link-box">
                  <a href="javascript:void(0);">첨부Link</a>
                  <a href="javascript:void(0);">
                    <span className="close-btn">close</span>
                  </a>
                </div>
                <div className="link-box">
                  <a href="javascript:void(0);">첨부Link</a>
                  <a href="javascript:void(0);">
                    <span className="close-btn">close</span>
                  </a>
                </div>
              </div>
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
export default OcuMajorDssTrainingForm;
