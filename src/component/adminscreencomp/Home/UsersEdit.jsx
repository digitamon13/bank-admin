import React, { useState, useEffect } from 'react';
import styles from '../../common/Home.module.css'
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';


export const AdminUserEditComponent = ({ updateHandler, }) => {
    let [isData, setIsData] = useState(null)
    let { color, usersList } = useSelector(state => state.userAuth)
    let { id } = useParams()

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
        //patch case on 
        updateHandler(isData)
    }

    useEffect(() => {
        let dataObj = usersList.find(data => data._id.toString() === id.toString())
        setIsData(dataObj)

    }, [id])



    return (<>
        <div
            className={styles.homeScreen}
            style={{
                backgroundColor: color.background,
                padding: '20px',
                fontFamily: 'Arial, sans-serif',
            }}
        >
            <div
                className={styles.timeline}
                style={{
                    backgroundColor: color.background,
                    maxWidth: '900px',
                    margin: '0 auto',
                    borderRadius: '8px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    padding: '20px',
                }}
            >
                {usersList && isData && (
                    <form
                        className={styles.editForm}
                        onSubmit={submitHandler}
                        style={{
                            display: 'grid',
                            gap: '15px',
                        }}
                    >
                        {/* Dynamic Form Fields */}
                        {[
                            { label: 'First Name', field: 'firstName' },
                            { label: 'Middle Name', field: 'middleName' },
                            { label: 'Last Name', field: 'lastName' },
                            { label: 'Email', field: 'email',readOnly:true},
                            { label: 'New Email', field: 'newEmail'},
                            { label: 'Phone Number', field: 'phone' },
                            { label: 'Date of Birth', field: 'dob' },
                            { label: 'Gender', field: 'gender' },
                            { label: 'Address', field: 'address' },
                            { label: 'City', field: 'city' },
                            { label: 'State', field: 'state' },
                            { label: 'Zip Code', field: 'zipCode' },
                            { label: 'Country', field: 'nationality' },
                            { label: 'Next of Kin Name', field: 'nokname' },
                            { label: 'Next of Kin Address', field: 'nokaddress' },
                            { label: 'Next of Kin Relationship', field: 'nokrelationship' },
                            { label: 'Next of Kin Phone', field: 'nokphone' },
                            { label: 'Next of Kin Email', field: 'nokemail' },
                            { label: 'Account Number', field: 'acountNumber' },
                            { label: 'Account Balance', field: 'accountBalance', type: 'number' },
                            { label: 'Account Type', field: 'acctType' },
                            { label: 'Currency', field: 'currency' },
                            { label: 'Pin Number', field: 'pinNumber' },
                            { label: 'Password', field: 'password', type: 'password' },
                            { label: 'Password Confirmation', field: 'password_confirmation', type: 'password' },
                            { label: 'Tax Code', field: 'taxCode' },
                            { label: 'Otp Code', field: 'otpCode' },
                        ].map(({ label, field, type = 'text', readOnly = false }) => (
                            <div
                                key={field}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}
                            >
                                <label
                                    style={{
                                        marginBottom: '5px',
                                        fontSize: '14px',
                                        color: '#555',
                                    }}
                                >
                                    {label}
                                </label>
                                <input
                                    type={type}
                                    value={isData[field]}
                                    onChange={(e) => handleChangeHandler(e, field)}
                                    readOnly={readOnly}
                                    style={{
                                        padding: '10px',
                                        borderRadius: '5px',
                                        border: '1px solid #ddd',
                                        width: '100%',
                                        transition: 'box-shadow 0.3s ease-in-out',
                                    }}
                                    onFocus={(e) => (e.target.style.boxShadow = '0 0 5px rgba(0, 0, 255, 0.2)')}
                                    onBlur={(e) => (e.target.style.boxShadow = 'none')}
                                />
                            </div>
                        ))}

                        {/* Dropdowns */}
                        {[
                            { label: 'Tax Verified', field: 'taxVerified' },
                            { label: 'Otp Verified', field: 'otpVerified' },
                            { label: 'Account Status', field: 'isAccountStatus' },
                        ].map(({ label, field }) => (
                            <div
                                key={field}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}
                            >
                                <label
                                    style={{
                                        marginBottom: '5px',
                                        fontSize: '14px',
                                        color: '#555',
                                    }}
                                >
                                    {label}
                                </label>
                                <select
                                    value={isData[field]}
                                    onChange={(e) => handleChangeHandler(e, field)}
                                    style={{
                                        padding: '10px',
                                        borderRadius: '5px',
                                        border: '1px solid #ddd',
                                        width: '100%',
                                        transition: 'box-shadow 0.3s ease-in-out',
                                    }}
                                    onFocus={(e) => (e.target.style.boxShadow = '0 0 5px rgba(0, 0, 255, 0.2)')}
                                    onBlur={(e) => (e.target.style.boxShadow = 'none')}
                                >
                                    <option value={true}>Active</option>
                                    <option value={false}>Inactive</option>
                                </select>
                            </div>
                        ))}

                        {/* Profile and Verification */}
                        <div className={styles.inputCards}>
                            <label>Profile Photo</label>
                            {isData.profilePhoto && (

                                <img
                                    src={isData.profilePhoto}
                                    alt="Profile"
                                    style={{ width: window.innerWidth <= 768 ? '100%' : '50%' }}
                                />

                            )}
                        </div>

                        {/* Buttons */}
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                            }}
                        >
                            <button
                                type="submit"
                                style={{
                                    backgroundColor: '#382b7d',
                                    color: '#fff',
                                    padding: '10px 20px',
                                    borderRadius: '5px',
                                    border: 'none',
                                    cursor: 'pointer',
                                    transition: 'background-color 0.3s ease',
                                }}
                                onMouseEnter={(e) => (e.target.style.backgroundColor = '#0056b3')}
                                onMouseLeave={(e) => (e.target.style.backgroundColor = '#382b7d')}
                            >
                                Update
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>





    </>)




}