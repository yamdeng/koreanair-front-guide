import {
  getAllDataPromise,
  getDetailDataPromise,
  addDataPromise,
  updateDataByIdPromise,
  deleteDataByIdPromise,
} from '@/data/grid/example-data-promise';

/*

  local date curd 인터페이스

*/
class LocalApiService {
  list(option: any = {}) {
    return getAllDataPromise(option);
  }

  getDetail(id) {
    return getDetailDataPromise(id);
  }

  post(newData) {
    return addDataPromise(newData);
  }

  put(id, newData) {
    return updateDataByIdPromise(id, newData);
  }

  delete(id) {
    return deleteDataByIdPromise(id);
  }
}

export default new LocalApiService();
