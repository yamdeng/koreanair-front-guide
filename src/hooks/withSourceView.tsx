import { useState } from 'react';
import Config from '@/config/Config';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { darcula, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

function withSourceView(WrappedComponent) {
  return function ParentComponent(props) {
    const sourceTheme = localStorage.getItem('sourceTheme') || 'dark';
    console.log(`sourceTheme : ${sourceTheme}`);
    const { menuInfo } = props;
    const [viewSource, setViewSource] = useState(false);
    const [viewSourceTheme, setViewSourceTheme] = useState(sourceTheme);

    const changeViewSource = (event) => {
      const checked = event.target.checked;
      setViewSource(checked);
    };

    const changeSourceTheme = (event) => {
      const value = event.target.value;
      setViewSourceTheme(value);
      localStorage.setItem('sourceTheme', value);
    };

    const hrefString = Config.hrefBasePath + menuInfo.moduleDirectory + '/' + menuInfo.path + Config.reactFileExtension;

    let urlDescriptionComponent = null;
    if (menuInfo.url) {
      urlDescriptionComponent = (
        <>
          <br />
          참고 URL: <a href={menuInfo.url}>{menuInfo.url}</a>
        </>
      );
    }

    return (
      <div style={{ marginRight: viewSource ? '50%' : 0 }}>
        <div className="guide-detail-top-common">
          <a href={hrefString}>{menuInfo.title}</a>{' '}
          <input type="checkbox" checked={viewSource} onChange={changeViewSource} /> 소스보기{' '}
          <select
            name="source-view-theme"
            value={viewSourceTheme}
            onChange={(e) => changeSourceTheme(e)}
            style={{
              padding: 3,
            }}
          >
            <option value="dark">dark</option>
            <option value="light">light</option>
          </select>{' '}
          {urlDescriptionComponent}
        </div>
        <div className="source-raw-view" style={{ width: viewSource ? '50%' : 0 }}>
          <SyntaxHighlighter
            language="javascript"
            style={viewSourceTheme === 'dark' ? darcula : oneLight}
            showLineNumbers
            wrapLongLines
          >
            {menuInfo.fileRawString}
          </SyntaxHighlighter>
        </div>
        <WrappedComponent {...props} />
      </div>
    );
  };
}

// function withSourceView(WrappedComponent) {
//   return function ParentComponent(props) {
//     return <WrappedComponent {...props} />;
//   };
// }

export default withSourceView;
