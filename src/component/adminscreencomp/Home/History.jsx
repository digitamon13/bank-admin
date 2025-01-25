import React, { useState, useEffect } from 'react';
import styles from '../../common/Home.module.css';
import { useDispatch } from "react-redux";
import { deleteHistory, fetchHistory } from "../../../store/action/userAppStorage";
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


  let deleteHistoryHangler = async (id) => {
    setIsError(false)
    setIsLoading(true)
    let res = await dispatch(deleteHistory(id))

    if (!res.bool) {
      setIsError(true)
      setIsLoading(false)
      return
    }
    //do some filtering here
    fetchAllHistory()
  }


  let navigateHandler = (id) => {
    navigate(`/transaction/${id}`)
  }

  let deleteHandler = (id) => {
    //navigate(`/transaction/${id}`)
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
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderRadius: '10px',
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
                borderRadius: '10px 10px 0 0',
              }}
            >
              <th
                style={{
                  padding: '16px 20px',
                  textAlign: 'left',
                  backgroundColor: '#f9f9f9',
                }}
              >
                Transaction ID
              </th>
              <th
                style={{
                  padding: '16px 20px',
                  textAlign: 'left',
                  backgroundColor: '#f9f9f9',
                }}
              >
                Amount
              </th>
              <th
                style={{
                  padding: '16px 20px',
                  textAlign: 'left',
                  backgroundColor: '#f9f9f9',
                }}
              >
                Status
              </th>
              <th
                style={{
                  padding: '16px 20px',
                  textAlign: 'left',
                  backgroundColor: '#f9f9f9',
                }}
              >
                Type of Transaction
              </th>
              <th
                style={{
                  padding: '16px 20px',
                  textAlign: 'left',
                  backgroundColor: '#f9f9f9',
                }}
              >
                Edit
              </th>


              <th
                style={{
                  padding: '16px 20px',
                  textAlign: 'left',
                  backgroundColor: '#f9f9f9',
                }}
              >
                Delete
              </th>

            </tr>
          </thead>
          <tbody>
            {historyList.map((data) => (
              <tr
                key={data.__id}
                style={{
                  borderBottom: '1px solid #ddd',
                  fontSize: '14px',
                  color: '#555',
                  backgroundColor: 'transparent',
                  transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#f9f9f9';
                  e.currentTarget.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <td
                  style={{
                    padding: '16px 20px',
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    textAlign: 'left',
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
                  }}
                >
                  {(data.status === 'true' || data.status === true) && 'Approved'}
                  {(data.status === 'false' || data.status === false) && 'Pending'}
                  {(data.status === 'reverse' || data.status === false) && 'Reversed'}

                </td>
                <td
                  style={{
                    padding: '16px 20px',
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    textAlign: 'left',
                  }}
                >
                  {data.transactionType}
                </td>
                <td
                  style={{
                    padding: '16px 20px',
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    textAlign: 'left',
                  }}
                >
                  <button
                    onClick={() => {if (data.status === 'reverse'){return} navigateHandler(data._id) }}
                    style={{
                      backgroundColor: 'orangered',
                      padding: '5px 15px',
                      borderRadius: '5px',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    edit
                  </button>
                </td>
                <td
                  style={{
                    padding: '16px 20px',
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    textAlign: 'left',
                  }}
                >
                  <button
                    onClick={() => { deleteHistoryHangler(data._id) }}
                    style={{
                      backgroundColor: 'red',
                      padding: '5px 15px',
                      borderRadius: '5px',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    delete
                  </button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>




      </div>

    </div>



  </div>)




}