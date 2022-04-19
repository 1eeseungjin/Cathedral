import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userInfoState } from './@store/userInfo';
import Login from './BeforeLogin/Login';
import Main from './Main';
import Admin from './Main/Admin';
import Community from './Main/Community';
import General from './Main/General';
import MyPage from './Main/MyPage';
import PrayerSetting from './Main/PrayerSetting';
import PrayRoom from './Main/PrayRoom';
import Report from './Main/Report';
import SmallPrayRoom from './Main/SmallPrayRoom';
import Stats from './Main/Stats';
import User from './Main/User';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />}>
          <Route path="/general/*" element={<General />} />
          <Route path="/user/*" element={<User />} />
          <Route path="/prayRoom/*" element={<PrayRoom />} />
          <Route path="/smallPrayRoom" element={<SmallPrayRoom />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/community/*" element={<Community />} />
          <Route path="/report" element={<Report />} />
          <Route path="/prayerSetting" element={<PrayerSetting />} />
          <Route path="/myPage" element={<MyPage />} />
          <Route path="/admin" element={<Admin />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
