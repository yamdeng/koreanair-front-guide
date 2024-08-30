import AppNavigation from '../common/AppNavigation';
import Config from '@/config/Config';

// 아래 hook import
import useAuthCheck from '@/hooks/useAuthCheck';

function GuideAuth() {
  // 개별적으로 select 해서 사용
  const isAuth = useAuthCheck('GROUP_AVN_DEV_ALL', false);
  const isAuth2 = useAuthCheck('SYSTEM_ADMIN', true);

  return (
    <>
      <AppNavigation />
      <div className="conts-title">
        <h2>
          권한 사용법(useAuthCheck hook) :{' '}
          <a style={{ fontSize: 20 }} href={Config.hrefBasePath + `GuideAuth.tsx`}>
            GuideAuth
          </a>
        </h2>
      </div>
      <p>isAuth : {isAuth ? '권한O' : '권한 X'}</p>
      <p>isAuth2 : {isAuth2 ? '권한O' : '권한 X'}</p>
    </>
  );
}
export default GuideAuth;
