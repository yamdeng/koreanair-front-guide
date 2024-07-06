import { useEffect } from 'react';
import { useStore } from 'zustand';
import withSourceView from '@/hooks/withSourceView';
import appStore from '@/stores/appStore';

function ZustandGuideAppStore() {
  const { displayExpandMenu, getProfile, profile } = useStore(appStore, (state) => state) as any;

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div>
      <p>displayExpandMenu:{displayExpandMenu + ''}</p>
      <br />
      <p>{profile ? JSON.stringify(profile) : 'no login'}</p>
    </div>
  );
}

export default withSourceView(ZustandGuideAppStore);
