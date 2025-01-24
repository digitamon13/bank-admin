import React, { useState, useEffect } from 'react';
import styles from '../../common/Home.module.css'
import { useSelector } from "react-redux";
import { Error } from "../../common/Error";





export const AdminDebitComponent = ({ updateHandler, }) => {
    let { color, usersList } = useSelector(state => state.userAuth)
    let [isEmail, setIsEmail] = useState()

    //getting current user
    let [isCurrentUser, setIsCurrentUser] = useState(usersList[0])


    let [isReason, setIsReason] = useState('')
    let [isDate, setIsDate] = useState()
    let [isTime, setIsTime] = useState()

    let [isLoading, setIsLoading] = useState(true)
    let [isError, setIsError] = useState(false)


    let [isAmount, setIsAmount] = useState(false)



    let handleEmailChangeHandler = (e) => {
        setIsLoading(true)
        setIsEmail(e.target.value)
        let newCurrentUser = usersList.find(data => data.email === e.target.value)
        setIsCurrentUser(newCurrentUser)
        //modify current user
        setIsLoading(true)
        setTimeout(() => {
            setIsLoading(false)
        }, 5000)

    }







    let changeAmountHandler = (e) => {
        setIsAmount(e.target.value)
    }

    let changeReasonHandler = (e) => {
        setIsReason(e.target.value)
    }


    let changeDateHandler = (e) => {
        setIsDate(e.target.value)
    }

    let changeTimeHandler = (e) => {
        setIsTime(e.target.value)
    }



    useEffect(() => {
        setIsCurrentUser(usersList[0])

    }, [])


    let submitHandler = (e) => {
        e.preventDefault()

        let data = {
            user: isCurrentUser,
            amount: isAmount,
            date: isDate,
            reason: isReason,
            time: isTime
        }

        updateHandler(data)
    }



    if (isError) {
        return <Error />
    }


    return (<>
      <div className={styles.homeScreen} style={{ backgroundColor: color.background, padding: '20px', fontFamily: 'Arial, sans-serif' }}>
  <div className={styles.timeline} style={{ backgroundColor: color.background, maxWidth: '900px', margin: '0 auto', borderRadius: '12px', boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)', padding: '40px' }}>
    <form className={styles.editForm} onSubmit={submitHandler}>
      <h2 style={{ fontSize: '24px', color: '#333', marginBottom: '20px' }}>SELECT RECIPIENT</h2>

      {/* Client Selection */}
      <div className={styles.inputCards} style={{ marginBottom: '20px' }}>
        <label style={{ fontSize: '16px', color: '#333', marginBottom: '8px' }}>Select client to debit</label>
        <select
          value={isEmail}
          onChange={(e) => handleEmailChangeHandler(e, 'email')}
          style={{
            padding: '12px',
            borderRadius: '8px',
            border: '1px solid #ddd',
            width: '100%',
            fontSize: '14px',
            outline: 'none',
            transition: 'border-color 0.3s ease',
          }}
          onFocus={(e) => e.target.style.borderColor = '#382b7d'}
          onBlur={(e) => e.target.style.borderColor = '#ddd'}
        >
          {usersList.length > 0 &&
            usersList.map((data) => (
              <option key={data.email}>{data.email}</option>
            ))}
        </select>
      </div>

      <h2 style={{ fontSize: '24px', color: '#333', marginBottom: '20px' }}>ACCOUNT INFORMATION</h2>

      {/* Account Information */}
      <div className={styles.inputCards} style={{ marginBottom: '20px' }}>
        <label style={{ fontSize: '16px', color: '#333', marginBottom: '8px' }}>Account Name</label>
        <input
          value={isCurrentUser?.firstName}
          readOnly
          style={{
            padding: '12px',
            borderRadius: '8px',
            border: '1px solid #ddd',
            width: '100%',
            fontSize: '14px',
            backgroundColor: '#f9f9f9',
          }}
        />
      </div>

      <div className={styles.inputCards} style={{ marginBottom: '20px' }}>
        <label style={{ fontSize: '16px', color: '#333', marginBottom: '8px' }}>Account Number</label>
        <input
          value={isCurrentUser?.acountNumber}
          readOnly
          style={{
            padding: '12px',
            borderRadius: '8px',
            border: '1px solid #ddd',
            width: '100%',
            fontSize: '14px',
            backgroundColor: '#f9f9f9',
          }}
        />
      </div>

      <div className={styles.inputCards} style={{ marginBottom: '20px' }}>
        <label style={{ fontSize: '16px', color: '#333', marginBottom: '8px' }}>Account Balance</label>
        <input
          value={isCurrentUser?.accountBalance}
          readOnly
          style={{
            padding: '12px',
            borderRadius: '8px',
            border: '1px solid #ddd',
            width: '100%',
            fontSize: '14px',
            backgroundColor: '#f9f9f9',
          }}
        />
      </div>

      {/* Debit Information */}
      <div className={styles.inputCards} style={{ marginBottom: '20px' }}>
        <label style={{ fontSize: '16px', color: '#333', marginBottom: '8px' }}>Debit Amount</label>
        <input
          value={isAmount}
          onChange={changeAmountHandler}
          type="number"
          required
          style={{
            padding: '12px',
            borderRadius: '8px',
            border: '1px solid #ddd',
            width: '100%',
            fontSize: '14px',
            transition: 'border-color 0.3s ease',
          }}
          onFocus={(e) => e.target.style.borderColor = '#382b7d'}
          onBlur={(e) => e.target.style.borderColor = '#ddd'}
        />
      </div>

      <div className={styles.inputCards} style={{ marginBottom: '20px' }}>
        <label style={{ fontSize: '16px', color: '#333', marginBottom: '8px' }}>Reason</label>
        <input
          value={isReason}
          onChange={changeReasonHandler}
          type="text"
          required
          style={{
            padding: '12px',
            borderRadius: '8px',
            border: '1px solid #ddd',
            width: '100%',
            fontSize: '14px',
            transition: 'border-color 0.3s ease',
          }}
          onFocus={(e) => e.target.style.borderColor = '#382b7d'}
          onBlur={(e) => e.target.style.borderColor = '#ddd'}
        />
      </div>

      {/* Date and Time Information */}
      <div className={styles.inputCards} style={{ marginBottom: '20px' }}>
        <label style={{ fontSize: '16px', color: '#333', marginBottom: '8px' }}>Date</label>
        <input
          value={isDate}
          onChange={changeDateHandler}
          type="date"
          required
          style={{
            padding: '12px',
            borderRadius: '8px',
            border: '1px solid #ddd',
            width: '100%',
            fontSize: '14px',
            transition: 'border-color 0.3s ease',
          }}
          onFocus={(e) => e.target.style.borderColor = '#382b7d'}
          onBlur={(e) => e.target.style.borderColor = '#ddd'}
        />
      </div>

      <div className={styles.inputCards} style={{ marginBottom: '20px' }}>
        <label style={{ fontSize: '16px', color: '#333', marginBottom: '8px' }}>Time</label>
        <input
          value={isTime}
          onChange={changeTimeHandler}
          type="time"
          required
          style={{
            padding: '12px',
            borderRadius: '8px',
            border: '1px solid #ddd',
            width: '100%',
            fontSize: '14px',
            transition: 'border-color 0.3s ease',
          }}
          onFocus={(e) => e.target.style.borderColor = '#382b7d'}
          onBlur={(e) => e.target.style.borderColor = '#ddd'}
        />
      </div>

      {/* Submit Button */}
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
            transition: 'background-color 0.3s ease',
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#0056b3'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#382b7d'}
        >
          Debit Client
        </button>
      </div>
    </form>
  </div>
</div>




    </>

    )




}