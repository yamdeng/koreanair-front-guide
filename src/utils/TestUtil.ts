import useGuideTestStore from '@/stores/guide/useGuideTestStore';
import history from './history';

export const logProfile = () => {
  console.log(`profile : ${JSON.stringify(useGuideTestStore.getState().profile)}`);
};

export const changeName = (name) => {
  const { changeName } = useGuideTestStore.getState();
  changeName(name);
};

export const movePage = (path) => {
  history.push(path);
};
