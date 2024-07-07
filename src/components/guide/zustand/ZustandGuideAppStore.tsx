import withSourceView from '@/hooks/withSourceView';
import appStore from '@/stores/appStore';
import { useStore } from 'zustand';

function ZustandGuideAppStore() {
  const { displayExpandMenu, getProfile, profile } = useStore(appStore, (state) => state) as any;

  return (
    <div>
      <p>displayExpandMenu:{displayExpandMenu + ''}</p>
      <br />
      <p>{profile ? JSON.stringify(profile) : 'no login'}</p>
      <p>
        <button className="button" onClick={getProfile}>
          getProfile
        </button>
      </p>
    </div>
  );
}

export default withSourceView(ZustandGuideAppStore);
