import React, { useState, useEffect } from 'react';
import styles from '../../common/Home.module.css';
import { useDispatch } from "react-redux";
import { fetchUsers } from "../../../store/action/userAppStorage";
import { Loader } from '../../common/HomeLoader';
import { useNavigate } from 'react-router-dom';
import { Error } from "../../common/Error";
import { useSelector } from "react-redux";


export const AdminUserHistoryComponent = ({ status }) => {
  let [isLoading, setIsLoading] = useState(true)
  let [isError, setIsError] = useState(false)
  let [userList, setUserList] = useState([])
  let [filteredUsers, setfilteredUsers] = useState([])

  //initialising reduzx
  let dispatch = useDispatch()
  let navigate = useNavigate()

  let { color, user } = useSelector(state => state.userAuth)






  useEffect(() => {
    fetchAllUsers()
  }, [])




  let fetchAllUsers = async () => {
    setIsError(false)
    let res = await dispatch(fetchUsers())
    if (!res.bool) {
      setIsError(true)
      setIsLoading(false)
      return
    }
    //do some filtering here

    setUserList(res.message)
    setfilteredUsers(res.message)
    setIsLoading(false)
  }



  let searchHandler = (e) => {
    setIsLoading(true)
    if (e) {
      const newData = filteredUsers.filter((item) => {
        const itemData = item.email ? item.email : '';
        const textData = e.target.value.toLowerCase();
        return itemData.indexOf(textData) > -1;
      })
      setUserList(newData)
      setIsLoading(false)
    } else {
      setUserList(filteredUsers)
      setIsLoading(false)

    }
  }


  let depositHandler = (data) => {
    //navigate to deposits table for this user
    navigate(`/transactions/${data}`)
  }



  if (isLoading) {
    return <Loader />
  }

  if (isError) {
    return <Error />
  }



  return (<>

    <div className={styles.homeScreen} style={{ backgroundColor: color.background }}>
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
        </div>
        <div className={styles.tableContainer} >

          {userList.length === 0 && <div className={styles.emptyContainer}>
            <p>No registered users</p>
          </div>}

          {userList.length !== 0 && <table
            style={{
              borderCollapse: 'collapse',
              margin: '20px 0',
              backgroundColor: 'rgba(255, 255, 255, 0.9)', // White background with transparency
              borderRadius: '10px',
              boxShadow: '0 12px 24px rgba(0, 0, 0, 0.1)', // Sweet shadow for a modern effect
            }}
          >
            <tbody>
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
                <td
                  style={{
                    padding: '16px 20px',
                    textAlign: 'left',
                    backgroundColor: '#f9f9f9',
                    borderTopLeftRadius: '10px',
                  }}
                >
                  Email
                </td>
                <td
                  style={{
                    padding: '16px 20px',
                    textAlign: 'left',
                    backgroundColor: '#f9f9f9',
                  }}
                >
                  First Name
                </td>
                <td
                  style={{
                    padding: '16px 20px',
                    textAlign: 'left',
                    backgroundColor: '#f9f9f9',
                  }}
                >
                  Phone Number
                </td>
                <td
                  style={{
                    padding: '16px 20px',
                    textAlign: 'left',
                    backgroundColor: '#f9f9f9',
                    borderTopRightRadius: '10px',
                  }}
                >
                  Country
                </td>
              </tr>

              {userList.map(data => (
                <tr
                  key={data.__id}
                  onClick={() => depositHandler(data._id)}
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
                    {data.email}
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
                    {data.firstName}
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
                    {data.phone}
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
                    {data.nationality}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          }




        </div>



      </div>
    </div></>)




}
