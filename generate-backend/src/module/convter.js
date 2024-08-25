const fs = require('fs');
const path = require('path');
const db = require('./db');

const templateRootDir = path.join(__dirname, '../templates');
const outputDir = path.join(__dirname, '../output');
//const outputDir = 'D:/KoreanAirKSMS/Workspaces/Backend/ksms-be/module-ksmsbe/src/main/java';

const createDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

/**
 * Controller 템플릿
 *
 * @param {*} config
 * @returns
 */
function processControllerTemplate(config) {
  const templateFile = 'Controller.java';
  const templatePath = path.join(config.templateDir, templateFile);
  if (!fs.existsSync(templatePath)) return;

  const templateContent = fs.readFileSync(templatePath, 'utf-8');

  const outputContent = templateContent
    .replace(/\$\{Entity\}/g, config.fileName)
    .replace(/\$\{entity\}/g, config.entity)
    .replace(/\$\{packageName\}/g, config.packageName)
    .replace(/\$\{apiPathRoot\}/g, config.apiPathRoot)
    .replace(/\$\{apiPathDetail\}/g, config.apiPathDetail)
    .replace(/\$\{tableDescription\}/g, config.tableDescription);

  const outputPath = path.join(config.outputPackageDir, 'controller', `${config.fileName}Controller.java`);
  createDir(path.join(config.outputPackageDir, 'controller'));
  fs.writeFileSync(outputPath, outputContent);

  // console.log(`Controller file generated: ${outputPath}`);
}

/**
 * Service 템플릿
 * @param {*} config
 * @returns
 */
function processServiceTemplate(config) {
  const templateFile = 'Service.java';
  const templatePath = path.join(config.templateDir, templateFile);
  if (!fs.existsSync(templatePath)) return;

  const templateContent = fs.readFileSync(templatePath, 'utf-8');

  const outputContent = templateContent
    .replace(/\$\{Entity\}/g, config.fileName)
    .replace(/\$\{entity\}/g, config.entity)
    .replace(/\$\{packageName\}/g, config.packageName);

  const outputPath = path.join(config.outputPackageDir, 'service', `${config.fileName}Service.java`);
  createDir(path.join(config.outputPackageDir, 'service'));
  fs.writeFileSync(outputPath, outputContent);

  // console.log(`Service file generated: ${outputPath}`);
}

/**
 * ServiceImpl 템플릿
 * @param {*} config
 * @returns
 */
function processServiceImplTemplate(config) {
  const templateFile = 'ServiceImpl.java';
  const templatePath = path.join(config.templateDir, templateFile);
  if (!fs.existsSync(templatePath)) return;

  const templateContent = fs.readFileSync(templatePath, 'utf-8');

  const outputContent = templateContent
    .replace(/\$\{Entity\}/g, config.fileName)
    .replace(/\$\{entity\}/g, config.entity)
    .replace(/\$\{packageName\}/g, config.packageName);

  const outputPath = path.join(config.outputPackageDir, 'service', `${config.fileName}ServiceImpl.java`);
  createDir(path.join(config.outputPackageDir, 'service'));
  fs.writeFileSync(outputPath, outputContent);

  // console.log(`Service file generated: ${outputPath}`);
}

/**
 * DTO 템플릿
 * @param {*} config
 * @returns
 */
function processDTOTemplate(config) {
  const templateFile = 'Dto.java';
  const templatePath = path.join(config.templateDir, templateFile);
  if (!fs.existsSync(templatePath)) return;

  const templateContent = fs.readFileSync(templatePath, 'utf-8');

  const columnDefinitions = config.tableInfo.columns
    .map((col) => {
      const javaType = db.dbTypeToJavaType[col.data_type.toUpperCase()] || 'String';
      const camelCaseColumn = db.toCamelCase(col.column_name);
      const description = col.column_comment || camelCaseColumn.replace(/([A-Z])/g, ' $1').toLowerCase();

      const requiredAnnotation = col.is_nullable === 'NO' ? ', required = true' : '';
      const schemaAnnotation = `@Schema(description = "${description}")`;
      let validationAnnotations = '';

      if (col.is_nullable === 'NO') {
        validationAnnotations += '@NotBlank\n    ';
      }

      if (col.size) {
        // validationAnnotations += `@Size(max=${col.size})\n    `;
      }

      return `
    ${schemaAnnotation}
    ${validationAnnotations}private ${javaType} ${camelCaseColumn};`;
    })
    .join('\n    ');

  const outputContent = templateContent
    .replace(/\$\{Entity\}/g, config.fileName)
    .replace(/\$\{entity\}/g, config.entity)
    .replace(/\$\{packageName\}/g, config.packageName)
    .replace(/\$\{columns\}/g, columnDefinitions)
    .replace(/\$\{tableDescription\}/g, config.tableDescription);

  const outputPath = path.join(config.outputPackageDir, 'dto', `${config.fileName}Dto.java`);
  createDir(path.join(config.outputPackageDir, 'dto'));
  fs.writeFileSync(outputPath, outputContent);

  // console.log(`DTO file generated: ${outputPath}`);
}

/**
 * SQL.xml 템플릿
 * @param {*} config
 * @returns
 */
function processMapperTemplate(config) {
  const templateFile = 'SQL.xml';
  const templatePath = path.join(config.templateDir, templateFile);
  if (!fs.existsSync(templatePath)) return;

  const templateContent = fs.readFileSync(templatePath, 'utf-8');

  // 컬럼 및 조건에 필요한 데이터 추출
  const columnNames = config.tableInfo.columns.map((col) => col.column_name).join(', ');
  const insertColumnNames = config.tableInfo.columns.map((col) => col.column_name).join(', ');
  const insertValues = config.tableInfo.columns.map((col) => `#{${db.toCamelCase(col.column_name)}}`).join(', ');
  const updateSet = config.tableInfo.columns
    .filter(
      (col) =>
        !config.tableInfo.primaryKey.includes(col.column_name) && !config.tableInfo.foreignKey.includes(col.column_name)
    )
    .map((col) => `${col.column_name} = #{${db.toCamelCase(col.column_name)}}`)
    .join(', ');

  let primaryKeyConditions = '';
  if (config.tableInfo.primaryKey.length > 0 || config.tableInfo.foreignKey.length > 0) {
    const pkConditions = config.tableInfo.primaryKey.map((pk) => `${pk} = #{${db.toCamelCase(pk)}}`).join(' AND ');
    const fkConditions = config.tableInfo.foreignKey.map((fk) => `${fk} = #{${db.toCamelCase(fk)}}`).join(' AND ');
    primaryKeyConditions = [pkConditions, fkConditions].filter((condition) => condition.length > 0).join(' AND ');
  } else {
    primaryKeyConditions = '1=1';
  }

  // 템플릿 내용을 동적으로 변환
  const outputContent = templateContent
    .replace(/\$\{Entity\}/g, config.fileName)
    .replace(/\$\{entity\}/g, config.entity)
    .replace(/\$\{columnNames\}/g, columnNames)
    .replace(/\$\{packageName\}/g, config.packageName)
    .replace(/\$\{dbTableName\}/g, config.dbTableName)
    .replace(/\$\{primaryKeyConditions\}/g, primaryKeyConditions)
    .replace(/\$\{insertColumnNames\}/g, insertColumnNames)
    .replace(/\$\{insertValues\}/g, insertValues)
    .replace(/\$\{updateSet\}/g, updateSet)
    .replace(/\$\{tableDescription\}/g, config.tableDescription);

  const outputPath = path.join(config.outputPackageDir, 'mapper', `${config.fileName}_SQL.xml`);
  createDir(path.join(config.outputPackageDir, 'mapper'));
  fs.writeFileSync(outputPath, outputContent);

  // console.log(`Mapper.xml file generated: ${outputPath}`);
}

/**
 * 템플릿 변환 작업
 * @param {*} config
 * @returns
 */
async function process(config) {
  // console.log('packageName : ', config.packageName);
  // console.log('apiPathRoot : ', config.apiPathRoot);
  // console.log('dbTableName : ', config.dbTableName);
  // console.log('fileName : ', config.fileName);

  // config.entity = config.dbTableName.charAt(0).toUpperCase() + config.dbTableName.slice(1);
  config.entity = config.fileName.charAt(0).toLowerCase() + config.fileName.slice(1);

  config.tableInfo = config.tableInfoMap[config.dbTableName];
  if (!config.tableInfo) {
    return;
  }

  config.tableDescription = config.tableInfo.description || `${config.entity}`;

  config.templateDir = path.join(templateRootDir, config.templateFolder);
  if (!fs.existsSync(config.templateDir)) {
    return;
  }

  config.outputPackageDir = outputDir;
  if (config.usePackageStructure.toLowerCase() === 'y') {
    config.outputPackageDir = path.join(outputDir, config.packageName.replace(/\./g, '/'));
  }
  createDir(config.outputPackageDir);

  processControllerTemplate(config);
  processServiceTemplate(config);
  processServiceImplTemplate(config);
  processDTOTemplate(config);
  processMapperTemplate(config);

  console.log(`파일생성 : ${config.entity}`);
}

module.exports = {
  process,
};
