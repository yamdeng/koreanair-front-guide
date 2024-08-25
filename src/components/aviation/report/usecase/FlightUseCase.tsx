import { create } from 'zustand';
import { delay } from '../utils/Function';

const apiMock = {
  searchFlight: {
    registrationNo: '304838',
    aircraftType: 'key07',
    from: 'ICN',
    to: 'TKY',
    divert: {
      loc: 'ICN',
      time: {
        std: '23:10',
        sta: '23:20',
        atd: '23:30',
        ata: '23:40',
        delay: '23:50',
      },
    },
    supply: {
      f: 222,
      c: 33,
      y: 11,
    },
    checkIn: {
      f: 111,
      c: 22,
      y: 33,
    },
    cabinCrew: [
      {
        name: '홍길동1',
        department: '(주)대한항공',
        office: '대우',
        position: '상무',
      },
      {
        name: '홍길동2',
        department: '(주)대한항공',
        office: '대우',
        position: '직원',
      },
    ],
  },
  searchCabinCrew: {
    crew: [
      {
        name: '홍길동',
        department: '(주)대한항공',
        office: '대우',
        position: '상무',
      },
      {
        name: '김정은',
        department: '(주)북한노동당',
        office: '대우',
        position: '상무',
      },
      {
        name: '오바마',
        department: '(주)메이어스',
        office: '아프리카',
        position: '직원',
      },
    ],
  },
};

export const FlightUseCase = create<any>((set, get) => ({
  searchFlight: async () => {
    console.log(`apiToSearchFlight: BEGIN`);
    await delay(1000);
    console.log(`apiToSearchFlight: END`);
    return apiMock.searchFlight;
  },
  searchCabinCrew: async () => {
    console.log(`apiToSearchCabinCrew: BEGIN`);
    await delay(1000);
    console.log(`apiToSearchCabinCrew: END`);
    return apiMock.searchCabinCrew;
  },
}));
