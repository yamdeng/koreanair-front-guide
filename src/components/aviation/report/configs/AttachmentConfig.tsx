
export const DB_SQLJS_NAME = `ksms-offline-data`

export const TABLE_REPORT = `CREATE TABLE IF NOT EXISTS 
  report 
(id INTEGER PRIMARY KEY AUTOINCREMENT, category TEXT, payload TEXT);`

export const TABLE_ATTACHMENT = `CREATE TABLE IF NOT EXISTS
  attachment
(id INTEGER PRIMARY KEY AUTOINCREMENT, report_id INTEGER, filename TEXT, size INTEGER, attachment TEXT);`

export const INSERT_REPORT = `INSERT INTO report (category, payload) VALUES (?, ?);`

export const INSERT_ATTACHMENT = `INSERT INTO attachment (report_id, filename, size, attachment) VALUES (?, ?, ?, ?);`

export const SELECT_LASTEST_REPORT_ID = `SELECT
  id
FROM report
ORDER BY id DESC LIMIT 1;`

export const SELECT_REPORT_BY_ID = `SELECT 
  report.id,
  report.category,
  report.payload,
  attachment.report_id,
  attachment.filename,
  attachment.attachment
FROM report 
LEFT JOIN attachment
ON report.id = attachment.report_id 
WHERE report.id = ? ;`

export const SELECT_REPORT = `SELECT 
  id,
  category,
  payload
FROM report;`

export const SELECT_REPORT_JOIN_ATTACHMENT = `SELECT 
  report.id,
  report.category,
  report.payload,
  attachment.report_id,
  attachment.filename,
  attachment.attachment
FROM report 
LEFT OUTER JOIN attachment
ON report.id = attachment.report_id;`

export const SELECT_ATTACHMENT_FULL = `SELECT
  id,
  report_id,
  filename,
  size,
  attachment
FROM attachment;`