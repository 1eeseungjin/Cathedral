import { atom } from 'recoil';

export const roomsStore = atom({
  key: 'roomsStore',
  default: [],
});

export const roomStore = atom({
  key: 'roomStore',
  default: {},
});

export const smallTypeStore = atom({
  key: 'smallTypeStore',
  default: '기도방목록',
});

export const ModalStore = atom({
  key: 'ModalStore',
  default: false,
});
