import { getAllData, getPageData } from './example-data-new';

const defaultTimeout = 2000;

const delayLocalData = (data) => {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(data);
    }, defaultTimeout)
  );
};

const result = {
  getAllDataPromise: () => delayLocalData(getAllData()),
  getPageDataPromise: (page, pageSize) => delayLocalData(getPageData(page, pageSize)),
};

export default result;
