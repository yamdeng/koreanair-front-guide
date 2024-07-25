import { createStore } from 'zustand';
import { produce } from 'immer';
import ApiService from '@/services/ApiService';
import history from '@/utils/history';

const useAppStore = createStore<any>((set, get) => ({
  profile: null,
  displayExpandMenu: true,
  displayLoadingBar: false,
  leftMenuList: [],
  toggleLeftMenu: () => set((state) => ({ displayExpandMenu: !state.displayExpandMenu })),
  toggleRootMenuExpand: (rootDepthMenuInfo) => {
    const { menuId, menuUrl } = rootDepthMenuInfo;
    if (menuUrl) {
      history.push(menuUrl);
    } else {
      set(
        produce((state: any) => {
          const leftMenuList = state.leftMenuList;
          const searchIndex = leftMenuList.findIndex((info) => info.menuId === menuId);
          state.leftMenuList[searchIndex].isMenuExapand = !state.leftMenuList[searchIndex].isMenuExapand;
        })
      );
    }
  },
  clickSecondMenu: (secondDepthMenuInfo) => {
    const { menuId, menuUrl, treeType } = secondDepthMenuInfo;
    if (treeType === 'M') {
      history.push(menuUrl);
      set(
        produce((state: any) => {
          state.leftMenuList.forEach((rootMenuInfo) => {
            if (rootMenuInfo.children) {
              rootMenuInfo.children.forEach((secondMenuInfo) => {
                secondMenuInfo.isSelected = false;
                if (secondMenuInfo.menuId === menuId) {
                  secondMenuInfo.isSelected = true;
                }
                if (secondMenuInfo.children) {
                  secondMenuInfo.children.forEach((lastMenuInfo) => {
                    lastMenuInfo.isSelected = false;
                  });
                }
              });
            }
          });
        })
      );
    }
  },
  clickLastMenu: (lastDepthMenuInfo) => {
    const { menuId, menuUrl, treeType } = lastDepthMenuInfo;
    if (treeType === 'M') {
      history.push(menuUrl);
      set(
        produce((state: any) => {
          let selecteSecondMenuId = null;
          state.leftMenuList.forEach((rootMenuInfo) => {
            if (rootMenuInfo.children) {
              rootMenuInfo.children.forEach((secondMenuInfo) => {
                secondMenuInfo.isSelected = false;
                if (secondMenuInfo.children) {
                  secondMenuInfo.children.forEach((lastMenuInfo) => {
                    lastMenuInfo.isSelected = false;
                    if (lastMenuInfo.menuId === menuId) {
                      selecteSecondMenuId = secondMenuInfo.menuId;
                      lastMenuInfo.isSelected = true;
                    }
                  });
                }
              });
            }
          });
          state.leftMenuList.forEach((rootMenuInfo) => {
            if (rootMenuInfo.children) {
              rootMenuInfo.children.forEach((secondMenuInfo) => {
                if (secondMenuInfo.menuId === selecteSecondMenuId) {
                  secondMenuInfo.isSelected = true;
                }
              });
            }
          });
        })
      );
    }
  },
  getLeftMenu: async () => {
    // sys/left-menus?isTree=N
    const apiParam = { isTree: 'Y' };
    const response = await ApiService.get('sys/left-menus', apiParam);
    const data = response.data;
    if (data && data.length) {
      const leftMenuList = data[0].children;
      leftMenuList.map((info) => {
        info.isMenuExapand = false;
      });
      set({ leftMenuList: leftMenuList });
    }
  },
  initApp: async () => {
    const { getLeftMenu } = get();
    getLeftMenu();
  },
  getProfile: async () => {
    // const data = await getProfile();
    // set(() => ({ profile: data }));
  },
  setDisplayLoadingBar: (displayLoadingBar) => {
    set(() => ({ displayLoadingBar: displayLoadingBar }));
  },
}));

export default useAppStore;
