export const defaultListExcludeKeys = ['list', 'excludeApiKeys'];

export const listBaseState = {
  displayTableLoading: false,
  list: [],
  excludeApiKeys: [],
};

export const createListSlice = (set, get) => ({
  ...listBaseState,

  changeSearchInput: (inputName, inputValue) => {
    set({ [inputName]: inputValue });
  },

  getSearchParam: () => {
    const state = get();
    const stateKeys = Object.keys(state);
    const excludeFilterKeys = defaultListExcludeKeys;
    if (state.excludeApiKeys && state.excludeApiKeys.length) {
      excludeFilterKeys.push(...state.excludeApiKeys);
    }
    const applyStateKeys = stateKeys.filter((key) => {
      if (typeof state[key] === 'function') {
        return false;
      } else if (excludeFilterKeys.includes(key)) {
        return false;
      }
      return true;
    });
    const apiParam = {};
    applyStateKeys.forEach((apiRequestKey) => {
      apiParam[apiRequestKey] = state[apiRequestKey];
    });
    return apiParam;
  },
});
