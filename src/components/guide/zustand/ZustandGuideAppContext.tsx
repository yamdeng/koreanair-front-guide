import withSourceView from '@/hooks/withSourceView';
import { useAppStore } from '@/context/StoreContext';

function ZustandGuideAppContext() {
  const { displayExpandMenu, toggleLeftMenu, profile } = useAppStore((state) => state) as any;

  return (
    <div>
      <p>displayExpandMenu:{displayExpandMenu + ''}</p>
      <br />
      <p>{profile ? JSON.stringify(profile) : 'no login'}</p>
      <p>
        <button className="button" onClick={toggleLeftMenu}>
          toggleLeftMenu
        </button>
      </p>
    </div>
  );
}

export default withSourceView(ZustandGuideAppContext);
