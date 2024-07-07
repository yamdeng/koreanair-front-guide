import withSourceView from '@/hooks/withSourceView';
import { useNavigate, Link } from 'react-router-dom';

/*

  route queryString 사용 예시 : RouteTestReportList.tsx 파일 참고

*/
function RouterGuideQueryString() {
  const navigate = useNavigate();
  return (
    <>
      <div>
        <div>
          <button
            className="button"
            onClick={() => {
              navigate('/router/test/reports?currentPage=1&pageSize=10');
            }}
          >
            보고서 목록 : query string
          </button>
        </div>
        <p>
          <Link to={'/router/test/reports?currentPage=2&pageSize=20'}>보고서 목록 Link tag : query string</Link>
        </p>
      </div>
    </>
  );
}

export default withSourceView(RouterGuideQueryString);
