const defaultListInitailState = {
  formData: {
    name: {
      id: 'name',
      value: 'ays',
    },
    nameEn: {
      id: 'nameEn',
      value: 'ays-en',
    },
  },
  errors: {},
  isDirty: false,
  isValid: false,
};

export const createListSlice = (set, get) => ({
  ...defaultListInitailState,

  // changeInput: (inputName, inputValue) => {
  //   set({ formData: null });
  // },

  search: () => {
    const { currentPage, pageSize, searchParam } = get();
    const apiParam = { ...searchParam, currentPage, pageSize };
    console.log(`search call : ${JSON.stringify(apiParam)}`);
  },

  save: () => {
    const { validate } = get();
    if (validate()) {
      //
    }
  },

  validate: () => {
    // const { formData } = get();
    // set({ pageSize: pageSize, currentPage: 1 });
    const success = false;
    return success;
  },

  clearStore: () => set(defaultListInitailState),
});
