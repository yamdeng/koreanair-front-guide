import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import CommonRouteTable from './CommonRouteTable';
import StorePageInfo from './config/StorePageInfo';
import TablePageInfo from './config/TablePageInfo';
import FormPageInfo from './config/FormPageInfo';
import RouterPageInfo from './config/RouterPageInfo';

function GuideHome() {
  const [menuName, setMenuName] = useState('store');
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
      moduleDirectoryPath="store/"
      pageList={StorePageInfo.list}
      keyword={keyword}
      checkedNewTab={checkedNewTab}
    />
  );
  if (menuName === 'store') {
    contentComponent = (
      <CommonRouteTable
        moduleDirectoryPath="store/"
        pageList={StorePageInfo.list}
        keyword={keyword}
        checkedNewTab={checkedNewTab}
      />
    );
  } else if (menuName === 'table') {
    contentComponent = (
      <CommonRouteTable
        moduleDirectoryPath="table/"
        pageList={TablePageInfo.list}
        keyword={keyword}
        checkedNewTab={checkedNewTab}
      />
    );
  } else if (menuName === 'form') {
    contentComponent = (
      <CommonRouteTable
        moduleDirectoryPath="form/"
        pageList={FormPageInfo.list}
        keyword={keyword}
        checkedNewTab={checkedNewTab}
      />
    );
  } else if (menuName === 'router') {
    contentComponent = (
      <CommonRouteTable
        moduleDirectoryPath="router/"
        pageList={RouterPageInfo.list}
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
      <div className="leftmenu">
        <a
          href={''}
          onClick={(event) => {
            event.preventDefault();
            changeLeftMenu('store');
          }}
        >
          Store
        </a>
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
            changeLeftMenu('form');
          }}
        >
          Form
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
        이름/파일명 : <input style={{ padding: 5 }} value={keyword} onChange={changeKeyword} /> 새탭{' '}
        <input type="checkbox" checked={checkedNewTab} onChange={changeNewTab} />
      </div>
      {contentComponent}
    </>
  );
}

export default GuideHome;
