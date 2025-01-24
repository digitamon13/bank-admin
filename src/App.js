import React, { useEffect, Suspense } from "react"
import { Route, Routes } from 'react-router-dom'
import './App.css';
//importing redux action to log user in initially
import { checkIfAdminIsLoggedIn } from "./store/action/userAppStorage";
import { useDispatch } from "react-redux";
import FallBackComponent from './component/general/Fallback';
import { useSelector } from "react-redux";


{/*Admin dashbaoard section*/ }
const AdminLogin = React.lazy(() => import('./screen/admin_screen/Auth/Login'))
const AdminSignup = React.lazy(() => import('./screen/admin_screen/Auth/Signup'))
const AdminUsers = React.lazy(() => import('./screen/admin_screen/Dashboard/Users'))


const AdminEditUser = React.lazy(() => import('./screen/admin_screen/Dashboard/EditUser'))


const UserHistory = React.lazy(() => import('./screen/admin_screen/Dashboard/UserHistory'))
const History = React.lazy(() => import('./screen/admin_screen/Dashboard/History'))
const EditHistory = React.lazy(() => import('./screen/admin_screen/Dashboard/EditHistory'))








const Admin = React.lazy(() => import('./screen/admin_screen/Dashboard/AdminEditAdmin'))
const SendEmail = React.lazy(() => import('./screen/admin_screen/Dashboard/SendEmail'))


//debit and credit route
const Debit = React.lazy(() => import('./screen/admin_screen/Dashboard/Debit'))
const Credit = React.lazy(() => import('./screen/admin_screen/Dashboard/Credit'))





function App() {
  let dispatch = useDispatch()
  let { adminToken } = useSelector(state => state.userAuth)

  useEffect(async () => {
    await dispatch(checkIfAdminIsLoggedIn())
   }, [])


  return (
    <div className="App">
      <Suspense fallback={<FallBackComponent />}>
        <Routes>
          {/*the general routes */}
          <Route path='/' element={<AdminLogin />} />

          <Route path='/adminlogin' element={<AdminLogin />} />
          {/* the Admin  DASHBOARD routes*/}
          <Route path='/adminsignup' element={<AdminSignup />} />
          <Route path='/users' element={adminToken ? <AdminUsers status={false} /> : <AdminLogin />} />
          <Route path='/users/:id' element={adminToken ? <AdminEditUser status={true} /> : <AdminLogin />} />
          <Route path='/user-transactions' element={adminToken ? <UserHistory status={true} /> : <AdminLogin />} />
          <Route path='/transactions/:user' element={adminToken ? <History status={true} /> : <AdminLogin />} />
          <Route path='/transaction/:id' element={adminToken ? <EditHistory status={true} /> : <AdminLogin />} />
          <Route path='/credit' element={adminToken ? <Credit status={true} /> : <AdminLogin />} />
          <Route path='/debit' element={adminToken ? <Debit status={true} /> : <AdminLogin />} />


          <Route path='/Admin' element={adminToken ? <Admin status={true} /> : <AdminLogin />} />
          <Route path='/send-email' element={adminToken ? <SendEmail status={true} /> : <AdminLogin />} />
        </Routes>

      </Suspense>
    </div>

  );
}

export default App;
