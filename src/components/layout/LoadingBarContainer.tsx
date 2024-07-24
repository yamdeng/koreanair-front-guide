import useAdminAppStore from '@/stores/admin/useAdminAppStore';
import { useStore } from 'zustand';

function LoadingBarContainer() {
  const { displayLoadingBar } = useStore(useAdminAppStore, (state) => state) as any;
  return (
    <div id="loading-bar-container" style={{ display: displayLoadingBar ? '' : 'none' }}>
      <div className="loading-bar">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default LoadingBarContainer;
