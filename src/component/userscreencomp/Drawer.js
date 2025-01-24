import React from 'react'
import styles from './Drawer.module.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { logout } from './../../store/action/userAppStorage';
import { useSelector } from "react-redux";

let topMenu = [
  {
    icon: 'list',
    title: 'users',
    link: '/users'
  },
  {
    icon: 'settings',
    title: 'settings',
    link: '/admin'
  },
  {
    icon: 'history',
    title: 'history',
    link: '/user-transactions'
  },
  {
    icon: 'money',
    title: 'credit',
    link: '/credit'
  },

  {
    icon: 'money',
    title: 'debit',
    link: '/debit'
  },
  {
    icon: 'email',
    title: 'send email',
    link: '/send-email'
  },
  {
    icon: 'wallet',
    title: 'brooker',
    link: '/brooker'
  }
  
 
  
  
]


const DashboardDrawer = ({ showmenuHandler }) => {

  let navigate = useNavigate()
  const dispatch = useDispatch()
  let { color } = useSelector(state => state.userAuth)

  let navigateHandler = async (data) => {
    if (data.link === 'signout') {
      navigate('/')
      await dispatch(logout())

    } else {
      if(data.title == 'brooker'){
        window.location.href = "https://brooker-admin-nir4.onrender.com";  // 
        return 
    }
    navigate(data.link)
    }
  }



  return (<div className='drawerCon' style={{ backgroundColor: color.background }}>

    <div className={styles.drawer} style={{ backgroundColor: color.background }}>
      <div className={styles.cancel} onClick={showmenuHandler}>

        <span className='material-icons' style={{ color: color.importantText }}>
          close
        </span>
      </div>


      <ul className={styles.drawerMenuCon}>
        {topMenu.map(data => <li className={styles.drawerMenu} onClick={() => navigateHandler(data)} key={data.link} style={{ color: color.blue }}><span className='material-icons' key={data.title} style={{ backgroundColor: color.fadeColor, color: color.normalText }} >{data.icon}</span>{data.title}</li>)}

      </ul>

      <div className={styles.boxunderline}>
      </div>



      <div className={styles.boxunderline}>
      </div>

    </div>
  </div>)
}

export default DashboardDrawer