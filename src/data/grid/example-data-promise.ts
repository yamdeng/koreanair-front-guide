import { getAllData, getPageData, addData, updateDataById, getDetailData, deleteDataById } from './example-data-new';
import Constant from '@/config/Constant';
import appStore from '@/stores/appStore';

const defaultDealyTimeout = 2000;

const exampleProfile = {
  userId: 'yamdeng',
  name: 'Test',
  deptName: '개발팀',
  userType: Constant.USER_TYPE_NORMAL,
  authList: [],
};

const delayLocalData = (data, option: any = {}) => {
  const { setDisplayLoadingBar } = appStore.getState();
  if (!option.disableLoadingBar) {
    setDisplayLoadingBar(true);
  }
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(data);
      setDisplayLoadingBar(false);
    }, defaultDealyTimeout)
  );
};

export const getProfile = () => delayLocalData(exampleProfile);
export const getAllDataPromise = (option = {}) => delayLocalData(getAllData(), option);
export const getPageDataPromise = (page, pageSize) => delayLocalData(getPageData(page, pageSize));
export const addDataPromise = (newData) => delayLocalData(addData(newData));
export const updateDataByIdPromise = (id, newData) => delayLocalData(updateDataById(id, newData));
export const getDetailDataPromise = (id) => delayLocalData(getDetailData(id));
export const deleteDataByIdPromise = (id) => delayLocalData(deleteDataById(id));
