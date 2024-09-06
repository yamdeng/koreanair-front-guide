import closeImage from '@/resources/images/close.svg';
import iconMenuFriesImage from '@/resources/images/icon-menu-fries.svg';
import iconAlarmImage from '@/resources/images/icon_alram.svg';
import iconSearchImage from '@/resources/images/icon_search.svg';
import iconSettingImage from '@/resources/images/icon_setting.svg';
import koreanairSymbolImage from '@/resources/images/koreanair-symbol.svg';
import useAppStore from '@/stores/useAppStore';
import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useStore } from 'zustand';

export default function AviationLayout() {
  const navigate = useNavigate();
  const [displayLeftMenu, setDisplayLeftMenu] = useState(true);
  const toggleLeftMenu = () => {
    setDisplayLeftMenu(!displayLeftMenu);
  };

  const {
    leftMenuList,
    toggleRootMenuExpand,
    clickSecondMenu,
    clickLastMenu,
    changeWorkScope,
    goHomePortal,
    changeLocale,
    logout,
  } = useStore(useAppStore, (state) => state) as any;

  useEffect(() => {
    changeWorkScope('A');
  }, []);

  return (
    <div className="wrap">
      <header className="header">
        <div className="logo">
          <div className="menu" onClick={toggleLeftMenu}>
            <a href="" onClick={(e) => e.preventDefault()}>
              <img src={iconMenuFriesImage} />
            </a>
          </div>
          <div className="top-logo">
            <a href="" onClick={(e) => e.preventDefault()}>
              <img src={koreanairSymbolImage} onClick={goHomePortal} />
              <span>항공안전</span>
            </a>
          </div>
        </div>

        {/* <div className="GNB">
          <ul className="gnb-list">
            {leftMenuList.map((rootMenuInfo) => {
              const { nameKor } = rootMenuInfo;
              return (
                <li
                  key={nameKor}
                  onClick={(event) => {
                    event.stopPropagation();
                    expandRootMenuInfo(rootMenuInfo);
                  }}
                >
                  <a href="" onClick={(e) => e.preventDefault()}>
                    {nameKor}
                  </a>
                </li>
              );
            })}
          </ul>
        </div> */}
        <div className="util">
          <ul className="util-list">
            <li className="util-icon">
              <ul>
                <li>
                  <a href="" onClick={(e) => e.preventDefault()}>
                    <img src={iconSearchImage} />
                  </a>
                </li>
                <li>
                  <a
                    href=""
                    onClick={(e) => {
                      e.preventDefault();
                      logout();
                    }}
                  >
                    <img src={iconAlarmImage} />
                  </a>
                </li>
                <li>
                  <a
                    href=""
                    onClick={(e) => {
                      e.preventDefault();
                      changeLocale('en');
                    }}
                  >
                    <img src={iconSettingImage} />
                  </a>
                </li>
              </ul>
            </li>
            <li className="btn">
              <a
                href=""
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/aviation');
                }}
              >
                <span className="active">항공안전</span>
              </a>
              <a
                href=""
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/occupation');
                }}
              >
                <span>산업안전</span>
              </a>
            </li>
          </ul>
        </div>
      </header>
      {/* LNB hide 처리 */}
      <div className={displayLeftMenu ? 'LNB' : 'LNB hide'}>
        <div className="LNB_menu">
          <div className="m-lnb_top_logo">
            <a href="" onClick={(e) => e.preventDefault()}>
              <img src={koreanairSymbolImage} />
              <span>항공안전</span>
            </a>
          </div>
          <div className="m-lnb_top_btn">
            <div className="tab_btn">
              <a href="" onClick={(e) => e.preventDefault()}>
                <span className="active">항공</span>
              </a>
              <a href="" onClick={(e) => e.preventDefault()}>
                <span>산업</span>
              </a>
            </div>
            <div className="close" onClick={toggleLeftMenu}>
              <a href="" onClick={(e) => e.preventDefault()}>
                <img src={closeImage} />
              </a>
            </div>
          </div>
        </div>
        <div className="LNB_side">
          <ul className="LNB_list">
            {leftMenuList.map((rootDepthMenuInfo) => {
              const { nameKor, menuId, isMenuExapand, children } = rootDepthMenuInfo;

              let childrenMenuComponent = null;
              if (children && children.length && isMenuExapand) {
                childrenMenuComponent = (
                  <ul className="mu-2depth">
                    {children.map((secondDepthMenuInfo) => {
                      const lastMenuChildren = secondDepthMenuInfo.children;
                      let lastChildrenMenuComponent = null;
                      if (lastMenuChildren && lastMenuChildren.length) {
                        lastChildrenMenuComponent = (
                          <ul className="mu-3depth">
                            {lastMenuChildren.map((lastDeptMenuInfo) => {
                              return (
                                <li
                                  key={lastDeptMenuInfo.menuId}
                                  className={lastDeptMenuInfo.isSelected ? 'active' : ''}
                                  onClick={(event) => {
                                    event.stopPropagation();
                                    clickLastMenu(lastDeptMenuInfo);
                                  }}
                                >
                                  <a href="" onClick={(e) => e.preventDefault()}>
                                    {lastDeptMenuInfo.nameKor}
                                  </a>
                                </li>
                              );
                            })}
                          </ul>
                        );
                      }

                      return (
                        <li
                          key={secondDepthMenuInfo.menuId}
                          className={secondDepthMenuInfo.isSelected ? 'active' : ''}
                          onClick={(event) => {
                            event.stopPropagation();
                            clickSecondMenu(secondDepthMenuInfo);
                          }}
                        >
                          <a href="" onClick={(e) => e.preventDefault()}>
                            {secondDepthMenuInfo.nameKor}
                          </a>
                          {lastChildrenMenuComponent}
                        </li>
                      );
                    })}
                  </ul>
                );
              }
              let rootDepthClass = '';
              if (rootDepthMenuInfo.children && rootDepthMenuInfo.children.length) {
                if (isMenuExapand) {
                  rootDepthClass = 'active down-icon';
                } else {
                  rootDepthClass = 'up-icon';
                }
              } else {
                if (rootDepthMenuInfo.isSelected) {
                  rootDepthClass = 'active';
                }
              }

              return (
                <li
                  key={menuId}
                  onClick={(event) => {
                    event.stopPropagation();
                    toggleRootMenuExpand(rootDepthMenuInfo);
                  }}
                >
                  <a href="" onClick={(e) => e.preventDefault()} className={rootDepthClass}>
                    {nameKor}
                  </a>
                  {childrenMenuComponent}
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="contents">
        <Outlet />
      </div>
    </div>
  );
}
