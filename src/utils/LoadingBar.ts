import useUIStore from '@/stores/useUIStore';

/*

  로딩바 display 인터페이스

*/

// 로딩바 show
const show = () => {
  const { setDisplayLoadingBar } = useUIStore.getState();
  setDisplayLoadingBar(true);
};

// 로딩바 hide
const hide = () => {
  const { setDisplayLoadingBar } = useUIStore.getState();
  setDisplayLoadingBar(false);
};

const LoadingBar = { show, hide };

export default LoadingBar;
