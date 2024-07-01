import { faker } from '@faker-js/faker';
import _ from 'lodash';

const columnKeyList = [
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

const defaultTableRows = 25;
const defaultTableManyRows = 150;

const getRandomValueByColumnKey = (columnKey) => {
  if (columnKey === 'id') {
    return faker.string.uuid();
  } else if (columnKey === 'sabun') {
    return faker.string.numeric({ length: { min: 5, max: 10 } }) + '';
  } else if (columnKey === 'position') {
    return faker.helpers.arrayElement(['대리', '과장', '차장']);
  } else if (columnKey === 'name') {
    return faker.person.middleName();
  } else if (columnKey === 'deptName') {
    return faker.helpers.arrayElement(['항공안전', '산업안전', '운항팀', 'Audit', 'IT']);
  } else if (columnKey === 'sex') {
    return faker.person.sex();
  } else if (columnKey === 'email') {
    return faker.internet.email();
  } else if (columnKey === 'age') {
    return faker.number.int({ min: 10, max: 100 });
  } else if (columnKey === 'jobArea') {
    return faker.person.jobArea();
  } else if (columnKey === 'phone') {
    return faker.phone.number();
  } else if (columnKey === 'address1') {
    return faker.location.city();
  } else if (columnKey === 'address2') {
    return faker.location.city();
  } else if (columnKey === 'startDate' || columnKey === 'createdDate') {
    return faker.date.between({
      from: '2024-01-01T00:00:00.000Z',
      to: '2024-04-01T00:00:00.000Z',
    });
  } else if (columnKey === 'endDate' || columnKey === 'updatedDate') {
    return faker.date.between({
      from: '2024-04-02T00:00:00.000Z',
      to: '2025-01-17T00:00:00.000Z',
    });
  } else if (columnKey === 'addressInfo') {
    return {
      name: faker.location.city(),
      zipCode: faker.location.zipCode(),
      streetAddress: faker.location.streetAddress(),
    };
  } else if (columnKey === 'airlineInfo') {
    return faker.airline.airline();
  } else if (columnKey === 'userList') {
    const userList = [];
    for (let index = 0; index < 5; index++) {
      userList.push({
        name: faker.person.middleName(),
        deptName: faker.helpers.arrayElement(['항공안전', '산업안전', '운항팀', 'Audit', 'IT']),
        positionTitle: faker.helpers.arrayElement(['대리', '과장', '차장']),
      });
    }
    return userList;
  }
  return '';
};

const getRowData = (): any => {
  const rowDataResult = {};
  for (let columnIndex = 0; columnIndex < columnKeyList.length; columnIndex++) {
    const columnKey = columnKeyList[columnIndex];
    rowDataResult[columnKey] = getRandomValueByColumnKey(columnKey);
  }
  return rowDataResult;
};

export const getTestData = () => {
  const result = [];
  for (let index = 0; index < defaultTableRows; index++) {
    result.push(getRowData());
  }
  return result;
};

export const getTestManyData = () => {
  const result = [];
  for (let index = 0; index < defaultTableManyRows; index++) {
    result.push(getRowData());
  }
  return result;
};

export const getAgGridColumnListByListIndex = (lastIndex) => {
  const sliceColumnKeyList = columnKeyList.slice(0, lastIndex);
  return sliceColumnKeyList.map((keyName) => {
    return {
      field: keyName,
      headerName: _.capitalize(keyName),
    };
  });
};

export const getAgGridColumnListByManulList = (manualList) => {
  return manualList.map((keyName) => {
    return {
      field: keyName,
      headerName: _.capitalize(keyName),
    };
  });
};

export const getPageData = (page, pageSize) => {
  return manyData.slice((page - 1) * pageSize, page * pageSize);
};

const simeData = [];
for (let index = 0; index < defaultTableRows; index++) {
  const rowData = getRowData();
  rowData.index = index + 1;
  simeData.push(rowData);
}

const manyData = [];
for (let index = 0; index < defaultTableManyRows; index++) {
  const rowData = getRowData();
  rowData.index = index + 1;
  manyData.push(rowData);
}
