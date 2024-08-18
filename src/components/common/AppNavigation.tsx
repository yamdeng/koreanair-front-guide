import { useState, useEffect, useRef } from 'react';
import { useStore } from 'zustand';
import useAppStore from '@/stores/useAppStore';
import { useLocation, useNavigate } from 'react-router-dom';

function AppNavigation() {
  const { appWorkScope, toggleRootMenuExpand, clickSecondMenu, clickLastMenu, navationMenuList } = useStore(
    useAppStore,
    (state) => state
  ) as any;
  const searchInfoCheckedRef = useRef(null);
  const [curretMenuInfo, setCurretMenuInfo] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const currentUrlPath = location.pathname;

  const goHome = () => {
    if (appWorkScope === 'A') {
      navigate('/aviation');
    } else if (appWorkScope === 'O') {
      navigate('/occupation');
    }
  };

  useEffect(() => {
    if (!searchInfoCheckedRef.current && navationMenuList && navationMenuList.length) {
      if (appWorkScope === navationMenuList[0].workScope) {
        const searchMenuInfo = navationMenuList.find((info) => {
          const { menuUrl } = info;
          // if (menuUrl && currentUrlPath.indexOf(menuUrl) !== -1) {
          if (menuUrl && menuUrl.indexOf(currentUrlPath) !== -1) {
            return true;
          }
          return false;
        });
        if (searchMenuInfo) {
          searchInfoCheckedRef.current = searchMenuInfo;
          if (searchMenuInfo.level === 1) {
            toggleRootMenuExpand(searchMenuInfo);
          } else if (searchMenuInfo.level === 2) {
            clickSecondMenu(searchMenuInfo);
          } else if (searchMenuInfo.level === 3) {
            clickLastMenu(searchMenuInfo);
          }
          setCurretMenuInfo(searchMenuInfo);
        }

        // TODO : menuUrl이 존재하지 않으면 권한이 존재하지 않는다는 페이지로 팅김
        // TODO : setCurretMenuInfo 하는 순간에 menuId 던져줌
      }
    }
  }, [navationMenuList, location, appWorkScope]);

  let menuParentList = [];
  if (curretMenuInfo && curretMenuInfo.parentList) {
    menuParentList = curretMenuInfo.parentList;
  }

  let naviationComponent = (
    <ol>
      <li className="breadcrumb-item">
        <a href={undefined}>홈</a>
      </li>
    </ol>
  );
  if (curretMenuInfo) {
    naviationComponent = (
      <ol>
        <li className="breadcrumb-item" onClick={goHome}>
          <a href={undefined}>홈</a>
        </li>
        {menuParentList.map((parentMenuInfo) => {
          const { nameKor } = parentMenuInfo;
          return (
            <li key={nameKor} className="breadcrumb-item">
              <a href={undefined}>{nameKor}</a>
            </li>
          );
        })}
        <li className="breadcrumb-item">
          <a href={undefined}>{curretMenuInfo.nameKor}</a>
        </li>
      </ol>
    );
  }

  return <div className="Breadcrumb">{naviationComponent}</div>;
}

export default AppNavigation;
