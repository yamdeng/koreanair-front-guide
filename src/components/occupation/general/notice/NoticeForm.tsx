import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AppTextInput from '@/components/common/AppTextInput';
import AppEditor from '@/components/common/AppEditor';
import AppCodeSelect from '@/components/common/AppCodeSelect';
import AppFileAttach from '@/components/common/AppFileAttach';
import { useState } from 'react';

// import { Upload } from 'antd';
/* TODO : store 경로를 변경해주세요. */
import useOcuNoticeFormStore from '@/stores/occupation/general/useOcuNoticeFormStore';

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
function NoticeForm() {
  /* formStore state input 변수 */
  const { errors, changeInput, getDetail, formType, formValue, save, remove, cancel, clear } = useOcuNoticeFormStore();

  console.log('formType==>', formType);

  const {
    // 부문 코드
    sectCd,
    // 등록자
    regUserId,
    // 등록일자
    regDttm,
    // 공지사항 구분
    noticeCls,
    // 상위 표출 여부
    upViewYn,
    // 제목
    noticeTitle,
    // 내용
    noticeContent,
    // 첨부파일 ID
    //fileId,
  } = formValue;

  const { detailId } = useParams();

  useEffect(() => {
    console.log('detailId==>', detailId);
    if (detailId && detailId !== 'add') {
      getDetail(detailId);
    }
    return clear;
  }, []);

  const [fileGroupSeq, setFileGroupSeq] = useState('');
  //  const [fileGroupSeq2, setFileGroupSeq2] = useState(null);

  return (
    <>
      <div className="conts-title">
        <h2>공지사항</h2>
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
          <div className="form-cell wid50">
            <div className="form-group wid100">
              <AppCodeSelect
                label={'공지사항 구분'}
                codeGrpId="CODE_GRP_OC004"
                value={noticeCls}
                onChange={(value) => changeInput('noticeCls', value)}
                required
                errorMessage={errors.noticeCls}
              />
            </div>
          </div>
          <div className="form-cell wid50">
            <div className="form-group wid100">
              <AppCodeSelect
                label={'상위 표출 여부'}
                codeGrpId="CODE_GRP_OC003"
                value={upViewYn}
                onChange={(value) => changeInput('upViewYn', value)}
                required
                errorMessage={errors.upViewYn}
              />
            </div>
          </div>
        </div>
        <hr className="line dp-n"></hr>
        <div className="form-table">
          <div className="form-cell wid100">
            <div className="form-group wid100">
              <AppTextInput
                label="제목"
                id="noticeTitle"
                name="noticeTitle"
                value={noticeTitle}
                onChange={(value) => changeInput('noticeTitle', value)}
                errorMessage={errors.noticeTitle}
                required
              />
            </div>
          </div>
        </div>
        <hr className="line"></hr>
        <div className="form-table">
          <div className="form-cell wid50">
            <div className="form-group wid100">
              {/* 봐야함 */}
              <AppEditor
                placeholder="입력해주세요."
                value={noticeContent}
                onChange={(value) => changeInput('noticeContent', value)}
                required
                errorMessage={errors.noticeContent}
              />
            </div>
          </div>
        </div>
        <hr className="line"></hr>
        {/* 파일첨부영역 : button */}

        <div className="form-table">
          <div className="form-cell wid100">
            <div className="form-group wid100">
              <AppFileAttach
                mode="edit"
                label="파일첨부"
                fileGroupSeq={fileGroupSeq}
                workScope={'A'}
                onlyImageUpload={false}
                updateFileGroupSeq={(newFileGroupSeq) => {
                  setFileGroupSeq(newFileGroupSeq);
                }}
              />
            </div>
          </div>
        </div>
        {/* <div className="form-table">
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
        </div> */}
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
export default NoticeForm;
