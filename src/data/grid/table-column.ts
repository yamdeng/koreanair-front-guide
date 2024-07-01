import _ from 'lodash';

const testColumnKeyList = [
  'id',
  'sabun',
  'position',
  'name',
  'deptName',
  'sex',
  'createdDate',
  'updatedDate',
  'email',
  'age',
  'jobArea',
  'phone',
  'address1',
  'address2',
  'startDate',
  'endDate',
  'addressInfo',
  'airlineInfo',
  'userList',
];

const userColumnKeyList = [
  'id',
  'createUserId',
  'updateUserId',
  'createDate',
  'updateDate',
  'isDelete',
  'name',
  'nameEn',
  'sabun',
  'deptId',
  'positionTitle',
  'positionTitleEn',
  'phoneNumber',
  'companyTel',
  'email',
  'address',
  'addressDetail',
  'zipCode',
  'joinDate',
  'status',
];

export const testColumnInfos = testColumnKeyList.map((keyName) => {
  return {
    field: keyName,
    headerName: _.capitalize(keyName),
  };
});

export const usersColumnInfos = userColumnKeyList.map((keyName) => {
  return {
    field: keyName,
    headerName: _.capitalize(keyName),
  };
});
