import Config from '@/config/Config';
import AppNavigation from '../common/AppNavigation';
// 아래 2개의 file import
import { useStore } from 'zustand';
import useAppStore from '@/stores/useAppStore';

function GuideProfile() {
  // 개별적으로 select 해서 사용
  const profile = useStore(useAppStore, (state) => state.profile);
  const currentLocale = useStore(useAppStore, (state) => state.currentLocale);

  return (
    <>
      <AppNavigation />
      <div className="conts-title">
        <h2>
          profile, useAppStore 사용법 :{' '}
          <a style={{ fontSize: 20 }} href={Config.hrefBasePath + `GuideProfile.tsx`}>
            GuideProfile
          </a>
        </h2>
      </div>
      <div className="editbox">
        <p>currentLocale : {currentLocale}</p>
        <p>profile : {JSON.stringify(profile)}</p>
      </div>
    </>
  );
}
export default GuideProfile;
