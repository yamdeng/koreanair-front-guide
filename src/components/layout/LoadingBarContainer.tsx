import useUIStore from '@/stores/useUIStore';
import { useStore } from 'zustand';

function LoadingBarContainer() {
  const displayLoadingBar = useStore(useUIStore, (state) => state.displayLoadingBar);
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
