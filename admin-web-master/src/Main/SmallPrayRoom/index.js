// 소공동체 기도 페이지
import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import SmallPrayRoomComponent from './SmallPrayRoom';

function SmallPrayRoom() {
  return (
    <Routes>
      <Route path="" element={<SmallPrayRoomComponent />} />
    </Routes>
  );
}

export default SmallPrayRoom;
