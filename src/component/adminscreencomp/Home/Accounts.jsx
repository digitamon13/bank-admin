import React, { useState, useEffect } from 'react';
import styles from '../../common/Home.module.css';
import { useDispatch } from "react-redux";
import { deleteAccount, fetchAccounts } from "../../../store/action/userAppStorage";
import { Loader } from '../../common/HomeLoader';
import { useNavigate, useParams } from 'react-router-dom';
import { Error } from "../../common/Error";
import { useSelector } from "react-redux";




export const AdminAccountComponent = ({ status }) => {
    let [isLoading, setIsLoading] = useState(true)
    let [isError, setIsError] = useState(false)
    let [accountList, setAccountList] = useState([])
    let [filteredAccounts, setfilteredAccounts] = useState([])

    //initialising reduzx
    let dispatch = useDispatch()
    let navigate = useNavigate()

    let { color } = useSelector(state => state.userAuth)
    let { user } = useParams()

    useEffect(() => {
        fetchAllAccounts()
    }, [])


    let fetchAllAccounts = async () => {
        setIsError(false)
        let res = await dispatch(fetchAccounts(user))

        if (!res.bool) {
            setIsError(true)
            setIsLoading(false)
            return
        }
        //do some filtering here

        setAccountList(res.message)
        setfilteredAccounts(res.message)
        setIsLoading(false)
    }



    let editHandler = (id) => {
        //navigate to the next page
        navigate(`/new-account/${id}`)
    }




    let deleteHandler = async (id) => {
        //delete this specific case from server
       
        setIsLoading(true)
        setIsError(false)
        let res = await dispatch(deleteAccount(id))
        if (!res.bool) {
            setIsError(true)
            setIsLoading(false)
            return
        }

        //filtering the already list

        let filteredArray = accountList.filter(data => data._id !== id)
        setAccountList(filteredArray)
        setfilteredAccounts(filteredArray)
        setIsLoading(false)

    }


    let searchHandler = (e) => {
        setIsLoading(true)
        if (e) {
            const newData = filteredAccounts.filter((item) => {
                const itemData = item.email ? item.email : '';
                const textData = e.target.value.toLowerCase();
                return itemData.indexOf(textData) > -1;
            })
            setAccountList(newData)
            setIsLoading(false)
        } else {
            setAccountList(filteredAccounts)
            setIsLoading(false)
        }
    }


    let createAccountHandler = () => {
        navigate(`/account-form/${user}`)
    }


    if (isLoading) {
        return <Loader />
    }

    if (isError) {
        return <Error />
    }


    return (<div className={styles.homeScreen} style={{ backgroundColor: color.background }}>

        <div className={styles.timeline} style={{ backgroundColor: color.background }}>
            <div className={styles.filter}>
                <div className={styles.searchContainer}>
                    <div className={styles.searchBar}>
                        < input className={styles.input} placeholder='search by email' onChange={searchHandler} />
                        <span className='material-icons'>
                            search
                        </span>

                    </div>
                </div>


                <button className={styles.buttons} onClick={createAccountHandler}>Create Account</button>
            </div>

            <h2>Accounts of this client</h2>
            <div className={styles.tableContainer} >

                {accountList.length === 0 && <div className={styles.emptyContainer}>
                    <p>No account found</p>
                </div>}

                {accountList.length !== 0 && <table>
                    <tbody>
                        <tr>
                            <td>
                                Account Type
                            </td>
                            <td>
                                Account Number
                            </td>
                            <td>
                                delete
                            </td>
                        </tr>



                        {accountList.map(data => <tr key={data.__id} onClick={() => editHandler(data._id)} >
                            <td>
                                {data.accountType}
                            </td>
                            <td>
                                {data.accountNumber}

                            </td>

                        
                            <td onClick={() => deleteHandler(data._id)}>
                                <span className='material-icons'> delete</span>
                            </td>
                        </tr>)}


                    </tbody>
                </table>}

            </div>
        </div>



    </div>)




}
