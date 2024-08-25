const convter = require('./module/convter');
const db = require('./module/db');

const rows = [
  [
    'com.koreanair.ksms.ocu.mgmt',
    'tb_ocu_major_dss_training',
    'OcuTraining',
    '/api/v1/ocu',
    '/management/training',
    'ocu',
    'y',
  ],
  // [패키지명, DB테이블명, 파일명, APIROOT, API상세, 템플릿폴더, 패키지YN]
  // ['com.koreanair.ksms.ocu.test', 'tb_ocu_rules_form', 'OcuRulesForm', '/api/v1/ocn', '/ocu/rulesform', 'ocn', 'y'],
  // ['com.koreanair.ksms.avn.test', 'tb_ocu_comittee', 'OcuComittee', '/api/v1/avn', '/avn/comittee', 'avn', 'y'],
];

async function main() {
  await db.connect();
  const tableInfoMap = {};
  for (const row of rows) {
    const dbTableName = row[1];
    tableInfoMap[dbTableName] = await db.getTableInfo(dbTableName);
  }
  await db.disconnect();

  for (const row of rows) {
    const config = {
      packageName: row[0],
      dbTableName: row[1],
      fileName: row[2],
      apiPathRoot: row[3],
      apiPathDetail: row[4],
      templateFolder: row[5],
      usePackageStructure: row[6],
      tableInfoMap: tableInfoMap,
    };

    await convter.process(config);
  }
}

main().catch((err) => console.error(err));
