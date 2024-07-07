import withSourceView from '@/hooks/withSourceView';
import { useNavigate } from 'react-router-dom';

/*

  중첩 라우팅 예시 : RouteTestReportProcess.tsx 참고

*/
function RouterGuideNestedRouting() {
  const navigate = useNavigate();
  return (
    <>
      <div>
        <div>
          <button
            className="button"
            onClick={() => {
              navigate('/router/test/reports/process');
            }}
          >
            보고서 프로세스(중첩라우팅)
          </button>
        </div>
      </div>
    </>
  );
}

export default withSourceView(RouterGuideNestedRouting);
