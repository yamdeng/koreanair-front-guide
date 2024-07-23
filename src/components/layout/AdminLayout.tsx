import { Outlet } from 'react-router-dom';

export default function AdminLayout() {
  return (
    <div>
      {/* <AdminTopMenu /> */}
      {/* <AdminLeftMenu /> */}
      {/* <div>기본 공통 레이아웃</div> */}
      <div className="wrap">
        <div className="leftMenu">
          <div className="LNB_side">
            <ul className="LNB_list">
              <li>
                <a href="#">안전보고서</a>
                {/* ul className="mu-2depth">
                  <li className="active">
                    <a href="">My Report</a>
                    <ul className="mu-3depth">
                      <li className="active">
                        <a href="">3depth</a>
                      </li>
                      <li>
                        <a href="">3depth</a>
                      </li>
                      <li>
                        <a href="">3depth</a>
                      </li>
                      <li>
                        <a href="">3depth</a>
                      </li>
                      <li>
                        <a href="">3depth</a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href="#">Report List</a>
                  </li>
                </ul*/}
              </li>
              <li>
                <a href="">안전정책</a>
              </li>
              <li>
                <a href="">안전위험관리</a>
              </li>
              <li>
                <a href="">안전보증</a>
              </li>
              <li>
                <a href="">안전증진</a>
              </li>
              <li>
                <a href="">AUDIT</a>
              </li>
              <li>
                <a href="#" className="active">
                  관리자
                </a>
                <ul className="mu-2depth">
                  <li className="">
                    <a href="">HAZARD 관리</a>
                    {/* ul className="mu-3depth">
                      <li className="active">
                        <a href="">Taxonomy</a>
                      </li>
                      <li>
                        <a href="">Potential Consequence</a>
                      </li>
                    </ul*/}
                  </li>
                  <li>
                    <a href="#">EVENT TYPE 관리</a>
                  </li>
                  <li>
                    <a href="#">RISK MATRIX 관리</a>
                  </li>
                  <li className="active">
                    <a href="#">RSR 관리</a>
                    <ul className="mu-3depth">
                      <li className="active">
                        <a href="">장비코드 관리</a>
                      </li>
                      <li>
                        <a href="">장비점검 관리</a>
                      </li>
                      <li>
                        <a href="">입력항목 관리</a>
                      </li>
                      <li>
                        <a href="">대시보드 관리</a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
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
