import { Editor } from '@toast-ui/react-editor';
import CommonUtil from '@/utils/CommonUtil';

function AppEditor(props) {
  const {
    name = '',
    id = CommonUtil.getUUID(),
    label,
    value,
    onChange,
    placeholder = '',
    required = false,
    errorMessage,
  } = props;
  return (
    <div className={errorMessage ? 'editor-in-valid' : ''}>
      <Editor
        name={name}
        placeholder={placeholder}
        hideModeSwitch={true}
        initialEditType="wysiwyg"
        previewStyle="vertical"
        height={'500px'}
        value={value}
        onChange={onChange}
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
      <span className="errorText" style={{ display: errorMessage ? '' : 'none' }}>
        {errorMessage}
      </span>
    </div>
  );
}

export default AppEditor;
