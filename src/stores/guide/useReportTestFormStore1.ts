import { create } from 'zustand';
import { formBaseState, createFormSliceRequire } from '@/stores/slice/formSlice';

const initFormData = {
  ...formBaseState,
  requiredFields: ['id', 'name', 'email', 'job'],

  id: '',
  name: '',
  age: null,
  email: '',
  password: '',
  password2: '',
  job: '',
  description: '',
};

const useReportTestFormStore1 = create<any>((set, get) => ({
  ...createFormSliceRequire(set, get),

  ...initFormData,

  save: () => {
    const { validate, getApiParam } = get();
    if (validate()) {
      const apiParam = getApiParam();
      console.log(`apiParam : ${JSON.stringify(apiParam)}`);
    }
  },

  clear: () => {
    set(initFormData);
  },
}));

export default useReportTestFormStore1;
