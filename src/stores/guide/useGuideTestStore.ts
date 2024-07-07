import { create } from 'zustand';

/*

    zustand create 함수를 이용한 저장소관리
     -create에 any 타입을 정의하는 것이 deprecated 이지만 그대로 사용(state을 type으로 정의하는 비용이 훨씬 높음)

*/

// 기본 state를 정의 : reset 하기 위한
const basicState = { profile: null, name: '안용성', age: 10 };

const useStore = create<any>((set, get) => ({
  ...basicState,

  increaseAge: () => set((state) => ({ age: state.age + 1 })),

  // store 멤버변수를 변경하는 방법 1 : 권장하는 방법
  changeName: (newName) => set(() => ({ name: newName })),

  // store 멤버변수를 변경하는 방법 2 : 권장하지 않음
  changeName2: (newName) =>
    set((state) => {
      return { ...state, name: newName };
    }),

  // changeProfile: (newProfile) =>
  //   set(() => ({
  //     profile: newProfile,
  //   })),

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
}));

export default useStore;
