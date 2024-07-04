import withSourceView from '@/hooks/withSourceView';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import { Editor } from '@toast-ui/react-editor';
import tableMergedCell from '@toast-ui/editor-plugin-table-merged-cell';

function TemplateTestEdit() {
  return (
    <div>
      <p>editor test</p>
      <Editor
        hideModeSwitch={true}
        initialEditType="wysiwyg"
        previewStyle="vertical"
        // initialValue={initValue}
        height={'500px'}
        // onChange={() => {}}
        usageStatistics={false}
        plugins={[colorSyntax, tableMergedCell]}
        customHTMLSanitizer={(html) => {
          return html;
        }}
        viewer={true}
        autofocus={false}
        customHTMLRenderer={{
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
    </div>
  );
}

export default withSourceView(TemplateTestEdit);
