require('dotenv').config();
const _ = require('lodash');
const ejs = require('ejs');
const fs = require('fs');
const AdmZip = require('adm-zip');
const { tableSelectSql, columnSelectSql } = require('./sql-string');

// TODO : form generate시에 import는 해당하는 것만 하기

const {
  listComponentGenerateString,
  formStoreGenerateString,
  formViewGenerateString,
  detailViewGenerateString,
} = require('./generate-string');

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE, SERVER_PORT } = process.env;

const db = require('knex')({
  client: 'pg',
  version: '7.2',
  connection: {
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
  },
});

const express = require('express');
const app = express();
const cors = require('cors');
const port = SERVER_PORT;
app.use(
  cors({
    origin: '*', // 모든 출처 허용 옵션. true 를 써도 된다.
  })
);
app.use(express.static('public'));
app.use(express.json({ extended: true }));

// 테이블 조회 : /api/tables
app.get('/api/tables', async (req, res) => {
  const keyword = req.query.keyword;
  let tableList = [];
  try {
    const dbResponse = await db.raw(tableSelectSql, {
      keyword: `%${keyword}%`,
    });
    tableList = dbResponse.rows;
    console.log(tableList);
  } catch (e) {
    console.log(e);
  }

  res.json({
    list: tableList,
  });
});

// 테이블명 기준으로 컬럼 정보 조회 : /api/columns
app.get('/api/columns/:tableName', async (req, res) => {
  const tableName = req.params.tableName;
  let columnList = [];
  try {
    const dbResponse = await db.raw(columnSelectSql, [tableName, tableName]);
    columnList = dbResponse.rows;
    // 컬럼주석명이 존재하지 않을 경우 낙타표기법 컬럼명으로 대체
    converColumnList(columnList);
    console.log(columnList);
  } catch (e) {
    console.log(e);
  }

  res.json({
    list: columnList,
  });
});

// 파일 다운로드하기 : /api/generate/:tableName/:generateType/fileDownload
app.post('/api/generate/:tableName/:generateType/fileDownload', async (req, res) => {
  const tableName = req.params.tableName;
  const generateType = req.params.generateType || 'all'; // all, list, formStore, formView
  let columnList = req.body.checkedColumns || [];
  let checkedMultiColumn = req.body.checkedMultiColumn;
  let downloadFileName = '';
  try {
    converColumnList(columnList);
    let listFileName = '';
    let formStoreFileName = '';
    let formViewFileName = '';
    let detailViewFileName = '';
    if (generateType === 'all' || generateType === 'list') {
      listFileName = await createListfile(tableName, columnList);
      if (generateType === 'list') {
        downloadFileName = listFileName;
      }
    }
    if (generateType === 'all' || generateType === 'formStore') {
      formStoreFileName = await createFormStorefile(tableName, columnList);
      if (generateType === 'formStore') {
        downloadFileName = formStoreFileName;
      }
    }
    if (generateType === 'all' || generateType === 'formView') {
      formViewFileName = await createFormViewfile(tableName, columnList, checkedMultiColumn);
      if (generateType === 'formView') {
        downloadFileName = formViewFileName;
      }
    }

    if (generateType === 'all' || generateType === 'detailView') {
      detailViewFileName = await createDetailViewfile(tableName, columnList, checkedMultiColumn);
      if (generateType === 'detailView') {
        downloadFileName = detailViewFileName;
      }
    }
    if (generateType === 'all') {
      downloadFileName = await createZipArchive(tableName, [
        listFileName,
        formStoreFileName,
        formViewFileName,
        detailViewFileName,
      ]);
    }
  } catch (e) {
    console.log(e);
  }

  res.download(downloadFileName);
});

// generate 문자열 반환 : /api/generate/:tableName
app.get('/api/generate/:tableName', async (req, res) => {
  const tableName = req.params.tableName;
  let columnList = req.query.checkedColumns || [];
  let checkedMultiColumn = req.query.checkedMultiColumn && req.query.checkedMultiColumn === 'true' ? true : false;

  let result = {};
  try {
    converColumnList(columnList);

    const requiredFields = columnList.filter((info) => info.is_nullable !== 'YES').map((info) => info.column_name);

    let camelCaseTableName = _.camelCase(tableName);
    const applyFileName = getApplyFileName(camelCaseTableName);
    const listData = {
      fileName: `${applyFileName}List`,
      storeName: `${applyFileName}ListStore`,
      tableColumns: columnList,
    };
    const listComponentContent = ejs.render(listComponentGenerateString, listData);

    const formStoreData = {
      fileName: `use${applyFileName}FormStore`,
      requiredFieldList: requiredFields,
      tableColumns: columnList,
    };

    const formStoreContent = ejs.render(formStoreGenerateString, formStoreData);

    const formViewData = {
      fileName: `${applyFileName}Form`,
      storeName: `use${applyFileName}FormStore`,
      tableColumns: columnList,
      tableColumnMultiArray: toMultiArray(columnList, checkedMultiColumn ? 2 : 1),
    };

    const detailViewData = {
      fileName: `${applyFileName}Detail`,
      storeName: `use${applyFileName}FormStore`,
      tableColumns: columnList,
      tableColumnMultiArray: toMultiArray(columnList, checkedMultiColumn ? 2 : 1),
    };

    const formViewContent = ejs.render(formViewGenerateString, formViewData);
    const detailViewContent = ejs.render(detailViewGenerateString, detailViewData);
    result.listComponentContent = listComponentContent;
    result.formStoreContent = formStoreContent;
    result.formViewContent = formViewContent;
    result.detailViewContent = detailViewContent;
    result.modalFormContent = detailViewContent;
    result.modalViewContent = detailViewContent;
  } catch (e) {
    console.log(e);
  }

  res.json(result);
});

// 테이블 목록 파일 생성
async function createListfile(tableName, columnList) {
  // 템플릿에서 대체할 변수들
  let camelCaseTableName = _.camelCase(tableName);
  const applyFileName = getApplyFileName(camelCaseTableName);
  const data = {
    fileName: `${applyFileName}List`,
    storeName: `${applyFileName}ListStore`,
    tableColumns: columnList,
  };
  const content = ejs.render(listComponentGenerateString, data);
  fs.writeFileSync(`./result/${applyFileName}List.tsx`, content);
  return `./result/${applyFileName}List.tsx`;
}

// form store 파일 생성
async function createFormStorefile(tableName, columnList) {
  // 템플릿에서 대체할 변수들
  let camelCaseTableName = _.camelCase(tableName);
  const applyFileName = getApplyFileName(camelCaseTableName);

  // yup 가공 start
  columnList.map((info) => {
    let yupType = 'string';
    let formInitValue = '""';
    if (info.java_type === 'Double' || info.java_type === 'Long') {
      yupType = 'number';
      formInitValue = 'null';
    } else if (info.java_type === 'Boolean') {
      yupType = 'boolean';
      formInitValue = 'false';
    }
    info.yupType = yupType + '()' + (info.is_nullable !== 'YES' ? '.required()' : '');
    info.formInitValue = formInitValue;
    return info;
  });

  const requiredFields = columnList.filter((info) => info.is_nullable !== 'YES').map((info) => info.column_name);
  // yup 가공 end

  const data = {
    fileName: `use${applyFileName}FormStore`,
    requiredFieldList: requiredFields,
    tableColumns: columnList,
  };
  const content = ejs.render(formStoreGenerateString, data);
  fs.writeFileSync(`./result/${applyFileName}FormStore.ts`, content);
  return `./result/${applyFileName}FormStore.ts`;
}

// form view 파일 생성
async function createFormViewfile(tableName, columnList, checkedMultiColumn) {
  // 템플릿에서 대체할 변수들
  let camelCaseTableName = _.camelCase(tableName);
  const applyFileName = getApplyFileName(camelCaseTableName);

  const data = {
    fileName: `${applyFileName}Form`,
    storeName: `use${applyFileName}FormStore`,
    tableColumns: columnList,
    tableColumnMultiArray: toMultiArray(columnList, checkedMultiColumn ? 2 : 1),
  };
  const content = ejs.render(formViewGenerateString, data);
  fs.writeFileSync(`./result/${applyFileName}Form.tsx`, content);
  return `./result/${applyFileName}Form.tsx`;
}

// detail view 파일 생성
async function createDetailViewfile(tableName, columnList, checkedMultiColumn) {
  // 템플릿에서 대체할 변수들
  let camelCaseTableName = _.camelCase(tableName);
  const applyFileName = getApplyFileName(camelCaseTableName);

  const data = {
    fileName: `${applyFileName}Detail`,
    storeName: `use${applyFileName}FormStore`,
    tableColumns: columnList,
    tableColumnMultiArray: toMultiArray(columnList, checkedMultiColumn ? 2 : 1),
  };
  const content = ejs.render(detailViewGenerateString, data);
  fs.writeFileSync(`./result/${applyFileName}Detail.tsx`, content);
  return `./result/${applyFileName}Detail.tsx`;
}

// 파일 압축
async function createZipArchive(tableName, fileNameList) {
  let zipFileName = `./result/${tableName}-all.zip`;
  try {
    const zip = new AdmZip();
    fileNameList.forEach((fileName) => {
      zip.addLocalFile(fileName);
    });
    zip.writeZip(zipFileName);
    console.log(`Created ${zipFileName} successfully`);
  } catch (e) {
    console.log(`Something went wrong. ${e}`);
  }
  return zipFileName;
}

// 서버 listen
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

function getApplyFileName(camelCaseTableName) {
  // return camelCaseTableName.charAt(0).toUpperCase() + camelCaseTableName.slice(1);
  // 테이블명이 tb_로 시작해서 앞을 자름
  return camelCaseTableName.slice(2);
}

function toMultiArray(array, spliceCount = 2) {
  const originalArray = _.cloneDeep(array);
  const results = [];
  // eslint-disable-next-line no-constant-condition
  while (true) {
    if (!originalArray.length) {
      break;
    }
    const removeArray = originalArray.splice(0, spliceCount);
    results.push(removeArray);
  }
  return results;
}

function converColumnList(columnList) {
  // 컬럼주석명이 존재하지 않을 경우 낙타표기법 컬럼명으로 대체
  columnList.map((info) => {
    if (!info.column_comment) {
      info.column_comment = info.column_name;
    }
    // componentType 값이 존재하지 않을 경우만 자동으로 셋팅
    if (!info.componentType) {
      info.componentType = 'text';
    }

    let yupType = 'string';
    let formInitValue = '""';
    if (info.java_type === 'Double' || info.java_type === 'Long') {
      yupType = 'number';
      formInitValue = 'null';
    } else if (info.java_type === 'Boolean') {
      yupType = 'boolean';
      formInitValue = 'false';
    }
    info.yupType = yupType + '()' + (info.is_nullable !== 'YES' ? '.required()' : '');
    info.formInitValue = formInitValue;

    return info;
  });
}
