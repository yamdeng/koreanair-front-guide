import useAppStore from '@/stores/useAppStore';
import { Outlet } from 'react-router-dom';
import { useStore } from 'zustand';

export default function AdminLayout() {
  const { leftMenuList, toggleRootMenuExpand, clickSecondMenu, clickLastMenu } = useStore(
    useAppStore,
    (state) => state
  ) as any;
  return (
    <div>
      {/* <AdminTopMenu /> */}
      {/* <AdminLeftMenu /> */}
      {/* <div>기본 공통 레이아웃</div> */}
      <div className="wrap">
        <div className="leftMenu">
          <div className="LNB_side">
            <ul className="LNB_list">
              {leftMenuList.map((rootDepthMenuInfo) => {
                const { treeType, level, nameKor, menuId, isMenuExapand, children } = rootDepthMenuInfo;

                console.log(treeType);
                console.log(level);

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
                                    <a href="javascript:void(0)">{lastDeptMenuInfo.nameKor}</a>
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
                            <a href="javascript:void(0)">{secondDepthMenuInfo.nameKor}</a>
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
                    <a href="javascript:void(0)" className={rootDepthClass}>
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
          <div className="Rightconts">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
