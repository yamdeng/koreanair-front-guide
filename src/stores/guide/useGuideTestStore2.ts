import { createStore } from 'zustand';

/*

    zustand createStore 함수를 이용한 저장소관리
     -createStore any 타입을 정의하는 것이 deprecated 아니지만 꼭 아래와 같이 any로 정의해 줍니다

*/

// 기본 state를 정의 : reset 하기 위한
const basicState = { profile: null, name: '안용성', age: 10 };

const useGuideTestStore2 = createStore<any>((set, get) => ({
  ...basicState,

  increaseAge: () => set((state) => ({ age: state.age + 1 })),

  // store 멤버변수를 변경하는 방법 1 : 권장하는 방법
  changeName: (newName) => set(() => ({ name: newName })),

  // store 멤버변수를 변경하는 방법 2 : 권장하지 않음
  changeName2: (newName) =>
    set((state) => {
      return { ...state, name: newName };
    }),

  //   changeProfile: (newProfile) =>
  //     set(() => ({
  //       profile: newProfile,
  //     })),

  // store에 정의한 변수를 이용하는 방법
  changeProfile: (newProfile) => {
    const { name } = get();
    console.log(newProfile);
    set(() => ({
      profile: { name: name },
    }));
  },

  clearStore: () => {
    set(() => basicState);
  },

  // 아래와 같이 사용할 수도 있음 방법만 체크
  clearStore2: () => {
    useGuideTestStore2.getState().clearStore();
  },
}));

export default useGuideTestStore2;
