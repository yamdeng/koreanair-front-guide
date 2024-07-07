import { create } from 'zustand';
import useFirstStore from './useFirstStore';

const useSecondStore = create<any>((set) => ({
  name: '',
  age: 30,
  changeName: (newName) => {
    const firstName = useFirstStore.getState().name;
    console.log(`firstName : ${firstName}`);
    set(() => ({ name: newName }));
  },
  changeAge: (newAge) => set(() => ({ age: newAge })),
}));

export default useSecondStore;
