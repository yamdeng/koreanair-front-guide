import useGuideTestStore from '@/stores/guide/useGuideTestStore';

export const logProfile = () => {
  console.log(`profile : ${JSON.stringify(useGuideTestStore.getState().profile)}`);
};

export const changeName = (name) => {
  const { changeName } = useGuideTestStore.getState();
  changeName(name);
};
