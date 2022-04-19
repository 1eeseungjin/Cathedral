import { Routes, Route } from 'react-router-dom';
import UserComponent from './User';
import Detail from './UserLIst/Detail/Detail';

const User = () => {
  return (
    <Routes>
      <Route path="" element={<UserComponent />} />
      <Route path="detail" element={<Detail />} />
    </Routes>
  );
};

export default User;
