import withSourceView from '@/hooks/withSourceView';
import { useNavigate } from 'react-router-dom';

/*

  route pathParam 사용 예시 : 상세, 폼의 url을 분류
   -폼의 신규와 수정은 :id를 'add'인지 아닌지 여부로 구분

*/
function RouterGuidePathParam() {
  const navigate = useNavigate();
  return (
    <>
      <div>
        <div>
          <button
            className="button"
            onClick={() => {
              navigate('/router/test/reports/1');
            }}
          >
            보고서 상세 1
          </button>
        </div>
        <div>
          <button
            className="button"
            onClick={() => {
              navigate('/router/test/reports/2');
            }}
          >
            보고서 상세 2
          </button>
        </div>
        <div>
          <button
            className="button"
            onClick={() => {
              navigate('/router/test/reports/add/form');
            }}
          >
            보고서 신규 폼
          </button>
        </div>
        <div>
          <button
            className="button"
            onClick={() => {
              navigate('/router/test/reports/1/form');
            }}
          >
            보고서 수정 폼
          </button>
        </div>
      </div>
    </>
  );
}

export default withSourceView(RouterGuidePathParam);
