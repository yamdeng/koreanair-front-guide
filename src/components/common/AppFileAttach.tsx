import ApiService from '@/services/ApiService';
import ModalService from '@/services/ModalService';
import ToastService from '@/services/ToastService';
import CommonUtil from '@/utils/CommonUtil';
import { Upload } from 'antd';
import { useEffect, useRef } from 'react';
import { useImmer } from 'use-immer';
const { Dragger } = Upload;

// TODO : allowFileExtentions, onlyImageUpload
// TODO : 썸네일 반영
// TODO : applyPreviewImageModal
// TODO : file api url 환경변수로 분류

function AppFileAttach(props) {
  const {
    id = CommonUtil.getUUID(),
    label,
    required,
    errorMessage,
    isDragType = false,
    multiple = true,
    workScope,
    fileGroupSeq,
    updateFileGroupSeq,
  } = props;

  const [fileList, setFileList] = useImmer([]);
  const fileGroupSeqRef = useRef(null);
  const isFileListLoadedRef = useRef(null);

  const baseProps: any = {
    name: 'files',
    multiple: multiple,
    data: { workScope: workScope },

    onRemove(file) {
      const { fileSeq } = file;
      ModalService.confirm({
        body: '파일 삭제시 즉시 삭제됩니다.\n삭제하시겠습니까?',
        ok: () => {
          alert(`삭제 : ${fileSeq}`);
          // TODO : 전체 삭제이후에 onChange에 null로 전달하기 getFileList(true)
        },
      });
      return false;
    },

    onPreview(file) {
      const { fileSeq } = file;
      const url = import.meta.env.VITE_API_URL + import.meta.env.VITE_API_PREFIX + `/sys/file-groups/file/${fileSeq}`;
      window.open(url);
      return false;
    },

    beforeUpload(file, fileList) {
      if (fileList && fileList.length) {
        if (fileList.filter((info) => info.uid).length === fileList.length) {
          handleUploadMulti(fileList);
        }
      }
      return false;
    },
  };

  const handleUploadMulti = async (newFileList) => {
    isFileListLoadedRef.current = true;
    // 파일 기본 업로드 상태로 반영
    newFileList.forEach((info) => {
      info.status = 'uploading';
      info.percent = 0;
    });

    setFileList((beforeList) => {
      beforeList.push(...newFileList);
    });

    const formData = new FormData();
    newFileList.forEach((info) => {
      formData.append('files', info);
    });

    try {
      const apiParam: any = { workScope: workScope };
      if (fileGroupSeqRef.current) {
        apiParam.fileGroupSeq = fileGroupSeqRef.current;
      }
      const apiResult = await ApiService.fileUpload(formData, apiParam, (progressEvent) => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        setFileList((beforeList) => {
          beforeList.forEach((beforeInfo) => {
            const searchIndex = newFileList.findIndex((newInfo) => newInfo.uid === beforeInfo.uid);
            if (searchIndex !== -1) {
              beforeInfo.percent = percentCompleted;
            }
          });
        });
      });
      const data = apiResult.data;
      const { fileGroupSeq, fileList } = data;
      setFileList((beforeList) => {
        fileList.forEach((info) => {
          const searchIndex = beforeList.findIndex(
            (beforeInfo) => beforeInfo.status === 'uploading' && info.origFilename === beforeInfo.name
          );
          const searchInfo = { ...beforeList[searchIndex] };
          searchInfo.url = info.s3Path;
          searchInfo.fileSeq = info.fileSeq;
          searchInfo.name = info.origFilename;
          searchInfo.status = 'done';
          beforeList[searchIndex] = searchInfo;
        });
      });
      if (!fileGroupSeqRef.current) {
        updateFileGroupSeq(fileGroupSeq);
      }
      fileGroupSeqRef.current = fileGroupSeq;
    } catch (e) {
      ToastService.error('file upload error');
      setFileList((beforeList) => {
        return beforeList.filter((beforeInfo) => {
          return beforeInfo.status === 'done';
        });
      });
    }
  };

  const getFileList = async (isRemoveAcation = false) => {
    isFileListLoadedRef.current = true;
    const fileGroupSeq = fileGroupSeqRef.current;
    const apiResult = await ApiService.get(`sys/file-groups/${fileGroupSeq}`);
    const data = apiResult.data;
    const fileList = data.map((info) => {
      info.status = 'done';
      info.uid = info.fileSeq;
      info.name = info.origFilename;
      info.url = info.s3Path;
      return info;
    });
    setFileList(fileList);
    if (isRemoveAcation) {
      if (!fileList || !fileList.length) {
        updateFileGroupSeq(null);
      }
    }
  };

  useEffect(() => {
    if (fileGroupSeq) {
      const isFileListLoaded = isFileListLoadedRef.current;
      if (!isFileListLoaded) {
        fileGroupSeqRef.current = fileGroupSeq;
        getFileList();
      }
    }
  }, [fileGroupSeq]);

  return (
    <>
      <div className={errorMessage ? 'filebox error' : 'filebox'} id={id}>
        {isDragType ? (
          <Dragger {...baseProps} fileList={fileList}>
            <p className="ant-upload-text ">+ 이 곳을 클릭하거나 마우스로 업로드할 파일을 끌어서 놓으세요.</p>
          </Dragger>
        ) : (
          <Upload {...baseProps} fileList={fileList}>
            <div className="btn-area">
              <button type="button" name="button" className="btn-big btn_text btn-darkblue-line mg-n">
                + Upload
              </button>
            </div>
          </Upload>
        )}
        <label htmlFor="file" className="file-label">
          {label} {required ? <span className="required">*</span> : null}
        </label>
      </div>
      <span className="errorText" style={{ display: errorMessage ? '' : 'none' }}>
        {errorMessage}
      </span>
    </>
  );
}

export default AppFileAttach;
