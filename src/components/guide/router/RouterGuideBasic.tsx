import withSourceView from '@/hooks/withSourceView';
import { useNavigate, Link } from 'react-router-dom';
import { movePage } from '@/utils/TestUtil';

/*

  route 기본 사용 방법 : 절대 경로를 path로 전달(중첩라우팅 외에는 모두 절대 경로를 path로 전달)

  1.onClick event로 처리 : 권장하는 방법
    onClick={() => {
      navigate('/router/test/reports');
    }}

  2.<Link /> tag 사용

  3.리액트 파일이 아닌 장소에서 네비게이션 사용

*/
function RouterGuideBasic() {
  const navigate = useNavigate();
  return (
    <>
      <div>
        <div>
          <button
            className="button"
            onClick={() => {
              navigate('/router/test/reports');
            }}
          >
            보고서 목록
          </button>
        </div>
        <p>
          <Link to={'/router/test/reports'}>보고서 목록 Link tag</Link>
        </p>
        <p>
          <a href="/router/test/reports"> 보고서 목록 a tag</a>
        </p>
        <p>
          <button
            className="button"
            onClick={() => {
              movePage('/router/test/reports');
            }}
          >
            history를 이용한 movePage
          </button>
        </p>
      </div>
    </>
  );
}

export default withSourceView(RouterGuideBasic);
