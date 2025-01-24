import React, { useState, useEffect } from 'react';
import styles from '../../common/Home.module.css';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { jsPDF } from 'jspdf'; // Importing jsPDF for PDF functionality

export const AdminHistoryEditComponent = ({ updateHandler }) => {
  const [isData, setIsData] = useState({});
  const { color, historyList } = useSelector((state) => state.userAuth);
  const { id } = useParams();

  // For dynamic background color and text customization
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [textColor, setTextColor] = useState('#333333');

  // Handle field change
  const handleChangeHandler = (e, nameField) => {
    const val = e.target.value;
    setIsData((prev) => {
      const newData = { ...prev, [nameField]: val };
      return newData;
    });
  };

  // Handle form submission
  const submitHandler = (e) => {
    e.preventDefault();
    updateHandler(isData);
  };

  // Load data on component mount or when `id` changes
  useEffect(() => {
    const dataObj = historyList.find((data) => data._id.toString() === id.toString());
    setIsData(dataObj || {});
  }, [id, historyList]);

  // Function to print PDF
  const handlePrintPDF = () => {
    const doc = new jsPDF();
    const printContent = document.getElementById('print-div');
  
    // Set the page size and margin
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 10;
  
    // Use the `html` method to render the content, scaling it appropriately
    doc.html(printContent, {
      callback: function (doc) {
        doc.save('receipt.pdf');
      },
      margin: [margin, margin, margin, margin], // Set the margins
      x: margin,
      y: margin,
      width: pageWidth - 2 * margin, // Ensuring content fits within page width
      windowWidth: pageWidth, // Setting the window width for scaling
    });
  };
  

  return (
    <>
      <div style={{ backgroundColor: backgroundColor, textAlign: 'left', padding: '20px' }}>
        <div style={{ backgroundColor, padding: '0px' }}>
          {historyList && isData && (
            <form
              className={styles.editForm}
              onSubmit={submitHandler}
              style={{
                maxWidth: '600px',
                margin: '20px auto',
                padding: '20px',
                backgroundColor: '#fff',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                marginBottom: '100px',
              }}
            >
              <h2>Basic Info</h2>

              {/* Input fields */}
              {['transactionType', 'status', 'date', 'time', 'duration', 'accountNumber', 'accountName', 'amount', 'recieptFor', 'reason'].map((field) => (
                <div key={field} className={styles.inputCards} style={{ marginBottom: '15px' }}>
                  <label>{field.replace(/([A-Z])/g, ' $1').toUpperCase()}</label>
                  {field === 'status' ? (
                    <select
                      onChange={(e) => handleChangeHandler(e, field)}
                      value={isData[field]}
                      style={{
                        width: '100%',
                        padding: '8px',
                        borderRadius: '4px',
                        backgroundColor: '#f5f5f5',
                      }}
                    >
                      <option value="true">True</option>
                      <option value="false">False</option>
                    </select>
                  ) : (
                    <input
                      value={isData[field]}
                      onChange={(e) => handleChangeHandler(e, field)}
                      type={field === 'amount' ? 'number' : 'text'}
                      readOnly={field === 'transactionType'}
                      style={{ width: '100%', padding: '8px', borderRadius: '4px' }}
                    />
                  )}
                </div>
              ))}

              {/* Background Color Picker */}
              <div className={styles.inputCards} style={{ marginBottom: '15px' }}>
                <label>Choose Background Color</label>
                <input
                  type="color"
                  value={backgroundColor}
                  onChange={(e) => setBackgroundColor(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px',
                    borderRadius: '4px',
                    backgroundColor: '#f5f5f5',
                  }}
                />
              </div>

              {/* Text Color Picker */}
              <div className={styles.inputCards} style={{ marginBottom: '15px' }}>
                <label>Choose Text Color</label>
                <input
                  type="color"
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px',
                    borderRadius: '4px',
                    backgroundColor: '#f5f5f5',
                  }}
                />
              </div>

              {/* Submit Button */}
              <div className={styles.buttonContainer} style={{ textAlign: 'center', width: '100%' }}>
                <button
                  type="submit"
                  style={{
                    backgroundColor: '#382b7d',
                    color: 'white',
                    padding: '10px 20px',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: '16px',
                  }}
                >
                  Update
                </button>
              </div>
            </form>
          )}

          {/* Receipt Preview Area */}
         
<div
  style={{
    fontFamily: 'Arial, sans-serif',
    color: textColor,
    backgroundColor: backgroundColor,
    padding: '30px',
    borderRadius: '12px',
    margin: '20px auto',
    width: '90%', // Adjust width to be more responsive
    maxWidth: '700px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
    lineHeight: '1.8',
    position: 'relative',
    transition: 'all 0.3s ease',
  }}
>
  <div id="print-div" style={{ width: '100%' }}>
    {isData.accountName && (
      <p
        style={{
          marginBottom: '12px',
          fontSize: '18px',
          fontWeight: 'bold',
        }}
      >
        Dear <span style={{ color: '#382b7d' }}>{isData.recieptFor}</span>
      </p>
    )}

    <p style={{ marginBottom: '24px', fontSize: '16px', color: '#555' }}>
      <strong style={{ fontSize: '18px', color: '#382b7d' }}>
        glitexfiance.net Bank Electronic Notification Service
      </strong>
      <br />
      We wish to inform you that a{' '}
      {isData.transactionType && (
        <span style={{ fontWeight: 'bold', color: '#382b7d' }}>
          {isData.transactionType}
        </span>
      )}{' '}
      transaction occurred on your account with us.
      <br />
      The details of this transaction are shown below:
    </p>

    <p
      style={{
        fontWeight: 'bold',
        marginBottom: '12px',
        fontSize: '17px',
        color: '#333',
        textDecoration: 'underline',
      }}
    >
      Transaction Notification
    </p>

    <div style={{ fontSize: '15px', color: '#444' }}>
      {isData.accountNumber && (
        <p>
          <strong>Account Number:</strong> ******{isData.accountNumber?.slice(-4)}
        </p>
      )}
      {isData.accountName && (
        <p>
          <strong>Account Name:</strong> {isData.accountName}
        </p>
      )}
      <p>
        <strong>Description:</strong> {isData.transactionType} ALERT TYPE
      </p>
      {isData.amount && (
        <p>
          <strong>Amount:</strong> ${isData.amount}
        </p>
      )}
      {isData.date && (
        <p>
          <strong>Value Date:</strong> {isData.date}
        </p>
      )}
      {isData.time && (
        <p>
          <strong>Time of Transaction:</strong> {isData.time}
        </p>
      )}
      {isData.transaction_number && (
        <p>
          <strong>Document Number:</strong> {isData.transaction_number}
        </p>
      )}
      {isData.duration && (
        <p>
          <strong>Duration:</strong> Transaction timeframe {isData.duration} working days
        </p>
      )}
    </div>
  </div>

  {/* Button to download PDF */}
  <button
    onClick={handlePrintPDF}
    style={{
      position: 'absolute',
      top: '100%',
      right: '10px',
      padding: '12px 20px',
      fontSize: '16px',
      backgroundColor: '#382b7d',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      marginTop: '20px',
      transition: 'all 0.3s ease',
    }}
    onMouseEnter={(e) => (e.target.style.backgroundColor = '#5e3b8d')}
    onMouseLeave={(e) => (e.target.style.backgroundColor = '#382b7d')}
  >
    Download Receipt as PDF
  </button>
</div>
        </div>
      </div>
    </>
  );
};




