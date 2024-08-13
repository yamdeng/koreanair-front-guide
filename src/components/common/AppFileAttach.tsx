import CommonUtil from '@/utils/CommonUtil';
import { Upload } from 'antd';
const { Dragger } = Upload;

// http://localhost:8082/guides/file
// api/v1/sys/file-groups/file/upload?workScope=S

const baseProps: any = {
  name: 'file',
  multiple: true,
  action: 'http://ksms-local.koreanair.com:8084/api/v1/sys/file-groups/file/upload',
  data: { workScope: 'S' },

  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      // alert(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      // alert(`${info.file.name} file upload failed.`);
    }
  },

  onRemove(file) {
    return false;
  },

  onPreview(file) {
    // debugger;
    return false;
  },

  onChange(aaa, bbb) {
    // debugger;
  },

  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files);
  },
};

function AppFileAttach(props) {
  const {
    id = CommonUtil.getUUID(),
    label,
    required,
    errorMessage,
    isDragType = false,
    fileGroupSeq,
    workScope,
    updateFileGroupSeq,
    updateFileList,
  } = props;

  return (
    <>
      <div className={errorMessage ? 'filebox error' : 'filebox'} id={id}>
        {isDragType ? (
          <Dragger {...baseProps}>
            <p className="ant-upload-text ">+ 이 곳을 클릭하거나 마우스로 업로드할 파일을 끌어서 놓으세요.</p>
          </Dragger>
        ) : (
          <Upload {...baseProps}>
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
