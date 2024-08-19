import { useRef, useEffect } from 'react';
import { Editor } from '@toast-ui/react-editor';
import CommonUtil from '@/utils/CommonUtil';
import CommonInputError from './CommonInputError';

function AppEditor(props) {
  const editorRef: any = useRef();

  const {
    name = '',
    height = '500px',
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
      />
      {/* <label className="f-label" htmlFor={id} style={{ display: label ? '' : 'none' }}>
        {label} {required ? <span className="required">*</span> : null}
      </label> */}
      <CommonInputError errorMessage={errorMessage} />
    </div>
  );
}

export default AppEditor;
