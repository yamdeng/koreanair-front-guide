const editor = new toastui.Editor({
  el: document.querySelector('#editor'),
  height: '400px',
  initialEditType: 'wysiwyg',
  previewStyle: 'vertical',
  customHtmlRenderer: {
    // 테이블 관련 태그들에 대한 커스텀 렌더링 설정
    table(node, { entering }) {
      if (entering) {
        return {
          type: 'openTag',
          tagName: 'table',
          outerNewLine: true,
          attributes: node.attrs, // 기존 속성을 유지
        };
      }
      return {
        type: 'closeTag',
        tagName: 'table',
        outerNewLine: true,
      };
    },
    thead(node, { entering }) {
      if (entering) {
        return {
          type: 'openTag',
          tagName: 'thead',
          outerNewLine: true,
        };
      }
      return {
        type: 'closeTag',
        tagName: 'thead',
        outerNewLine: true,
      };
    },
    tbody(node, { entering }) {
      if (entering) {
        return {
          type: 'openTag',
          tagName: 'tbody',
          outerNewLine: true,
        };
      }
      return {
        type: 'closeTag',
        tagName: 'tbody',
        outerNewLine: true,
      };
    },
    tr(node, { entering }) {
      if (entering) {
        return {
          type: 'openTag',
          tagName: 'tr',
          outerNewLine: true,
        };
      }
      return {
        type: 'closeTag',
        tagName: 'tr',
        outerNewLine: true,
      };
    },
    th(node, { entering }) {
      if (entering) {
        return {
          type: 'openTag',
          tagName: 'th',
          outerNewLine: false,
          attributes: node.attrs, // 기존 속성을 유지
        };
      }
      return {
        type: 'closeTag',
        tagName: 'th',
        outerNewLine: false,
      };
    },
    td(node, { entering }) {
      if (entering) {
        return {
          type: 'openTag',
          tagName: 'td',
          outerNewLine: false,
          attributes: node.attrs, // 기존 속성을 유지
        };
      }
      return {
        type: 'closeTag',
        tagName: 'td',
        outerNewLine: false,
      };
    },
  },
});
