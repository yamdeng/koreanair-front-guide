import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import CommonRouteTable from './CommonRouteTable';
import ZustandPageInfo from './config/ZustandPageInfo';
import TablePageInfo from './config/TablePageInfo';
import FormPageInfo from './config/FormPageInfo';
import RouterPageInfo from './config/RouterPageInfo';
import TemplatePageInfo from './config/TemplatePageInfo';
import UtilPageInfo from './config/UtilPageInfo';
import ModalPageInfo from './config/ModalPageInfo';
import CommonComponentPageInfo from './config/CommonComponentPageInfo';

function GuideHome() {
  const [menuName, setMenuName] = useState('zustand');
  const [keyword, setKeyword] = useState('');
  const [checkedNewTab, setCheckedNewTab] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const changeLeftMenu = (menuName) => {
    setMenuName(menuName);
    setKeyword('');
    navigate(`/?menuName=${menuName}`, { replace: true });
  };

  let contentComponent = (
    <CommonRouteTable
      moduleDirectoryPath="zustand/"
      pageList={ZustandPageInfo.list}
      keyword={keyword}
      checkedNewTab={checkedNewTab}
    />
  );
  if (menuName === 'zustand') {
    contentComponent = (
      <CommonRouteTable
        moduleDirectoryPath="zustand/"
        pageList={ZustandPageInfo.list.filter((info) => !info.exclude)}
        keyword={keyword}
        checkedNewTab={checkedNewTab}
      />
    );
  } else if (menuName === 'table') {
    contentComponent = (
      <CommonRouteTable
        moduleDirectoryPath="table/"
        pageList={TablePageInfo.list.filter((info) => !info.exclude)}
        keyword={keyword}
        checkedNewTab={checkedNewTab}
      />
    );
  } else if (menuName === 'form') {
    contentComponent = (
      <CommonRouteTable
        moduleDirectoryPath="form/"
        pageList={FormPageInfo.list.filter((info) => !info.exclude)}
        keyword={keyword}
        checkedNewTab={checkedNewTab}
      />
    );
  } else if (menuName === 'router') {
    contentComponent = (
      <CommonRouteTable
        moduleDirectoryPath="router/"
        pageList={RouterPageInfo.list.filter((info) => !info.exclude)}
        keyword={keyword}
        checkedNewTab={checkedNewTab}
      />
    );
  } else if (menuName === 'template') {
    contentComponent = (
      <CommonRouteTable
        moduleDirectoryPath="template/"
        pageList={TemplatePageInfo.list.filter((info) => !info.exclude)}
        keyword={keyword}
        checkedNewTab={checkedNewTab}
      />
    );
  } else if (menuName === 'util') {
    contentComponent = (
      <CommonRouteTable
        moduleDirectoryPath="util/"
        pageList={UtilPageInfo.list.filter((info) => !info.exclude)}
        keyword={keyword}
        checkedNewTab={checkedNewTab}
      />
    );
  } else if (menuName === 'modal') {
    contentComponent = (
      <CommonRouteTable
        moduleDirectoryPath="modal/"
        pageList={ModalPageInfo.list.filter((info) => !info.exclude)}
        keyword={keyword}
        checkedNewTab={checkedNewTab}
      />
    );
  } else if (menuName === 'component') {
    contentComponent = (
      <CommonRouteTable
        moduleDirectoryPath="component/"
        pageList={CommonComponentPageInfo.list.filter((info) => !info.exclude)}
        keyword={keyword}
        checkedNewTab={checkedNewTab}
      />
    );
  }

  const changeKeyword = (event) => {
    const value = event.target.value;
    setKeyword(value);
  };

  const changeNewTab = (event) => {
    const checked = event.target.checked;
    setCheckedNewTab(checked);
  };

  useEffect(() => {
    const menuName = searchParams.get('menuName');
    if (menuName) {
      setMenuName(menuName);
    }
  }, []);

  return (
    <>
      <div className="publish-app leftmenu">
        <a
          href={''}
          onClick={(event) => {
            event.preventDefault();
            changeLeftMenu('table');
          }}
        >
          Table
        </a>
        <a
          href={''}
          onClick={(event) => {
            event.preventDefault();
            changeLeftMenu('util');
          }}
        >
          Util
        </a>
        <a
          href={''}
          onClick={(event) => {
            event.preventDefault();
            changeLeftMenu('zustand');
          }}
        >
          Zustand
        </a>
        <a
          href={''}
          onClick={(event) => {
            event.preventDefault();
            changeLeftMenu('router');
          }}
        >
          Router
        </a>
      </div>
      <div style={{ padding: 10, marginBottom: 10, marginLeft: 216 }}>
        이름/파일명 :{' '}
        <input style={{ padding: 5, border: '1px solid black' }} value={keyword} onChange={changeKeyword} /> 새탭{' '}
        <input type="checkbox" checked={checkedNewTab} onChange={changeNewTab} />
      </div>
      {contentComponent}
    </>
  );
}

export default GuideHome;
