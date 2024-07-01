import { getAllData, getPageData } from './example-data-new';
import Constant from '@/config/Constant';

const defaultDealyTimeout = 2000;

const exampleProfile = {
  userId: 'yamdeng',
  name: 'Test',
  deptName: '개발팀',
  userType: Constant.USER_TYPE_NORMAL,
  authList: [],
};

const delayLocalData = (data) => {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(data);
    }, defaultDealyTimeout)
  );
};

export const getProfile = () => delayLocalData(exampleProfile);
export const getAllDataPromise = () => delayLocalData(getAllData());
export const getPageDataPromise = (page, pageSize) => delayLocalData(getPageData(page, pageSize));
