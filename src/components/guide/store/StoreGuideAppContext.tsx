import { useAppStore } from '@/context/StoreContext';
import withSourceView from '@/hooks/withSourceView';

function StoreGuideAppStore() {
  const { displayExpandMenu, toggleLeftMenu, profile } = useAppStore((state) => state) as any;

  return (
    <div>
      <p>displayExpandMenu:{displayExpandMenu + ''}</p>
      <br />
      <p>{profile ? JSON.stringify(profile) : 'no login'}</p>
      <button onClick={toggleLeftMenu}>toggleLeftMenu</button>
    </div>
  );
}

export default withSourceView(StoreGuideAppStore);
