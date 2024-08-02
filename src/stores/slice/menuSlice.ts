import ApiService from '@/services/ApiService';
import { produce } from 'immer';
import history from '@/utils/history';

// menu 공통 slice
export const createLeftMenuSlice = (set, get) => ({
  displayExpandMenu: true,
  leftMenuList: [],
  appWorkScope: 'S',
  changeWorkScope: (workScope) => {
    const { getLeftMenu } = get();
    set({ appWorkScope: workScope });
    getLeftMenu();
  },
  toggleLeftMenu: () => set((state) => ({ displayExpandMenu: !state.displayExpandMenu })),

  expandRootMenuInfo: (rootDeptMenuInfo) => {
    const { menuId } = rootDeptMenuInfo;
    set(
      produce((state: any) => {
        const leftMenuList = state.leftMenuList;
        const searchIndex = leftMenuList.findIndex((info) => info.menuId === menuId);
        state.leftMenuList.forEach((rootMenuInfo) => {
          rootMenuInfo.isSelected = false;
          rootMenuInfo.isMenuExapand = false;
          if (rootMenuInfo.children) {
            rootMenuInfo.children.forEach((secondMenuInfo) => {
              // 2번째 depth 선택된 메뉴 초기화
              secondMenuInfo.isSelected = false;
              if (secondMenuInfo.children) {
                // 3번째 depth 선택된 메뉴 초기화
                secondMenuInfo.children.forEach((lastMenuInfo) => {
                  lastMenuInfo.isSelected = false;
                });
              }
            });
          }
        });
        state.leftMenuList[searchIndex].isMenuExapand = true;
        const secondMenuList = leftMenuList[searchIndex].children;
        if (secondMenuList && secondMenuList.length) {
          const searchSecondMenuIndex = secondMenuList.findIndex((info) => info.treeType === 'M');
          if (searchSecondMenuIndex !== -1) {
            history.push(secondMenuList[searchSecondMenuIndex].menuUrl);
          } else {
            const lastMenuList = secondMenuList.children;
            if (lastMenuList && lastMenuList.length) {
              const searchLastMenuIndex = lastMenuList.findIndex((info) => info.treeType === 'M');
              if (searchLastMenuIndex !== -1) {
                history.push(lastMenuList[searchLastMenuIndex].menuUrl);
              }
            }
          }
        }
      })
    );
  },

  toggleRootMenuExpand: (rootDepthMenuInfo) => {
    const { menuId, menuUrl } = rootDepthMenuInfo;
    if (menuUrl) {
      history.push(menuUrl);
      set(
        produce((state: any) => {
          state.leftMenuList.forEach((rootMenuInfo) => {
            rootMenuInfo.isSelected = false;
            if (rootMenuInfo.children) {
              rootMenuInfo.children.forEach((secondMenuInfo) => {
                // 2번째 depth 선택된 메뉴 초기화
                secondMenuInfo.isSelected = false;
                if (secondMenuInfo.children) {
                  // 3번째 depth 선택된 메뉴 초기화
                  secondMenuInfo.children.forEach((lastMenuInfo) => {
                    lastMenuInfo.isSelected = false;
                  });
                }
              });
            }
          });
          const searchIndex = state.leftMenuList.findIndex((info) => info.menuId === menuId);
          state.leftMenuList[searchIndex].isSelected = true;
        })
      );
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
            // 최상위 선택된 메뉴 초기화
            rootMenuInfo.isSelected = false;
            if (rootMenuInfo.children) {
              rootMenuInfo.children.forEach((secondMenuInfo) => {
                // 2번째 depth 선택된 메뉴 초기화
                secondMenuInfo.isSelected = false;
                if (secondMenuInfo.menuId === menuId) {
                  secondMenuInfo.isSelected = true;
                }
                if (secondMenuInfo.children) {
                  // 3번째 depth 선택된 메뉴 초기화
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
            // 최상위 선택된 메뉴 초기화
            rootMenuInfo.isSelected = false;
            if (rootMenuInfo.children) {
              rootMenuInfo.children.forEach((secondMenuInfo) => {
                // 2번째 depth 선택된 메뉴 초기화
                secondMenuInfo.isSelected = false;
                if (secondMenuInfo.children) {
                  secondMenuInfo.children.forEach((lastMenuInfo) => {
                    lastMenuInfo.isSelected = false;
                    if (lastMenuInfo.menuId === menuId) {
                      // 3번째 depth 선택된 메뉴 초기화
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
                // 선택한 3dept 메뉴의 2depth 메뉴를 활성화
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
    const { appWorkScope } = get();
    // sys/left-menus?isTree=N
    const apiParam = { isTree: 'Y', workScope: appWorkScope };
    const response = await ApiService.get('sys/left-menus', apiParam);
    const data = response.data.data;
    if (data && data.length) {
      const leftMenuList = data;
      leftMenuList.map((info) => {
        info.isMenuExapand = false;
      });
      set({ leftMenuList: leftMenuList });
    }
  },
});
