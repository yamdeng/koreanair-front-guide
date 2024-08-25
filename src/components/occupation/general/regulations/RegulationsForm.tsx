import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AppTextInput from '@/components/common/AppTextInput';
import AppEditor from '@/components/common/AppEditor';
import AppCodeSelect from '@/components/common/AppCodeSelect';
import AppDatePicker from '@/components/common/AppDatePicker';
import { Upload } from 'antd';
import ApiService from '@/services/ApiService';
/* TODO : store 경로를 변경해주세요. */
import useOcuRegulationsFormStore from '@/stores/occupation/general/useOcuRegulationsFormStore';

const props: any = {
  name: 'file',
  multiple: true,
  defaultFileList: [
    {
      uid: '1',
      name: 'xxx.png',
      // status: 'uploading',
      url: 'http://www.baidu.com/xxx.png',
      percent: 33,
    },
    {
      uid: '2',
      name: 'yyy.png',
      status: 'done',
      url: 'http://www.baidu.com/yyy.png',
    },
    {
      uid: '3',
      name: 'zzz.png',
      status: 'error',
      response: 'Server Error 500',
      // custom error message to show
      url: 'http://www.baidu.com/zzz.png',
    },
  ],
  action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',

  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      alert(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      alert(`${info.file.name} file upload failed.`);
    }
  },

  // onRemove(file) {
  //   return false;
  // },

  // onPreview(file) {
  //   return false;
  // },

  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files);
  },
};

/* TODO : 컴포넌트 이름을 확인해주세요 */
function OcuRulesFormForm() {
  /* formStore state input 변수 */
  const { errors, changeInput, getDetail, formType, formValue, save, remove, cancel, clear } =
    useOcuRegulationsFormStore();

  const {
    // 부문명
    sectCd,
    // 등록자
    regUserId,
    // 구분
    formCls,
    // 개정번호
    revisionNo,
    // 제정일자
    enactedDt,
    // 개정일자
    revisionDt,
    // 첨부 link
    // linkId,
    // 제목
    revisionTitle,
    // 내용
    majorRevisionCn,
    // 첨부 파일
    // fileId,
  } = formValue;

  const { detailId } = useParams();

  // 부문 변경시 개정번호 조회
  const sectCdSelectRevisionNo = async (type, typeValue) => {
    const formApiPath = 'ocu/general/selectRevisionNo';
    const apiParam = {
      sectCd: typeValue,
      formCls: formCls,
    };
    const apiResult: any = await ApiService['get'](formApiPath, apiParam, { disableLoadingBar: true });

    const data = apiResult.data;
    formValue.revisionNo = data.rulesFormId;
    formValue.enactedDt = data.enactedDt;
    changeInput(type, typeValue);
  };

  // 구분 변경시 개정번호 조회
  const typeSelectRevisionNo = async (type, typeValue) => {
    const formApiPath = 'ocu/general/selectRevisionNo';
    const apiParam = {
      sectCd: sectCd,
      formCls: typeValue,
    };
    const apiResult: any = await ApiService['get'](formApiPath, apiParam, { disableLoadingBar: true });
    const data = apiResult.data;

    console.log('data==>', data);
    console.log('data.enactedDt==>', data.enactedDt);

    formValue.revisionNo = data.rulesFormId;
    formValue.enactedDt = data.enactedDt;
    changeInput(type, typeValue);
  };

  useEffect(() => {
    if (detailId && detailId !== 'add') {
      getDetail(detailId);
    }
    return clear;
  }, []);

  return (
    <>
      {/*경로 */}
      <div className="Breadcrumb">
        <ol>
          <li className="breadcrumb-item">
            <a href="javascript:void(0);">홈</a>
          </li>
          <li className="breadcrumb-item">
            <a href="javascript:void(0);">안전관리</a>
          </li>
          <li className="breadcrumb-item">
            <a href="javascript:void(0);">위험기계기구</a>
          </li>
        </ol>
      </div>
      {/*경로 */}
      <div className="conts-title">
        <h2>규정/지침/매뉴얼/양식</h2>
      </div>
      {/* 입력영역 */}
      <div className="editbox">
        <div className="form-table line">
          <div className="form-cell wid50">
            <div className="form-group wid100">
              <AppCodeSelect
                label="부문"
                codeGrpId="CODE_GRP_OC001"
                value={sectCd}
                onChange={(value) => sectCdSelectRevisionNo('sectCd', value)}
                // onChange={(value) => changeInput('sectCd', value)}
                required
                disabled={formType !== 'add' ? true : false}
                errorMessage={errors.sectCd}
              />
            </div>
          </div>
          <div className="form-cell wid50">
            <div className="form-group wid100">
              <AppTextInput
                label="등록자"
                value={regUserId}
                onChange={(value) => changeInput('regUserId', value)}
                required
                disabled="false"
                errorMessage={errors.regUserId}
                // disabled={formType !== 'add' ? true : false}
              />
            </div>
          </div>
          <div className="form-cell wid50">
            <div className="form-group wid100">
              <AppCodeSelect
                label="구분"
                codeGrpId="CODE_GRP_OC005"
                value={formCls}
                // onChange={(value) => changeInput('formCls', value)}
                onChange={(value) => typeSelectRevisionNo('formCls', value)}
                required
                disabled={formType !== 'add' ? true : false}
                errorMessage={errors.formCls}
              />
            </div>
          </div>
          <div className="form-cell wid50">
            <div className="form-group wid100">
              <AppTextInput
                label="개정번호"
                value={revisionNo}
                onChange={(value) => changeInput('revisionNo', value)}
                required
                disabled
                errorMessage={errors.revisionNo}
              />
            </div>
          </div>
          <div className="form-cell wid50">
            <div className="form-group wid100">
              <AppDatePicker
                label={'제정일자'}
                value={enactedDt}
                onChange={(value) => {
                  changeInput('enactedDt', value);
                }}
                // disabled={formType !== 'add' ? true : false}
                // 개정된게 없는 경우에만 입력 가능
                disabled={formType === 'add' && revisionNo == '1' ? false : true}
              />
            </div>
          </div>
          <div className="form-cell wid50">
            <div className="form-group wid100">
              <AppDatePicker
                label={'개정일자'}
                value={revisionDt}
                onChange={(value) => {
                  changeInput('revisionDt', value);
                }}
              />
            </div>
          </div>
        </div>
        <hr className="line dp-n"></hr>
        <div className="form-table line">
          <div className="form-cell wid50">
            <div className="group-box-wrap line wid100">
              <span className="txt">첨부파일 Link{/*<span className="required">*</span>*/}</span>
              {/*<div className="radio-wrap">
              <label>
                <input type="radio" checked />
                <span>YES</span>
              </label>
              <label>
                <input type="radio" />
                <span>NO</span>
              </label>
            </div>*/}
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
        <hr className="line dp-n"></hr>
        <div className="form-table">
          <div className="form-cell wid100">
            <div className="form-group wid100">
              <AppTextInput
                label="제목"
                value={revisionTitle}
                onChange={(value) => changeInput('revisionTitle', value)}
                required
                errorMessage={errors.revisionTitle}
              />
            </div>
          </div>
        </div>

        <hr className="line"></hr>
        <div className="form-table">
          <div className="form-cell wid50">
            <div className="form-group wid100">
              <AppEditor
                placeholder="입력해주세요."
                value={majorRevisionCn}
                onChange={(value) => changeInput('majorRevisionCn', value)}
                required
                errorMessage={errors.majorRevisionCn}
              />
            </div>
          </div>
        </div>
        <hr className="line"></hr>
        {/* 파일첨부영역 : button */}
        <div className="form-table">
          <div className="form-cell wid50">
            <div className="form-group wid100">
              <Upload {...props}>
                <div className="btn-area">
                  <button type="button" name="button" className="btn-big btn_text btn-darkblue-line">
                    + Upload
                  </button>
                </div>
              </Upload>
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
export default OcuRulesFormForm;
