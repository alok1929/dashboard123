import React, { useState } from 'react';
import aliasNames from './aliasNames.json';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const EditGridComponent = ({ edetailedData, seteDetailedData }) => {
  const [editedValues, setEditedValues] = useState({});
  const [editingKey, setEditingKey] = useState(null);
  const [updateHistory, setUpdateHistory] = useState([]);
  const [contractStartDate, setContractStartDate] = useState(null);
  const [contractEndDate, setContractEndDate] = useState(null);

  const handleInputChange = (key, value) => {
    setEditedValues((prevValues) => ({
      ...prevValues,
      [key]: value,
    }));
  };

 
  const parseDate = (dateString) => {
    const [day, month, year] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day); 
  };
  


  const handleEditClick = (key, value) => {
    setEditingKey(key);
    setEditedValues((prevValues) => ({
      ...prevValues,
      [key]: value,
    }));
  };

  const handleSaveClick = () => {
    const comment = document.getElementById('textareaUser').value;

    try {
      const updatedHistory = [];

      Object.keys(editedValues).forEach(key => {
        const prevValue = edetailedData.find(item => item[key] !== undefined)[key];
        const currentValue = editedValues[key];

        // Update the detailedData with the new value
        const updatedDetailedData = edetailedData.map(item =>
          item[key] !== undefined ? { ...item, [key]: currentValue } : item
        );

        // Update the updateHistory for each key
        const description = `${key} corrected from ${prevValue === undefined ? 'undefined' : prevValue} to ${currentValue === undefined ? 'undefined' : currentValue}`;
        updatedHistory.push({
          user: 'Ravi NM',
          timestamp: new Date().toISOString(),
          description,
          comment: comment || 'Correcting as per contract',
        });

        seteDetailedData(updatedDetailedData);
      });

      // Include contractStartDate and contractEndDate in the updatedHistory if they are defined
      if (contractStartDate !== null) {
        updatedHistory.push({
          user: 'Ravi NM',
          timestamp: new Date().toISOString(),
          description: `Contract Start Date corrected to ${contractStartDate.toLocaleDateString()}`,
          comment: comment || 'Correcting as per contract',
        });
      }
  
      if (contractEndDate !== null) {
        updatedHistory.push({
          user: 'Ravi NM',
          timestamp: new Date().toISOString(),
          description: `Contract End Date corrected to ${contractEndDate.toLocaleDateString()}`,
          comment: comment || 'Correcting as per contract',
        });
      }

      // Update the overall updateHistory state
      setUpdateHistory(prevHistory => [...prevHistory, ...updatedHistory]);
      console.log('Update History:', updatedHistory);
    } catch (error) {
      console.error('Error updating history:', error);
    }

    // Handle saving the edited values
    console.log('Saving edited values:', editedValues);
    setEditingKey(null);

  };

  return (
    <div>
      {Array.isArray(edetailedData) ? (
        edetailedData.length > 0 ? (
          <div className="">
            {edetailedData.map((item, index) => (
              <div key={index} className="grid grid-cols-4 grid-rows-4">
                {Object.entries(item)
                  .filter(([key, value]) =>
                    value !== 'false' &&
                    key !== 'technology' &&
                    key !== 'region' &&
                    key !== 'plant' &&
                    key !== 'contractName' &&
                    key !== 'isActive' &&
                    key !== 'updateHistory'
                  )
                  .map(([key, value], innerIndex) => (
                    <div key={innerIndex} className="bg-gray-200 w-11/12 h-24  inline-block m-4 py-2 rounded-lg">
                      <div className="flex-col px-2">
                        <div>
                            <div className="flex flex-col">
                              <div className=' text-sm px-1'>{aliasNames[key] || key}:</div>
                              <div className=''>
                                {key === 'contractStartDate' || key === 'contractEndDate' ? (
                                  <DatePicker
                                    selected={
                                      key === 'contractStartDate'
                                        ? contractStartDate || parseDate(item[key])
                                        : contractEndDate || parseDate(item[key])
                                    }
                                    onChange={(date) => key === 'contractStartDate' ? setContractStartDate(date) : setContractEndDate(date)}
                                    dateFormat="dd-MM-yyyy"
                                    className="edit-grid-input"
                                  />
                                ) : (
                                  editedValues[key] !== undefined ? (
                                    <textarea
                                      type="text"
                                      value={editedValues[key]}
                                      onChange={(e) => handleInputChange(key, e.target.value)}
                                      className="edit-grid-input"
                                    />
                                  ) : (
                                    <div className='hover:text-xl w-full px-2' onClick={() => handleEditClick(key, value)}>
                                      <span className=" text-md"
                                        style={{ wordBreak: 'break-all', overflowWrap: 'break-word', overflow: 'scroll' }}>
                                        {typeof value === 'object' ? JSON.stringify(value, null, 2) : value}
                                      </span>
                                    </div>
                                  )
                                  )}
                              </div>
                            </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            ))}
            <div className='px-5 flex'>
              <div className='w-3/4'>
                <textarea
                  className='w-5/6 h-28 rounded-lg px-2 py-2 bg-slate-200'
                  defaultValue="Enter user comment"
                  id="textareaUser"></textarea>
              </div>
              <div className='px-4 py-6'>
                <button
                  className='bg-yellow-600 text-white px-10 py-2 rounded-xl'
                  onClick={() => {
                    handleSaveClick();
                  }}
                > Edit</button>
              </div>
            </div>

          </div>
        ) : (
          <p>No data available for the selected filters</p>
        )
      ) : (
        <p className="edit-grid-loading">
          Loading
        </p>
      )}
    </div>
  );
};

export default EditGridComponent;
