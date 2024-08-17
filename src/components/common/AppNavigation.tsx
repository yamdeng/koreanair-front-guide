import { useState, useEffect } from 'react';
import { useStore } from 'zustand';
import useAppStore from '@/stores/useAppStore';
import { useLocation, useNavigate } from 'react-router-dom';

function AppNavigation() {
  const { appWorkScope, navationMenuList } = useStore(useAppStore, (state) => state) as any;
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
    if (navationMenuList && navationMenuList.length) {
      if (appWorkScope === navationMenuList[0].workScope) {
        const searchMenuInfo = navationMenuList.find((info) => {
          if (info.menuUrl && currentUrlPath.indexOf(info.menuUrl) !== -1) {
            return true;
          }
          return false;
        });
        setCurretMenuInfo(searchMenuInfo);
        // TODO : menuUrl이 존재하지 않으면 권한이 존재하지 않는다는 페이지로 팅김
        // TODO : setCurretMenuInfo 하는 순간에 menuId 던져줌
      }
    }
  }, [navationMenuList, location, appWorkScope]);

  let menuParentList = [];
  if (curretMenuInfo) {
    menuParentList = curretMenuInfo.parentList;
  }

  let naviationComponent = (
    <ol>
      <li className="breadcrumb-item">
        <a href="javascript:void(0);">홈</a>
      </li>
    </ol>
  );
  if (curretMenuInfo) {
    naviationComponent = (
      <ol>
        <li className="breadcrumb-item" onClick={goHome}>
          <a href="javascript:void(0);">홈</a>
        </li>
        {menuParentList.map((parentMenuInfo) => {
          const { nameKor } = parentMenuInfo;
          return (
            <li key={nameKor} className="breadcrumb-item">
              <a href="javascript:void(0);">{nameKor}</a>
            </li>
          );
        })}
        <li className="breadcrumb-item">
          <a href="javascript:void(0);">{curretMenuInfo.nameKor}</a>
        </li>
      </ol>
    );
  }

  return <div className="Breadcrumb">{naviationComponent}</div>;
}

export default AppNavigation;
