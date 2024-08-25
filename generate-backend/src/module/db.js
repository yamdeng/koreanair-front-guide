const { Client } = require('pg');

const client = new Client({
  user: 'postgres',
  password: 'eogksgkdrhd1!',
  host: '10.111.129.94',
  database: 'postgres',
  port: 5432,
});

const dbTypeToJavaType = {
  integer: 'Integer',
  bigint: 'Long',
  smallint: 'Short',
  numeric: 'BigDecimal',
  decimal: 'BigDecimal',
  real: 'Float',
  'double precision': 'Double',
  serial: 'Integer',
  bigserial: 'Long',
  varchar: 'String',
  char: 'String',
  text: 'String',
  boolean: 'Boolean',
  date: 'LocalDate',
  time: 'LocalTime',
  timestamp: 'LocalDateTime',
  bytea: 'Byte[]',
  json: 'JsonNode',
  jsonb: 'JsonNode',
  // 필요에 따라 다른 타입 추가
};

const toCamelCase = (str) => {
  return str.replace(/_([a-z])/g, (match, letter) => letter.toUpperCase());
};

async function connect() {
  await client.connect();
}

async function disconnect() {
  await client.end();
}

async function getTableInfo(tableName) {
  const res = await client.query(
    `
    SELECT column_name, udt_name as data_type, is_nullable, column_default, character_maximum_length as size,
           (SELECT pg_catalog.col_description(c.oid, cols.ordinal_position::int)
            FROM pg_catalog.pg_class c
            WHERE c.oid = (SELECT cols.table_name::regclass::oid)
              AND c.relname = cols.table_name) AS column_comment
    FROM information_schema.columns cols
    WHERE table_name = $1
    and column_name not in ('reg_user_id','reg_dttm','upd_user_id','upd_dttm')
    ORDER BY ordinal_position
  `,
    [tableName]
  );

  const pkRes = await client.query(
    `
    SELECT
      kcu.column_name AS pk_column
    FROM
      information_schema.table_constraints tc
    JOIN information_schema.key_column_usage kcu
      ON tc.constraint_name = kcu.constraint_name
      AND tc.table_schema = kcu.table_schema
    WHERE tc.constraint_type = 'PRIMARY KEY' AND tc.table_name = $1
  `,
    [tableName]
  );

  const fkRes = await client.query(
    `
    SELECT
      kcu.column_name AS fk_column
    FROM
      information_schema.table_constraints tc
    JOIN information_schema.key_column_usage kcu
      ON tc.constraint_name = kcu.constraint_name
      AND tc.table_schema = kcu.table_schema
    WHERE tc.constraint_type = 'FOREIGN KEY' AND tc.table_name = $1
  `,
    [tableName]
  );

  const tableCommentRes = await client.query(
    `
    SELECT
      obj_description($1::regclass, 'pg_class') AS table_comment
  `,
    [tableName]
  );

  return {
    columns: res.rows,
    primaryKey: pkRes.rows.map((row) => row.pk_column),
    foreignKey: fkRes.rows.map((row) => row.fk_column),
    description: tableCommentRes.rows.length > 0 ? tableCommentRes.rows[0].table_comment : '',
  };
}

module.exports = {
  connect,
  disconnect,
  getTableInfo,
  dbTypeToJavaType,
  toCamelCase,
};
