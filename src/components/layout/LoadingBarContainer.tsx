import useAppStore from '@/stores/useAppStore';
import { useStore } from 'zustand';

function LoadingBarContainer() {
  const { displayLoadingBar } = useStore(useAppStore, (state) => state) as any;
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
