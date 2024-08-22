import ApiService from '@/services/ApiService';
import ModalService from '@/services/ModalService';
import ToastService from '@/services/ToastService';
import CommonUtil from '@/utils/CommonUtil';
import { Image, Upload } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { useImmer } from 'use-immer';
import CommonInputError from './CommonInputError';

const { Dragger } = Upload;

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
    mode = 'edit',
    accept = null,
    onlyImageUpload = false,
    maxSizeMb = 5,
    maxCount = 100,
    disabled = false,
  } = props;

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');

  const [fileList, setFileList] = useImmer([]);
  const fileGroupSeqRef = useRef(null);

  let applyAccept = accept;
  if (!accept) {
    if (onlyImageUpload) {
      applyAccept = 'image/*';
    }
  }

  const baseProps: any = {
    name: 'files',
    multiple: multiple,
    accept: applyAccept,
    data: { workScope: workScope },
    listType: onlyImageUpload ? 'picture-card' : null,
    showUploadList: {
      extra: ({ fileSize = 0 }) => (
        <span
          style={{
            color: '#cccccc',
          }}
        >
          ({(fileSize / 1024 / 1024).toFixed(2)}MB)
        </span>
      ),
    },

    onRemove(file) {
      if (mode === 'edit') {
        const { fileSeq } = file;
        ModalService.confirm({
          body: '파일 삭제시 즉시 삭제됩니다.\n삭제하시겠습니까?',
          ok: async () => {
            await ApiService.delete(`${import.meta.env.VITE_API_URL_FIEL_GROUPS}/file/${fileSeq}`);
            getFileList(true);
            ToastService.info('파일이 삭제되었습니다.');
          },
        });
      }
      return false;
    },

    async onPreview(file) {
      const { fileSeq } = file;
      const url =
        import.meta.env.VITE_API_URL +
        import.meta.env.VITE_API_PREFIX +
        `/${import.meta.env.VITE_API_URL_FIEL_GROUPS}/file/${fileSeq}`;
      if (onlyImageUpload) {
        setPreviewImage(file.url);
        setPreviewOpen(true);
      } else {
        window.open(url);
      }
      return false;
    },

    beforeUpload(file, newFileList) {
      let successFileSizeCheck = true;
      newFileList.forEach((fileInfo) => {
        if (fileInfo.size / 1024 / 1024 > maxSizeMb) {
          successFileSizeCheck = false;
        }
      });
      const finalUploadCount = newFileList.length + fileList.length;
      let uploadMaxCountCheck = true;
      if (finalUploadCount > maxCount) {
        uploadMaxCountCheck = false;
      }
      if (!successFileSizeCheck) {
        ToastService.warn(`file max size :${maxSizeMb} MB`);
      }
      if (!uploadMaxCountCheck) {
        ToastService.warn(`upload max count :${maxCount}`);
      }
      if (successFileSizeCheck && uploadMaxCountCheck) {
        if (newFileList && newFileList.length) {
          if (newFileList.filter((info) => info.uid).length === newFileList.length) {
            handleUploadMulti(newFileList);
          }
        }
      }
      return false;
    },
  };

  const handleUploadMulti = async (newFileList) => {
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
          const searchInfo = { ...beforeList[searchIndex], ...info };
          // searchInfo.url = info.s3Path;
          searchInfo.url = `/api/v1/${import.meta.env.VITE_API_URL_FIEL_GROUPS}/file/${searchInfo.fileSeq}`;
          searchInfo.thumbUrl = `/api/v1/${import.meta.env.VITE_API_URL_FIEL_GROUPS}/file/${searchInfo.fileSeq}`;

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
    const fileGroupSeq = fileGroupSeqRef.current;
    const apiResult = await ApiService.get(`${import.meta.env.VITE_API_URL_FIEL_GROUPS}/${fileGroupSeq}`);
    const data = apiResult.data;
    const fileList = data.map((info) => {
      info.status = 'done';
      info.uid = info.fileSeq;
      info.name = info.origFilename;
      // info.url = info.s3Path;
      info.url = `/api/v1/${import.meta.env.VITE_API_URL_FIEL_GROUPS}/file/${info.fileSeq}`;
      info.thumbUrl = `/api/v1/${import.meta.env.VITE_API_URL_FIEL_GROUPS}/file/${info.fileSeq}`;
      return info;
    });
    setFileList(fileList);
    if (isRemoveAcation) {
      if (!fileList || !fileList.length) {
        fileGroupSeqRef.current = null;
        updateFileGroupSeq(null);
      }
    }
  };

  useEffect(() => {
    if (fileGroupSeq) {
      if (fileGroupSeqRef.current !== fileGroupSeq) {
        fileGroupSeqRef.current = fileGroupSeq;
        getFileList();
      }
    }
  }, [fileGroupSeq]);

  let isDragUpload = false;
  if (mode === 'edit') {
    if (onlyImageUpload || isDragType) {
      isDragUpload = true;
    }
  }

  return (
    <>
      <div
        className={errorMessage ? 'filebox error' : 'filebox'}
        id={id}
        style={{ display: mode === 'view' && !fileList.length ? 'none' : '' }}
      >
        {isDragUpload ? (
          <Dragger {...baseProps} fileList={fileList} disabled={disabled}>
            <p className="ant-upload-text ">+ 이 곳을 클릭하거나 마우스로 업로드할 파일을 끌어서 놓으세요.</p>
          </Dragger>
        ) : (
          <Upload {...baseProps} fileList={fileList} disabled={disabled}>
            <div className="btn-area" style={{ display: mode === 'edit' ? '' : 'none' }}>
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
      <CommonInputError errorMessage={errorMessage} label={label} />

      <div
        className={errorMessage ? 'filebox error' : 'filebox'}
        id={id}
        style={{ display: mode === 'view' && !fileList.length ? '' : 'none' }}
      >
        <div>첨부파일이 존재하지 않습니다</div>
        <label htmlFor="file" className="file-label">
          {label} {required ? <span className="required">*</span> : null}
        </label>
      </div>

      {previewImage && (
        <Image
          wrapperStyle={{
            display: 'none',
          }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(''),
          }}
          src={previewImage}
        />
      )}
    </>
  );
}

export default AppFileAttach;
