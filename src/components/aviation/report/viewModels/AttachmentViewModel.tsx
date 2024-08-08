import localforage from 'localforage';
import initSqlJs from 'sql.js';
import { set as idbSet, get as idbGet } from 'idb-keyval';
import { v4 as uuidv4 } from 'uuid';
import { create } from 'zustand'
import { DB_SQLJS_NAME, INSERT_ATTACHMENT, INSERT_REPORT, SELECT_ATTACHMENT_FULL, SELECT_LASTEST_REPORT_ID, SELECT_REPORT_JOIN_ATTACHMENT, TABLE_ATTACHMENT, TABLE_REPORT } from '../configs/AttachmentConfig';
import { DefaultShiftHelper } from '../utils/BitShiftHelper';

/**
 * DB 수동 삭제: chrome console에서 실행할 것
 * -- indexedDB.deleteDatabase('ksms-offline-data')
 * -- indexedDB.deleteDatabase('ksms-offline-data')
 * 
 * 레포트 작성시 저장 프로세스
 * (1) 레포트 화면 진입시 현재의 UUID를 설정
 * (2) 레포트 작성 중간에 첨부파일을 추가하게 되면 ()
 */

const delay = (time) => {
  return new Promise(resolve => setTimeout(resolve, time));
}

export class BitShiftHelper {
  currentBit: any;
  static instance: any;
  completionBit: number;
  callback: () => void;

  constructor() {
    if (BitShiftHelper.instance) {
      return BitShiftHelper.instance;
    }

    this.completionBit = 0b0;
    this.currentBit = 0b0;
    this.callback = () => { };
    BitShiftHelper.instance = this;
  }

  fetchCurrent(fetchBit) {
    this.currentBit |= fetchBit
    if (this.currentBit === this.completionBit) {
      this.callback?.();
      this.callback = undefined;
    }
  }

  setupCompletion(count) {
    let i = 0;
    do {
        DefaultShiftHelper.completionBit = DefaultShiftHelper.completionBit | 0x0001 << i;
      i++;
    } while (i < count);
  }

  debug() {
    console.log(`currentBit: ${this.currentBit.toString(2)}, completionBit: ${this.completionBit.toString(2)}`)
  }
}

const initailState = {
  db: {},
  reports: [],
  attachments: [],
  formData: new FormData(),
  getFormArray: () => { },
  handleFileChange: () => { },
  removeFormFile: () => { },
  commit: () => { }
};

export const AttachmentViewModel = create<any>((set, get) => ({
  ...initailState,
  initializeDB: async () => {
    try {
      const SQL = await initSqlJs({
        locateFile: file => `/src/resources/wasm/sql-wasm-1.10.3.wasm`
      });
      const savedDb = await idbGet(DB_SQLJS_NAME);
      if (savedDb) {
        set({ db: new SQL.Database(new Uint8Array(savedDb)) })
      } else {
        set({ db: new SQL.Database() })
      }
    } catch (error) {
      console.error('Error initializing database:', error);
    }
  },
  createDB: () => {
    const { db, commit } = get()
    // 테이블 생성
    db.run(`${TABLE_REPORT}`);
    db.run(`${TABLE_ATTACHMENT}`);
    commit();
  },
  handleFileChange: (event) => {
    const { getFormArray } = get()
    if (!event.target.files[0]) return;
    const formData = new FormData();
    let index = 0;
    getFormArray().forEach(([key, file], i) => {
      formData.append(`file${i}`, file)
      index++;
    })
    formData.append(`file${index}`, event.target.files[0]);
    set({ formData: formData });
  },
  getFormArray: () => {
    const { formData } = get()
    return Array.from(formData.entries())
  },
  refreshReports: () => {
    const { db } = get()
    const stmt = db.prepare(SELECT_REPORT_JOIN_ATTACHMENT);
    const result = [];
    while (stmt.step()) {
      result.push(stmt.getAsObject());
    }
    console.log(`refreshReports: ${result}`)
    set({ reports: result })
  },
  refreshAttachment: () => {
    const { db } = get()
    const stmt = db.prepare(SELECT_ATTACHMENT_FULL);
    const result = [];
    while (stmt.step()) {
      result.push(stmt.getAsObject());
    }
    console.log(`refreshAttachment: ${result}`)
    set({ attachments: result })
  },
  insertReportToDB: (report_id, fileMaps) => {
    const { db } = get()
    // 보고서 저장
    db.run(`${INSERT_REPORT}`, ['CSR', '{}']);

    const stmt = db.prepare(SELECT_LASTEST_REPORT_ID);

    const result = [];
    while (stmt.step()) {
      result.push(stmt.getAsObject());
    }

    if (result.length > 0) {
      const report_id = result[0].id;
      console.log(`Save Report 'id': ${report_id}`)
      return report_id;
    } else {
      alert("레포트 작성 저장 중 오류가 발생했습니다.");
      return null;
    }
  },
  insertAttachmentToDB: (report_id, fileMaps) => {
    const { db } = get()
    // 첨부파일 DB 업데이트
    console.log(fileMaps);
    fileMaps.map((element, index) => {
      //console.log(`index: ${index}`)
    })
    fileMaps.forEach((element, index) => {
      //console.log(`file: ${element}`)
      db.run(`${INSERT_ATTACHMENT}`, [report_id, element.filename, element.size, element.key])
    })
  },
  saveReport: async () => {

    const { commit, fetchReport, getFormArray, insertReportToDB, insertAttachmentToDB } = get()

    // 파일 목록
    let fileMaps = [];

    DefaultShiftHelper.setupCompletion(getFormArray().length);
    DefaultShiftHelper.callback = () => {
      // 1초후 보고서 DB 저장
      delay(1000).then(() => {
        let report_id = insertReportToDB();
        report_id && insertAttachmentToDB(report_id, fileMaps);
        commit();
        fetchReport();
        set({ formData: new FormData() });
      })
    }

    // 첨부파일 local 저장
    let i = 0;
    getFormArray().forEach(async ([key, file]) => {

      if (file instanceof File) {
        const reader = new FileReader();
        reader.onloadend = async () => {
          const arrayBuffer = reader.result;

          try {
            // 파일 키를 생성하거나 수정합니다.
            const fileKey = uuidv4(); // 이 함수는 파일 키를 생성하거나 가져오는 로직입니다.
            await localforage.setItem(fileKey, arrayBuffer);
            console.log('File successfully saved to IndexedDB.');

            // 현재 파일 키들을 로그로 출력
            const fileKeys = await localforage.keys();
            console.log(`current file keys: ${fileKeys.join(',')}`);

            // 저장된 파일 키들을 확인
            fileKeys.forEach((key) => {
              //console.log(`Stored file key: ${key}`);
            });
            fileMaps.push({ 'key': fileKey, 'filename': file.name, 'size': file.size })
            DefaultShiftHelper.fetchCurrent(0x1 << i);
            i++;
          } catch (storageError) {
            console.error('Error saving file to IndexedDB:', storageError);
            alert('파일 업로드 중 오류가 발생했습니다.');
          }
        }
        reader.readAsArrayBuffer(file);
      }
    })
  },
  fetchReport: () => {
    const { refreshReports, refreshAttachment } = get()
    refreshReports();
    refreshAttachment();
  },
  removeFormFile: (fileToRemove) => {
    const { getFormArray } = get()
    let formData = new FormData();
    let index = 0;
    getFormArray().forEach(([key, file], _) => {
      if (key !== fileToRemove) {
        formData.append(`file${index}`, file)
        index++;
      }
    })
  },
  commit: async () => {
    const { db } = get()
    const dbData = db.export();
    await idbSet(DB_SQLJS_NAME, dbData);
  }
}))
