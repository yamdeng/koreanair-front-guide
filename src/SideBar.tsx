import update from 'immutability-helper';
import { useState } from 'react';

import logo from 'resources/images/logo.svg';
import PROFILE from 'resources/images/profile.jpeg';

function SideBar() {
  const [displaySideMenu, setDisplaySideMenu] = useState(true);
  const [menuList, setMenuList] = useState([]);

  const toggleSideMenu = () => {
    setDisplaySideMenu(!displaySideMenu);
  };

  const toggle1DepthMenu = (menuName) => {
    const searchIndex = menuList.findIndex((info) => info.name === menuName);
    if (searchIndex !== -1) {
      const selectMenuInfo = menuList[searchIndex];
      const newMenuList = update(menuList, {
        [searchIndex]: {
          isExpend: { $set: !selectMenuInfo.isExpend },
        },
      });
      setMenuList(newMenuList);
    }
  };

  const selectMenu = (menuInfo) => {
    const { routeUrl } = menuInfo;
    // TODO : goPage route url
  };

  const hideMenu = () => {
    setDisplaySideMenu(false);
  };

  return (
    <>
      <div className="top_menu_toggle">
        <button className="toggle_btn" onClick={toggleSideMenu}>
          <i className="fas fa-bars"></i>
        </button>
        <h1 className="">
          <img src={logo} alt="" />
        </h1>
        <div className="top_members_talk_wrap">
          <div className="arrs">
            <span className="arr_l"></span>
            <span className="arr_r"></span>
          </div>
          <div className="profile">
            <span className="img sm c_ml32">
              <i className="fas fa-user-circle" style={{ display: 'none' }}></i>
              <img src={PROFILE} alt="" />
            </span>
            <span className="txt c_ml8">
              <span>“오늘도 안전한 작업을 위해 작업 전 안전지침을 되새기고 작업에 임하겠습니다.”</span>
            </span>
          </div>
          <div className="member">
            <span className="">임꺽정 직원 / 대리 산업안전팀</span>
          </div>
        </div>
        <div className="mode_change">
          <div className="profile">
            <span className="txt">
              안용성님 환영합니다<span className="t">산업안전팀</span>
            </span>
            <span className="img">
              <i className="fas fa-user-circle" style={{ display: 'none' }}></i>
              <img src={PROFILE} alt="" />
            </span>
          </div>
          <input type="checkbox" id="switch" name="switch" className="input_on_off" />
        </div>
      </div>
      <div className={displaySideMenu ? 'menu_side' : 'menu_side hide'}>
        <div className="menu_area">
          <div className="menu_wrap">
            <ul className="dep_1">
              {menuList.map((firstDepthMenuInfo) => {
                const childs = firstDepthMenuInfo.childs || [];
                let childMenuComponent = null;
                if (childs.length) {
                  childMenuComponent = (
                    <ul className="dep_2">
                      {childs.map((childMenuInfo) => {
                        return (
                          <li key={childMenuInfo.name} className="" onClick={() => selectMenu(childMenuInfo)}>
                            <p>{childMenuInfo.name}</p>
                          </li>
                        );
                      })}
                    </ul>
                  );
                }
                return (
                  <li key={firstDepthMenuInfo.name} className={firstDepthMenuInfo.isExpend ? 'active' : ''}>
                    <p onClick={() => toggle1DepthMenu(firstDepthMenuInfo.name)}>
                      <span>
                        <span className="icon">
                          <span className={firstDepthMenuInfo.iconClass}></span>
                        </span>
                        {firstDepthMenuInfo.name}
                      </span>
                      {childs.length ? <span className="arr"></span> : null}
                    </p>
                    {childMenuComponent}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
      <span
        className={displaySideMenu ? 'menu_bg' : 'menu_bg active'}
        onClick={(event) => {
          event.stopPropagation();
          hideMenu();
        }}
      >
        &nbsp;
      </span>
    </>
  );
}

export default SideBar;
