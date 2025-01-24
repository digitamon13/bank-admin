import React, { useState, useEffect } from 'react';
import styles from '../../common/Home.module.css'
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';



export const AdminEditComponent = ({ updateHandler, }) => {

    let [isData, setIsData] = useState(null)
    let { color, admin } = useSelector(state => state.userAuth)
    let { id } = useParams()


    let handleChangeHandler = (e, nameField) => {
        let val = e.target.value

        setIsData(prev => {
            prev[`${nameField}`] = val
            let newData = { ...prev }
            return newData
        })

    }


    useEffect(() => {
        setIsData(admin)
    }, [id])



    let submitHandler = (e) => {
        e.preventDefault()
        updateHandler(isData)
        return

    }


    return (<>
        <div className={styles.homeScreen} style={{ backgroundColor: color.background, padding: '20px', fontFamily: 'Arial, sans-serif' }}>

            <div className={styles.timeline} style={{ backgroundColor: color.background, maxWidth: '900px', margin: '0 auto', borderRadius: '12px', boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)', padding: '40px' }}>

                {admin && isData && <form className={styles.editForm} onSubmit={submitHandler}>

                    <div className={styles.inputCards} style={{ marginBottom: '20px' }}>
                        <label style={{ fontSize: '16px', color: '#333', marginBottom: '8px' }}>Email</label>
                        <input
                            onChange={(e) => handleChangeHandler(e, 'email')}
                            value={isData.email}
                            type='text'
                            required
                            style={{
                                padding: '12px',
                                borderRadius: '8px',
                                border: '1px solid #ddd',
                                width: '100%',
                                fontSize: '14px',
                                outline: 'none',
                                transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
                            }}
                            onFocus={(e) => {
                                e.target.style.boxShadow = '0 0 8px rgba(0, 123, 255, 0.5)';
                                e.target.style.borderColor = '#382b7d';
                            }}
                            onBlur={(e) => {
                                e.target.style.boxShadow = 'none';
                                e.target.style.borderColor = '#ddd';
                            }}
                        />
                    </div>

                    <div className={styles.inputCards} style={{ marginBottom: '20px' }}>
                        <label style={{ fontSize: '16px', color: '#333', marginBottom: '8px' }}>Password</label>
                        <input
                            onChange={(e) => handleChangeHandler(e, 'password')}
                            value={isData.password}
                            type='password'
                            required
                            style={{
                                padding: '12px',
                                borderRadius: '8px',
                                border: '1px solid #ddd',
                                width: '100%',
                                fontSize: '14px',
                                outline: 'none',
                                transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
                            }}
                            onFocus={(e) => {
                                e.target.style.boxShadow = '0 0 8px rgba(0, 123, 255, 0.5)';
                                e.target.style.borderColor = '#382b7d';
                            }}
                            onBlur={(e) => {
                                e.target.style.boxShadow = 'none';
                                e.target.style.borderColor = '#ddd';
                            }}
                        />
                    </div>

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

                        >
                            Save
                        </button>
                    </div>

                </form>}
            </div>

        </div>

    </>


    )




}