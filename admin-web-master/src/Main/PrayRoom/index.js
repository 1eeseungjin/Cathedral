// 소공동체 기도 페이지
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PrayRoomComponent from './PrayRoom';
import Detail from './Detail';

function PrayRoom() {
  return (
    <Routes>
      <Route path="" element={<PrayRoomComponent />} />
      <Route path="detail" element={<Detail />} />
    </Routes>
  );
}

export default PrayRoom;
