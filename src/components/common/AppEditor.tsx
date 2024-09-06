import { useRef, useEffect, useCallback } from 'react';
import { Editor } from '@toast-ui/react-editor';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import CommonUtil from '@/utils/CommonUtil';
import CommonInputError from './CommonInputError';
import Config from '@/config/Config';
import ModalService from '@/services/ModalService';
import ApiService from '@/services/ApiService';

function AppEditor(props) {
  const editorRef: any = useRef();

  const {
    name = '',
    height = '300px',
    id = CommonUtil.getUUID(),
    label,
    value,
    onChange,
    placeholder = '',
    required = false,
    errorMessage,
  } = props;

  const handleChange = () => {
    // Editor 내용이 변경되었을 때 onChange 호출
    const editorInstance = editorRef.current.getInstance();
    const htmlValue = editorInstance.getHTML();
    onChange(htmlValue);
  };

  const validateFileSize = useCallback((fileObject) => {
    const fileSize = fileObject.size;
    if (fileSize > Config.maxEditorImageFileUploadSize) {
      ModalService.alert({
        body: '업로드 가능한 파일사이즈는 5MB 입니다',
      });
      return false;
    }
    return true;
  }, []);

  const fileUpload = async (fileObject, uploadCallback) => {
    if (validateFileSize(fileObject)) {
      const fileFormData = new FormData();
      fileFormData.append('files', fileObject);
      const apiResult = await ApiService.fileUpload(fileFormData, { workScope: 'S' });
      uploadCallback(apiResult);
    }
  };

  const onAddImageBlob = useCallback((file, callback) => {
    fileUpload(file, (apiResult) => {
      const data = apiResult.data;
      const { fileList } = data;
      const fileSeq = fileList[0].fileSeq;
      const imageUrl = `${import.meta.env.VITE_API_URL}/api/v1/${import.meta.env.VITE_API_URL_FIEL_GROUPS}/file/${fileSeq}`;
      callback(imageUrl, 'editer-image');
    });
  }, []);

  useEffect(() => {
    if (editorRef && editorRef.current) {
      const editorInstance = editorRef.current.getInstance();
      if (editorInstance.getHTML() !== value) {
        editorInstance.setHTML(value);
      }
    }
  }, [value]);

  return (
    <div className={errorMessage ? 'editor-in-valid' : ''}>
      <Editor
        ref={editorRef}
        id={id}
        label={label}
        name={name}
        required={required}
        placeholder={placeholder}
        hideModeSwitch={true}
        initialEditType="wysiwyg"
        previewStyle="vertical"
        height={height}
        initialValue={value}
        useCommandShortcut={true}
        onChange={handleChange}
        usageStatistics={false}
        customHTMLSanitizer2={(html) => {
          return html;
        }}
        viewer={true}
        autofocus={false}
        customHTMLRenderer2={{
          htmlBlock: {
            table(node) {
              return [
                { type: 'openTag', tagName: 'table', outerNewLine: true, attributes: node.attrs },
                { type: 'html', content: node.childrenHTML },
                { type: 'closeTag', tagName: 'table', outerNewLine: true },
              ];
            },
          },
        }}
        hooks={{
          addImageBlobHook: onAddImageBlob,
        }}
        plugins={[colorSyntax]}
      />
      {/* <label className="f-label" htmlFor={id} style={{ display: label ? '' : 'none' }}>
        {label} {required ? <span className="required">*</span> : null}
      </label> */}
      <CommonInputError errorMessage={errorMessage} label={label} />
    </div>
  );
}

export default AppEditor;
