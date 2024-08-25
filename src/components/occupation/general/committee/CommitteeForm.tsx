import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AppTextInput from '@/components/common/AppTextInput';
//import AppDatePicker from '@/components/common/AppDatePicker';
import AppEditor from '@/components/common/AppEditor';
//import AppSelect from '@/components/common/AppSelect';
import AppCodeSelect from '@/components/common/AppCodeSelect';
import { Upload } from 'antd';

/* TODO : store 경로를 변경해주세요. */
import useOcuCommitteeFormStore from '@/stores/occupation/general/useOcuCommitteeFormStore';

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
function OcuCommitteeForm() {
  /* formStore state input 변수 */
  const { errors, changeInput, getDetail, formType, formValue, save, remove, cancel, clear } =
    useOcuCommitteeFormStore();

  const {
    // 제목
    title,
    // 내용
    content,
    // 첨부 링크 ID
    // linkId,
    // 부문 코드
    sectCd,
    // 등록자
    regUserId,
    // 등록일자
    regDttm,
    // 첨부파일 ID
    //fileId,
  } = formValue;

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
        <h2>산업안전보건위원회</h2>
      </div>
      {/* 입력영역 */}
      <div className="editbox">
        <div className="form-table">
          <div className="form-cell wid100">
            <div className="form-group wid100">
              <AppTextInput
                label="제목"
                value={title}
                onChange={(value) => changeInput('title', value)}
                required
                errorMessage={errors.title}
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
                value={content}
                onChange={(value) => changeInput('content', value)}
                required
                errorMessage={errors.content}
              />
            </div>
          </div>
        </div>
        <hr className="line"></hr>
        <div className="form-table line">
          <div className="form-cell wid50">
            <div className="group-box-wrap line wid100">
              <span className="txt">첨부파일 Link{/*<span className="required">*</span>*/}</span>
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
        <div className="form-table line">
          <div className="form-cell wid50">
            <div className="form-group wid100">
              <AppCodeSelect
                label="부문"
                codeGrpId="CODE_GRP_OC001"
                value={sectCd}
                onChange={(value) => changeInput('sectCd', value)}
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
              {/* <AppDatePicker label={'등록일자'} /> */}
              <AppTextInput
                disabled
                label="등록일자"
                value={regDttm}
                onChange={(value) => changeInput('regDttm', value)}
                required
                errorMessage={errors.regDttm}
              />
            </div>
          </div>
        </div>
        <hr className="line dp-n"></hr>
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
export default OcuCommitteeForm;
