import appStore from '@/stores/appStore';
import { useStore } from 'zustand';

function LoadingBarContainer() {
  const { displayLoadingBar } = useStore(appStore, (state) => state) as any;
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
