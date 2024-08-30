import AppNavigation from '../common/AppNavigation';
import Config from '@/config/Config';
import { useNavigate } from 'react-router-dom';
import history from '@/utils/history';
import CommonUtil from '@/utils/CommonUtil';

function GuideRoute() {
  const navigate = useNavigate();
  const changeParameter = () => {
    const queryString = CommonUtil.objectToQueryString({ division: '10' });
    history.replace({
      pathname: history.location.pathname,
      search: queryString,
    });
  };

  return (
    <>
      <AppNavigation />
      <div className="conts-title">
        <h2>
          Route 가이드 :{' '}
          <a style={{ fontSize: 20 }} href={Config.hrefBasePath + `GuideRoute.tsx`}>
            GuideRoute
          </a>
        </h2>
      </div>
      <div className="editbox">
        <div className="btn-area">
          <button
            type="button"
            name="button"
            className="btn-sm btn_text btn-darkblue-line"
            onClick={() => navigate('/aviation/guides/route/28753')}
          >
            1.detailId만 다른 경우 라우팅 이동시 rerender하는 방법
          </button>
          <button
            type="button"
            name="button"
            className="btn-sm btn_text btn-darkblue-line"
            onClick={() => changeParameter()}
          >
            2.parmeter 만 변경하는 방법
          </button>
        </div>
      </div>
    </>
  );
}
export default GuideRoute;
