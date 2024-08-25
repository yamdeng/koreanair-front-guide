import { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
import AppTextInput from '@/components/common/AppTextInput';
import AppEditor from '@/components/common/AppEditor';
//import AppCodeSelect from '@/components/common/AppCodeSelect';
import AppDatePicker from '@/components/common/AppDatePicker';
import OrgTreeSelectModal from '@/components/modal/OrgTreeSelectModal';
import { Upload } from 'antd';
/* TODO : store 경로를 변경해주세요. */
import useOcuHsCommitteeFormStore from '@/stores/occupation/general/useOcuHsCommitteeFormStore';

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
function OcuHsCommitteeForm() {
  /* formStore state input 변수 */
  const { errors, changeInput, formValue, getDetail, formType, cancel, save, remove, clear } =
    useOcuHsCommitteeFormStore();
  const {
    // 본부
    advCmitSectCd,
    // 부서
    advCmitDeptCd,
    // 팀
    advCmitDeptCd2,
    // 그룹
    advCmitDeptCd3,
    // 작성자
    regUserId,
    // 작성일자
    regDttm,
    // 해당연월
    advCmitImplmYm,
    // 제목
    advCmitTitle,
    // 내용
    advCmitRemark,

    // 회의록
    //prcdnFileId,
    // 회의자료
    //meetDocFileId,
    // 보고문서
    //reportDocLinkId,

    // advCmitId,
  } = formValue;
  const { detailId } = useParams();

  const [isOrgSelectModalopen, setIsOrgSelectModalopen] = useState(false);

  const handleOrgSelectModal = (selectedValue) => {
    console.log(selectedValue);
    setIsOrgSelectModalopen(false);
  };

  useEffect(() => {
    if (detailId && detailId !== 'add') {
      getDetail(detailId);
    }
    return clear;
  }, []);

  console.log('detailId==>', detailId);

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
        <h2>안전보건협의체</h2>
      </div>
      {/* 입력영역 */}
      <div className="editbox">
        <div className="form-table line">
          <div className="form-cell wid50">
            <div className="form-group wid100">
              <AppTextInput
                label={'본부'}
                value={advCmitSectCd}
                onChange={(value) => changeInput('advCmitSectCd', value)}
                required
                disabled
                errorMessage={errors.advCmitSectCd}
              />
            </div>
          </div>
          <div className="form-cell wid50">
            <div className="form-group wid100">
              <AppTextInput
                label={'부서'}
                value={advCmitDeptCd}
                onChange={(value) => changeInput('advCmitDeptCd', value)}
                required
                disabled
                errorMessage={errors.advCmitDeptCd}
              />

              {/* <OrgTreeSelectModal
                label={'부서'}
                isOpen={isOrgSelectModalopen}
                closeModal={() => setIsOrgSelectModalopen(false)}
                isMultiple={false}
                ok={handleOrgSelectModal}
              /> */}
            </div>
          </div>
          <div className="form-cell wid50">
            <div className="form-group wid100">
              <AppTextInput
                label={'팀'}
                value={advCmitDeptCd2}
                onChange={(value) => changeInput('advCmitDeptCd2', value)}
                required
                disabled
                errorMessage={errors.advCmitDeptCd2}
              />
            </div>
          </div>
          <div className="form-cell wid50">
            <div className="form-group wid100">
              <AppTextInput
                label={'그룹'}
                value={advCmitDeptCd3}
                onChange={(value) => changeInput('advCmitDeptCd3', value)}
                required
                disabled
                errorMessage={errors.advCmitDeptCd3}
              />
            </div>
          </div>
        </div>
        <hr className="line dp-n"></hr>
        <div className="form-table line">
          <div className="form-cell wid50">
            <div className="form-group wid100">
              <AppTextInput
                label="작성자"
                value={regUserId}
                onChange={(value) => changeInput('regUserId', value)}
                required
                disabled="false"
                errorMessage={errors.regUserId}
              />
            </div>
          </div>
          <div className="form-cell wid50">
            <div className="form-group wid100">
              <AppTextInput
                disabled
                label="작성일자"
                value={regDttm}
                onChange={(value) => changeInput('regDttm', value)}
                required
                errorMessage={errors.regDttm}
              />
            </div>
          </div>

          <div className="form-cell wid50">
            <div className="form-group wid100">
              <AppDatePicker
                label={'해당연월'}
                pickerType="month"
                value={advCmitImplmYm}
                onChange={(value) => {
                  changeInput('advCmitImplmYm', value);
                }}
              />
            </div>
          </div>
        </div>
        <hr className="line dp-n"></hr>
        <div className="form-table">
          <div className="form-cell wid50">
            <div className="form-group wid100">
              <AppTextInput
                label="제목"
                value={advCmitTitle}
                onChange={(value) => changeInput('advCmitTitle', value)}
                required
                errorMessage={errors.advCmitTitle}
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
                value={advCmitRemark}
                onChange={(value) => changeInput('advCmitRemark', value)}
                required
                errorMessage={errors.advCmitRemark}
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
                    회의록 업로드(pdf, 그림 파일)
                  </button>
                </div>
              </Upload>
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
                    회의자료 업로드(ppt)
                  </button>
                </div>
              </Upload>
            </div>
          </div>
        </div>
        <hr className="line"></hr>
        <div className="form-table line">
          <div className="form-cell wid50">
            <div className="group-box-wrap line wid100">
              <span className="txt">보고문서 Link</span>

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
export default OcuHsCommitteeForm;
