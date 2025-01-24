import React, { useState, useEffect } from 'react';
import styles from '../../common/Home.module.css';
import { useDispatch } from "react-redux";
import { fetchHistory } from "../../../store/action/userAppStorage";
import { Loader } from '../../common/HomeLoader';
import { useNavigate, useParams } from 'react-router-dom';
import { Error } from "../../common/Error";
import { useSelector } from "react-redux";


export const AdminHistoryComponent = ({ status }) => {
    let [isLoading, setIsLoading] = useState(true)
    let [isError, setIsError] = useState(false)
    let [historyList, setHistoryList] = useState([])
    let [filteredHistory, setfilteredHistory] = useState([])

    //initialising reduzx
    let dispatch = useDispatch()
    let navigate = useNavigate()

    let { color } = useSelector(state => state.userAuth)
    let { user } = useParams()



    useEffect(() => {
        fetchAllHistory()
    }, [])

    let fetchAllHistory = async () => {
        setIsError(false)
        let res = await dispatch(fetchHistory(user))

        if (!res.bool) {
            setIsError(true)
            setIsLoading(false)
            return
        }
        //do some filtering here

        setHistoryList(res.message)
        setfilteredHistory(res.message)
        setIsLoading(false)
    }



    let navigateHandler = (id) => {
        navigate(`/transaction/${id}`)
    }



    let searchHandler = (e) => {
        setIsLoading(true)

        if (e) {
            const newData = filteredHistory.filter((item) => {
                const itemData = item.id ? item.id : '';
                const textData = e.target.value.toLowerCase();
                return itemData.indexOf(textData) > -1;
            })

            setHistoryList(newData)
            setIsLoading(false)
        } else {
            setfilteredHistory(filteredHistory)
            setIsLoading(false)

        }
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
                        < input className={styles.input} placeholder='search by ID' onChange={searchHandler} />
                        <span className='material-icons'>
                            search
                        </span>

                    </div>

                </div>

                <div className={styles.dateFilter}>
                </div>

            </div>

            <div className={styles.tableContainer} >
            <table
  style={{
    borderCollapse: 'collapse',
    margin: '20px 0',
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // White background with transparency
    borderRadius: '10px',
    boxShadow: '0 12px 24px rgba(0, 0, 0, 0.1)', // Sweet shadow for a modern effect
  }}
>
  <thead>
    <tr
      style={{
        textAlign: 'left',
        fontWeight: 'bold',
        fontSize: '16px',
        color: '#444',
        backgroundColor: '#fafafa',
        borderRadius: '10px 10px 0 0', // Rounded top corners
      }}
    >
      <th
        style={{
          padding: '16px 20px',
          width: '25%',
          textAlign: 'left',
          backgroundColor: '#f9f9f9',
          borderTopLeftRadius: '10px',
        }}
      >
        Transaction ID
      </th>
      <th
        style={{
          padding: '16px 20px',
          width: '25%',
          textAlign: 'left',
          backgroundColor: '#f9f9f9',
        }}
      >
        Amount
      </th>
      <th
        style={{
          padding: '16px 20px',
          width: '25%',
          textAlign: 'left',
          backgroundColor: '#f9f9f9',
        }}
      >
        Status
      </th>
      <th
        style={{
          padding: '16px 20px',
          width: '25%',
          textAlign: 'left',
          backgroundColor: '#f9f9f9',
          borderTopRightRadius: '10px',
        }}
      >
        Type of Transaction
      </th>
    </tr>
  </thead>
  <tbody>
    {historyList.map((data) => (
      <tr
        key={data.__id}
        onClick={() => { navigateHandler(data._id) }}
        style={{
          borderBottom: '1px solid #ddd',
          fontSize: '14px',
          color: '#555',
          backgroundColor: 'transparent',
          transition: 'background-color 0.3s ease, box-shadow 0.3s ease', // Smooth transition for hover
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#f9f9f9';
          e.currentTarget.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.2)'; // Shadow effect on hover
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
          e.currentTarget.style.boxShadow = 'none'; // Reset shadow when not hovered
        }}
      >
        <td
          style={{
            padding: '16px 20px',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            textAlign: 'left',
            width: '25%',
          }}
        >
          {data.transaction_number}
        </td>
        <td
          style={{
            padding: '16px 20px',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            textAlign: 'left',
            width: '25%',
          }}
        >
          ${data.amount}
        </td>
        <td
          style={{
            padding: '16px 20px',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            textAlign: 'left',
            width: '25%',
          }}
        >
          {(data.status === 'true' || data.status === true) ? 'Approved' : 'Pending'}
        </td>
        <td
          style={{
            padding: '16px 20px',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            textAlign: 'left',
            width: '25%',
          }}
        >
          {data.transactionType}
        </td>
      </tr>
    ))}
  </tbody>
</table>


            </div>




        </div>



    </div>)




}