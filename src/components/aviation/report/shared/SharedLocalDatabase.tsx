import { create } from 'zustand';
import localforage from 'localforage';
import initSqlJs from 'sql.js';

import {
  DB_SQLJS_NAME,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  INSERT_ATTACHMENT,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  INSERT_REPORT,
  SELECT_ATTACHMENT_FULL,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  SELECT_LASTEST_REPORT_ID,
  SELECT_REPORT_JOIN_ATTACHMENT,
  TABLE_ATTACHMENT,
  TABLE_REPORT,
} from '../configs/AttachmentConfig';

const initialState = {
  // report 전체 정보
  db: {},

  // for debug
  reports: [],
  attachments: [],
};

export const SharedLocalDatabase = create<any>((set, get) => ({
  ...initialState,
  /* ------------------------------------------------------------------------------
   * DATABASE
   * [1] ./node_modules/sql.js/dist/sql-wasm.wasm 파일을 resources/wasm/에 넣어줘야 한다.
   * -- 버전이 일치하지 않을 경우 메모리 등의 에러가 난다.
   * [2] DB 수동 삭제: chrome console에서 실행할 것
   * -- indexedDB.deleteDatabase('ksms-offline-data')
   * -- indexedDB.deleteDatabase('ksms-offline-data')
   * ------------------------------------------------------------------------------ */
  initializeDB: async () => {
    try {
      const SQL = await initSqlJs({
        locateFile: () => `/sql-wasm.wasm`,
      });
      const savedDb = (await localforage.getItem(DB_SQLJS_NAME)) as any;
      if (savedDb) {
        set({ db: new SQL.Database(new Uint8Array(savedDb)) });
      } else {
        set({ db: new SQL.Database() });
      }
      const { refreshReports } = get();
      refreshReports();
    } catch (error) {
      console.error('Error initializing database:', error);
    }
  },
  createDB: () => {
    const { db, commit } = get();
    // 테이블 생성
    db.run(`${TABLE_REPORT}`);
    db.run(`${TABLE_ATTACHMENT}`);
    commit();
  },
  getLocalForage: () => {
    return localforage;
  },
  // DB 저장
  pushItem: async (params) => {
    try {
      const { key, value } = params;
      await localforage.setItem(key, value);
    } catch (storageError) {
      throw new Error('Error saving file to IndexedDB');
    }
  },
  // DB 조회
  fetchItem: async (params) => {
    try {
      const { key } = params;
      await localforage.getItem(key);
    } catch (storageError) {
      throw new Error('Error fetching file to IndexedDB');
    }
  },
  // 디버그용
  refreshReports: () => {
    const { db } = get();
    const stmt = db.prepare(SELECT_REPORT_JOIN_ATTACHMENT);
    const result = [];
    while (stmt.step()) {
      result.push(stmt.getAsObject());
    }
    console.log(`[Print] Local IndexedDB Report START`);
    for (const value of result) {
      console.log(JSON.parse(value.payload));
    }
    console.log(`[Print] Local IndexedDB Report END`);
    set({ reports: result });
  },
  refreshAttachment: () => {
    const { db } = get();
    const stmt = db.prepare(SELECT_ATTACHMENT_FULL);
    const result = [];
    while (stmt.step()) {
      result.push(stmt.getAsObject());
    }
    console.log(`refreshAttachment: ${result}`);
    set({ attachments: result });
  },
  fetchReport: () => {
    const { refreshReports, refreshAttachment } = get();
    refreshReports();
    refreshAttachment();
  },
  // 최종 저장
  commit: async () => {
    const { db } = get();
    const dbData = db.export();
    await localforage.setItem(DB_SQLJS_NAME, dbData);
  },
}));
