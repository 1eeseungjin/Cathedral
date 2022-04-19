import { atom } from 'recoil';

export const idListAtom = atom({
  key: 'IdList',
  default: [],
});

export const checkListAtom = atom({
  key: 'CheckList',
  default: [],
});

export const usersAtom = atom({
  key: 'usersAtom',
  default: [],
});

export const pushModalAtom = atom({
  key: 'pushModalAtom',
  default: false,
});

export const banModalAtom = atom({
  key: 'banModalAtom',
  default: false,
});

export const SelectAtom = atom({
  key: 'selectAtom',
  default: '전체 신자',
});

export const reportedModalAtom = atom({
  key: 'reportedModalAtom',
  default: false,
});

export const reportedIdx = atom({
  key: 'reportedIdx',
  default: 0,
});
