import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import iconMenuFriesImage from '@/resources/images/icon-menu-fries.svg';
import koreanairSymbolImage from '@/resources/images/koreanair-symbol.svg';
import iconSearchImage from '@/resources/images/icon_search.svg';
import iconAlarmImage from '@/resources/images/icon_alram.svg';
import iconSettingImage from '@/resources/images/icon_setting.svg';
import closeImage from '@/resources/images/close.svg';

export default function OccupationLayout() {
  const [displayLeftMenu, setDisplayLeftMenu] = useState(true);
  const toggleLeftMenu = () => {
    setDisplayLeftMenu(!displayLeftMenu);
  };

  return (
    <div className="wrap">
      <header className="header">
        <div className="logo">
          <div className="menu" onClick={toggleLeftMenu}>
            <a href="javascript:void(0);">
              <img src={iconMenuFriesImage} />
            </a>
          </div>
          <div className="top-logo">
            <a href="javascript:void(0);">
              <img src={koreanairSymbolImage} />
              <span>항공안전</span>
            </a>
          </div>
        </div>

        <div className="GNB">
          <ul className="gnb-list">
            <li>
              <a className="active" href="javascript:void(0);">
                Report
              </a>
            </li>
            <li>
              <a href="javascript:void(0);">Policy</a>
            </li>
            <li>
              <a href="javascript:void(0);">SRM</a>
            </li>
            <li>
              <a href="javascript:void(0);">Assurance</a>
            </li>
            <li>
              <a href="javascript:void(0);">Promotion</a>
            </li>
            <li>
              <a href="javascript:void(0);">AUDIT</a>
            </li>
            <li>
              <a href="javascript:void(0);">Admin</a>
            </li>
          </ul>
        </div>
        <div className="util">
          <ul className="util-list">
            <li className="util-icon">
              <ul>
                <li>
                  <a href="javascript:void(0);">
                    <img src={iconSearchImage} />
                  </a>
                </li>
                <li>
                  <a href="javascript:void(0);">
                    <img src={iconAlarmImage} />
                  </a>
                </li>
                <li>
                  <a href="javascript:void(0);">
                    <img src={iconSettingImage} />
                  </a>
                </li>
              </ul>
            </li>
            <li className="btn">
              <a href="javascript:void(0);">
                <span className="active">항공안전</span>
              </a>
              <a href="javascript:void(0);">
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
            <a href="javascript:void(0);">
              <img src={koreanairSymbolImage} />
              <span>항공안전</span>
            </a>
          </div>
          <div className="m-lnb_top_btn">
            <div className="tab_btn">
              <a href="javascript:void(0);">
                <span className="active">항공</span>
              </a>
              <a href="javascript:void(0);">
                <span>산업</span>
              </a>
            </div>
            <div className="close">
              <a href="javascript:void(0);">
                <img src={closeImage} />
              </a>
            </div>
          </div>
        </div>
        <div className="LNB_side">
          <ul className="LNB_list">
            <li>
              <a className="active" href="javascript:void(0);">
                안전보고서
              </a>
              <ul className="mu-2depth">
                <li className="active">
                  <a href="javascript:void(0);">My Report</a>
                  <ul className="mu-3depth">
                    <li className="active">
                      <a href="javascript:void(0);">3depth</a>
                    </li>
                    <li>
                      <a href="javascript:void(0);">3depth</a>
                    </li>
                    <li>
                      <a href="javascript:void(0);">3depth</a>
                    </li>
                    <li>
                      <a href="javascript:void(0);">3depth</a>
                    </li>
                    <li>
                      <a href="javascript:void(0);">3depth</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="javascript:void(0);">Report List</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="javascript:void(0);">안전정책</a>
            </li>
            <li>
              <a href="javascript:void(0);">안전위험관리</a>
            </li>
            <li>
              <a href="javascript:void(0);">안전보증</a>
            </li>
            <li>
              <a href="javascript:void(0);">안전증진</a>
            </li>
            <li>
              <a href="javascript:void(0);">AUDIT</a>
            </li>

            <li>
              <a href="javascript:void(0);">AUDIT</a>
            </li>
            <li>
              <a href="javascript:void(0);">AUDIT</a>
            </li>
            <li>
              <a href="javascript:void(0);">AUDIT</a>
            </li>
            <li>
              <a href="javascript:void(0);">AUDIT</a>
            </li>
            <li>
              <a href="javascript:void(0);">AUDIT</a>
            </li>
            <li>
              <a href="javascript:void(0);">AUDIT</a>
            </li>
            <li>
              <a href="javascript:void(0);">AUDIT</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="contents">
        <Outlet />
      </div>
    </div>
  );
}
