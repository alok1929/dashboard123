import React, { useState } from 'react';
import aliasNames from './aliasNames.json';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const NewGridComponent = ({ newdetailedData, setnewDetailedData }) => {
  const [newKeys, setnewKeys] = useState({});
  const [updateHistory, setUpdateHistory] = useState([]);
  const [contractStartDate, setContractStartDate] = useState(null);
  const [contractEndDate, setContractEndDate] = useState(null);

  const handleInputChange = (key, value) => {
    setnewKeys((prevKeys) => ({
      ...prevKeys,
      [key]: value,
    }));
  };

  const parseDate = (dateString) => {
    if (!dateString) {
      // Handle the case where dateString is undefined or null
      return null;
    }
  
    const [day, month, year] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day);
  };
  
  
  const handleSaveClick = () => {
    try {
      const updatedHistory = [];
  
      // Create a new item with user-entered values
      const newItem = {};
      Object.entries(newKeys).forEach(([key, value]) => {
        newItem[key] = value;
      });
  
      // Update the detailedData with the new item
      const updatedDetailedData = [...newdetailedData, newItem];
  
      // Update the updateHistory with a description of the new contract
      const description = `New contract added: ${Object.entries(newKeys)
        .map(([key, value]) => `${aliasNames[key] || key}: ${value}`)
        .join(', ')}`;
  
      updatedHistory.push({
        user: 'Ravi NM',
        timestamp: new Date().toISOString(),
        description: description,
        comment:  'New contract added',
      });
      if (contractStartDate !== null) {
        updatedHistory.push({
          user: 'Ravi NM',
          timestamp: new Date().toISOString(),
          description: description,
          description: `Contract Start Date  ${contractStartDate.toLocaleDateString()}`,

          comment:  'Correcting as per contract',
        });
      }
  
      if (contractEndDate !== null) {
        updatedHistory.push({
          user: 'Ravi NM',
          timestamp: new Date().toISOString(),
          description: description,
          description: `Contract End Date  ${contractStartDate.toLocaleDateString()}`,
          comment:'Correcting as per contract',
        });
      }
  
      setnewDetailedData(updatedDetailedData);
  
      // Update the overall updateHistory state
      setUpdateHistory((prevHistory) => [...prevHistory, ...updatedHistory]);
      console.log('Update History:', updatedHistory);
    } catch (error) {
      console.error('Error updating history:', error);
    }
  
    // Clear the input values
    setnewKeys({});
  };
  

  return (
      <div>
        {Array.isArray(newdetailedData) && newdetailedData.length > 0 ? (
          <div className="">
            <div className="grid grid-cols-4 grid-rows-4">
              {Object.keys(newdetailedData[0]).map((key, innerIndex) => (
                // Add a filter condition here
                key !== 'technology' &&
                key !== 'region' &&
                key !== 'plant' &&
                key !== 'contractName' &&
                key !== 'isActive' &&
                key !== 'updateHistory' && (
                  <div key={innerIndex} className="bg-gray-200  inline-block m-4 py-2 rounded-lg">
                    <div className="flex-col px-2">
                      <div>
                        <div className="flex flex-col">
                          <div className='px-1 text-sm font-bold'>{aliasNames[key]||key}:</div>
                          <div>
                          {key === 'contractStartDate' || key === 'contractEndDate' ? (
                                <DatePicker
                                  selected={
                                    key === 'contractStartDate'
                                      ? contractStartDate || parseDate(newKeys[key])
                                      : contractEndDate || parseDate(newKeys[key])
                                  }
                                  onChange={(date) => key === 'contractStartDate' ? setContractStartDate(date) : setContractEndDate(date)}
                                  dateFormat="dd-MM-yyyy"
                                  className="edit-grid-input"
                                />
                          ):(
                            <div className=' w-4/6  px-1 '>
                              <span className="text-md ">
                                <textarea
                                  type="text"
                                  placeholder={`Enter ${key}`}
                                  className=''
                                  value={newKeys[key] || ''}
                                  onChange={(e) => handleInputChange(key, e.target.value)}
                                />
                              
                              </span>
                            </div>
                )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              ))}
            </div>
    
            <div className='px-5 flex'>
              <div className='w-3/4'>
                
              </div>
              <div className='px-4 py-6'>
                <button
                  className='bg-yellow-600 text-white px-10 py-2 rounded-xl'
                  onClick={handleSaveClick}
                > Create New Contract</button>
              </div>
            </div>
          </div>
        ) : (
          <p className="edit-grid-loading"></p>
        )}
      </div>
    );
    
};

export default NewGridComponent;
