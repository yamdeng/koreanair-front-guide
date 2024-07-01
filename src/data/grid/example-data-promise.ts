import { getTestData } from './example-data';

const defaultTimeout = 2000;

const delayLocalData = (data) => {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(data);
    }, defaultTimeout)
  );
};

const result = {
  getPromiseTestData: () => delayLocalData(getTestData()),
};

export default result;
