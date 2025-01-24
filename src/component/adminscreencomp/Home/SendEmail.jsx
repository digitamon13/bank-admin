import React, { useState,useEffect} from 'react';
import styles from '../../common/Home.module.css';
import { deleteUser, fetchUsers } from "../../../store/action/userAppStorage";
import { Loader } from '../../common/HomeLoader';
import { useNavigate } from 'react-router-dom';
import { Error } from "../../common/Error";
import { useDispatch, useSelector } from "react-redux";






export const SendEmailComponent = ({ updateHandler, }) => {
    let [isData, setIsData] = useState({})
    let [isLoading, setIsLoading] = useState(true)
    let [isError, setIsError] = useState(false)
    let [userList, setUserList] = useState([])
    let [filteredUsers, setfilteredUsers] = useState([])
    let { color} = useSelector(state => state.userAuth)
    let dispatch = useDispatch()

    let handleChangeHandler = (e, nameField) => {
        let val = e.target.value
        setIsData(prev => {
            prev[`${nameField}`] = val
            let newData = { ...prev }
            return newData
        })
    }

    let submitHandler = (e) => {
        e.preventDefault()
        updateHandler(isData)
        return
    }


    useEffect(() => {
        fetchAllUsers()
    }, [])




    let fetchAllUsers = async () => {
        setIsError(false)
        let res = await dispatch(fetchUsers())

        console.log(res)

        if (!res.bool) {
            setIsError(true)
            setIsLoading(false)
            return
        }
        //do some filtering here
        setUserList(res.message)
        setfilteredUsers(res.message)
        setIsLoading(false)
        setIsData(prev=>{
            prev.reciever = res.message[0].email
            return prev
        })
    }


   
    return (<>
        <div className={styles.homeScreen} style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>

<div className={styles.timeline} style={{ maxWidth: '900px', margin: '0 auto', borderRadius: '12px', boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)', padding: '40px' }}>
  <form className={styles.editForm} onSubmit={submitHandler}>
    
    {/* Compose Email */}
    <div className={styles.inputCards} style={{ marginBottom: '20px' }}>
      <label style={{ fontSize: '16px', color: '#333', marginBottom: '8px' }}>
        Compose Email
      </label>
      <textarea
        onChange={(e) => handleChangeHandler(e, 'email')}
        value={isData.email}
        type='text'
        style={{
          width: '100%',
          border: '1px solid #ddd',
          height: '200px',
          padding: '12px',
          borderRadius: '8px',
          fontSize: '14px',
          outline: 'none',
          backgroundColor: '#f9f9f9',
          transition: 'border-color 0.3s ease'
        }}
        onFocus={(e) => e.target.style.borderColor = '#382b7d'}
        onBlur={(e) => e.target.style.borderColor = '#ddd'}
      />
    </div>

    {/* Select Recipient */}
    <div className={styles.inputCards} style={{ marginBottom: '20px' }}>
      <label style={{ fontSize: '16px', color: '#333', marginBottom: '8px' }}>
        Select Recipient
      </label>
      <select
        onChange={(e) => handleChangeHandler(e, 'reciever')}
        value={isData.reciever}
        style={{
          width: '100%',
          padding: '12px',
          borderRadius: '8px',
          border: '1px solid #ddd',
          fontSize: '14px',
          outline: 'none',
          transition: 'border-color 0.3s ease'
        }}
        onFocus={(e) => e.target.style.borderColor = '#382b7d'}
        onBlur={(e) => e.target.style.borderColor = '#ddd'}
      >
        {userList.map((data) => (
          <option key={data.email}>{data.email}</option>
        ))}
      </select>
    </div>

    {/* Send Button */}
    <div className={styles.buttonContainer} style={{ textAlign: 'right' }}>
      <button
        type="submit"
        style={{
          backgroundColor: '#382b7d',
          color: '#fff',
          padding: '12px 30px',
          borderRadius: '5px',
          border: 'none',
          fontSize: '16px',
          cursor: 'pointer',
          transition: 'background-color 0.3s ease'
        }}
        onMouseEnter={(e) => e.target.style.backgroundColor = '#0056b3'}
        onMouseLeave={(e) => e.target.style.backgroundColor = '#382b7d'}
      >
        Send
      </button>
    </div>
  </form>
</div>
</div>

        
        </>)




}