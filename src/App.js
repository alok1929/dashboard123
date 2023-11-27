import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import DataGridComponent from './dataGridComp';
import EditGridComponent from './EditGridComp';
import UpdateGridComponent from './updateGridComp';
import NewGridComponent from './newGridComp';
import EditedSvg from './editedsvg';
import UpdatedSvg from './updatedsvg';
import NewContractsvg from './newContractsvg';

Modal.setAppElement('#root');

const RegionDropdownComponent = () => {
  const [regionsData, setRegionsData] = useState({});
  const [regions, setRegions] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedTechnology, setSelectedTechnology] = useState('');
  const [selectedPlant, setSelectedPlant] = useState('');
  const [contractName, setContractName] = useState('');
  const [econtractName, seteContractName] = useState('');
  const [isActive, setActive] = useState('');
  const [detailedData, setDetailedData] = useState(null);
  const [edetailedData, seteDetailedData] = useState(null);
  const [udetailedData, setuDetailedData] = useState(null);
  const [newdetailedData, setnewDetailedData] = useState(null);
  const [detailedActive, setDetailedActive] = useState(null);
  const [modalIsOpen, setModalOpen] = useState(false);
  const [updatemodalIsOpen, updatesetModalOpen] = useState(false);
  const [newmodalIsOpen, newsetModalOpen] = useState(false);
  const [isSearchPerformed, setSearchPerformed] = useState(false);
  const [showGrid, setShowGrid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const openUpdateModal = () => {
    updatesetModalOpen(true);
  };

  const closeUpdateModal = () => {
    updatesetModalOpen(false);
  };

  const opennewModal = () => {
    newsetModalOpen(true);
  };

  const closenewModal = () => {
    newsetModalOpen(false);
  };

  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const response = await axios.get('/demo.json');
        setRegionsData(response.data);
        const regionNames = Object.keys(response.data);
        setRegions(regionNames);
      } catch (error) {
        console.error('Error fetching region data:', error);
      }
    };

    fetchRegions();
  }, []);

  const handleSearch = async () => {
    try {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 2000));
      const response = await axios.get('/search.json');
      console.log("got search.json");
      let dataForSelectedRegion = response.data.data;

      if (selectedRegion) {
        dataForSelectedRegion = dataForSelectedRegion.filter(
          (item) => item.region === selectedRegion
        );
      }

      if (selectedTechnology) {
        dataForSelectedRegion = dataForSelectedRegion.filter(
          (item) => item.technology === selectedTechnology
        );
      }

      if (selectedPlant) {
        dataForSelectedRegion = dataForSelectedRegion.filter(
          (item) => item.plant === selectedPlant
        );

        setDetailedActive(dataForSelectedRegion);
        const activestatus = dataForSelectedRegion.find((item) => item.isActive);
        setActive(activestatus ? activestatus.isActive : '');

        setDetailedData(dataForSelectedRegion);
        const contractNameItem = dataForSelectedRegion.find(
          (item) => item.contractName
        );
        seteDetailedData(dataForSelectedRegion);
        const econtractNameItem = dataForSelectedRegion.find(
          (item) => item.contractName
        );
        setuDetailedData(dataForSelectedRegion);
        const ucontractNameItem = dataForSelectedRegion.find(
          (item) => item.contractName
        );
        setnewDetailedData(dataForSelectedRegion);
        const newcontractNameItem = dataForSelectedRegion.find(
          (item) => item.contractName
        );
        setContractName(contractNameItem ? contractNameItem.contractName : '');
        setContractName(econtractNameItem ? econtractNameItem.contractName : '');
        setContractName(ucontractNameItem ? ucontractNameItem.contractName : '');
        setContractName(newcontractNameItem ? newcontractNameItem.contractName : '');

        setShowGrid(true);
        setSearchPerformed(true);
        setIsLoading(false);

      }
    } catch (error) {
      console.error('Error fetching detailed data:', error);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className='flex flex-col justify-center items-center p-6 font-medium text-2xl bg-slate-200 px-12'>
        Contracts & Warranties
      </div>
      <div className='flex justify-center items-center py-10 space-x-20 bg-slate-200'>
        <label htmlFor='regions' className=''></label>
        <select
          id='regions'
          className='rounded-lg p-3'
          onChange={(e) => {
            setSelectedRegion(e.target.value);
          }}
        >
          <option value='' className=''>
            Region
          </option>
          {regions.map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>

        <label htmlFor='technologies'></label>
        <select
          id='technologies'
          className='rounded-lg p-3'
          onChange={(e) => {
            setSelectedTechnology(e.target.value);
          }}
        >
          <option value=''>Technology</option>
          {selectedRegion &&
            regionsData[selectedRegion] &&
            Object.keys(regionsData[selectedRegion]).map((technology) => (
              <option key={technology} value={technology}>
                {technology}
              </option>
            ))}
        </select>

        <label htmlFor='plants'></label>
        <select
          id='plants'
          className='rounded-lg p-3'
          onChange={(e) => {
            setSelectedPlant(e.target.value);
          }}
        >
          <option value=''>Plants</option>
          {selectedRegion &&
            selectedTechnology &&
            regionsData[selectedRegion][selectedTechnology] &&
            regionsData[selectedRegion][selectedTechnology].map((plant) => (
              <option key={plant} value={plant}>
                {plant}
              </option>
            ))}
        </select>

        <div className='px-5'>
          <button
            className='text-white
           bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-6 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>

      {isSearchPerformed && showGrid ? (
        <div className='flex justify-between px-10 py-10 '>
          <div className='text-2xl py-3'>Contracts</div>
          <div>
            <button
              className='bg-gray-400 p-3 rounded-lg'
              onClick={opennewModal}
            >
              Create New Contract
            </button>
            <Modal
              isOpen={newmodalIsOpen}
              onRequestClose={closenewModal}
              contentLabel='Edit Modal'
            >
              <div>
                <div className='flex justify-end'>
                  <button
                    type='button'
                    className='text-2xl font-bold hover:shadow-xl  rounded-2xl p-2 '
                    onClick={closenewModal}
                  >
                    X
                  </button>
                </div>
                <div>
                  <div class='flex'>
                    <div class='flex-none p-4'>
                      <span class='bg-gray-500 p-6 text-white px-4 py-2 rounded-xl'>
                        Create Contract Mode
                      </span>
                    </div>
                    <div class='flex-grow flex justify-center items-center p-4'>
                      <div className='mr-24  mb-4  text-xl font-medium'>
                        Create New Contract
                      </div>
                    </div>
                  </div>
                  {/* this is the grid component for the new page*/}
                  <NewGridComponent
                    newdetailedData={newdetailedData}
                    setnewDetailedData={setnewDetailedData}
                  />
                </div>
              </div>
            </Modal>
          </div>
        </div>
      ) : isLoading ? (
        <div className='flex justify-center items-center py-8'>
          <div className=' p-10 text-2xl font-medium bg-slate-300 rounded-xl  mt-6 animate-bounce w-4/5 text-center'>
            Loading
          </div>
        </div>
      ) : (
        <div className='flex justify-center items-center py-8'>
          <div className=' p-10 text-xl font-medium bg-slate-300 rounded-xl  mt-6 '>
            Choose Regions, Technology, and Plant from the dropdowns.
          </div>
        </div>
      )}

      {isSearchPerformed && showGrid && (
        <div className='px-4 m-6  bg-slate-300 rounded-2xl mt-6'>
          <div class='flex'>
            <div class='flex-none p-4 py-5 px-2'>
              {isActive === 'true' ? (
                <button class='bg-green-500 p-6 text-white px-4 py-2 rounded-xl'>
                  Active
                </button>
              ) : null}
            </div>
            <div class='flex-grow flex justify-center items-center p-4'>
              <div className='mr-10 mb-3 text-2xl font-medium'>
                {contractName && (
                  <h1 className=' py-4 text-xl font-semibold'>{contractName}</h1>
                )}
              </div>
            </div>
            <div className='flex justify-end py-6 space-x-5'>
              {isSearchPerformed && showGrid && (
                <div className='space-x-4'>
                  <button
                    onClick={openUpdateModal}
                    class='bg-green-800 p-6 text-white px-4 py-2 rounded-lg'
                  >
                    Update
                  </button>

                  {/*update modal starting */}
                  <Modal
                    isOpen={updatemodalIsOpen}
                    onRequestClose={closeUpdateModal}
                    contentLabel='Edit Modal'
                  >
                    <div>
                      <div className='flex justify-end'>
                        <button
                          type='button'
                          className='text-2xl font-bold hover:shadow-xl  rounded-2xl p-2 '
                          onClick={closeUpdateModal}
                        >
                          X
                        </button>
                      </div>
                      <div>
                        <div class='flex'>
                          <div class='flex-none p-4'>
                            <span class='bg-green-800 p-6 text-white px-4 py-2 rounded-lg'>
                              Update Mode
                            </span>
                          </div>
                          <div class='flex-grow flex justify-center items-center p-4'>
                            <div className='mr-10 mb-4  text-2xl font-medium'>
                              {contractName}
                            </div>
                          </div>
                        </div>

                        {/* this is the grid component for the edit page*/}
                        <UpdateGridComponent
                          udetailedData={udetailedData}
                          setuDetailedData={setuDetailedData}
                        />
                      </div>
                    </div>
                  </Modal>
                  {/*update modal ending*/}

                  <button
                    class='bg-yellow-600 p-6 text-white px-4 py-2 rounded-lg'
                    onClick={openModal}
                  >
                    Edit
                  </button>

                  <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    contentLabel='Edit Modal'
                  >
                    <div>
                      <div className='flex justify-end'>
                        <button
                          type='button'
                          className='text-2xl font-bold hover:shadow-xl  rounded-2xl p-2 '
                          onClick={closeModal}
                        >
                          X
                        </button>
                      </div>
                      <div>
                        <div class='flex'>
                          <div class='flex-none p-4'>
                            <span class='bg-yellow-400 p-6 text-white px-4 py-2 rounded-lg'>
                              Edit Mode
                            </span>
                          </div>
                          <div class='flex-grow flex justify-center items-center p-4'>
                            <div className='mr-10 mb-4  text-2xl font-medium'>
                              {contractName}
                            </div>
                          </div>
                        </div>

                        {/* this is the grid component for the edit page*/}
                        <EditGridComponent
                          edetailedData={edetailedData}
                          seteDetailedData={setDetailedData}
                        />
                      </div>
                    </div>
                  </Modal>
                </div>
              )}
            </div>
          </div>
          {/* this is the grid for the main page */}
          <DataGridComponent detailedData={detailedData} />
        </div>
      )}
      {/*timeline starting */}
      <div className='px-20 '>

        <ol className="relative border-s py-2 border-gray-200 dark:border-gray-700">
          {Array.isArray(detailedData) && detailedData.map((item, index) => (
            <li key={index} className="mb-10 ms-6">
              {item.updateHistory
                .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)) // Sort in descending order
                .map((historyItem, historyIndex) => (
                  <div key={historyIndex} className='py-4'>
                    <div className='py-2 px-2'>
                      <span className="absolute flex items-center justify-center w-6 h-6 
                     bg-blue-100 rounded-xl -start-3 ring-8 ring-white dark:ring-slate-300 dark:bg-slate-300">

                        {historyItem.description.toLowerCase().includes('corrected') && (
                          <EditedSvg />
                        )}
                        {historyItem.description.toLowerCase().includes('updated') && (
                          <UpdatedSvg />
                        )}
                        {historyItem.description.toLowerCase().includes('created') && (
                          <NewContractsvg />
                        )}
                      </span>
                      <div className="items-center justify-between p-5 py-2  border-gray-200 
                      rounded-md shadow-sm sm:flex dark:bg-slate-300 ">



                        <div className='space-x-2'>

                          <div class="flex font-medium dark:text-white space-x-2 py-2">
                            <div className='flex bg-gray-700 rounded-full p-2  py-2'>
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
                              </svg>
                              {historyItem.user}
                            </div>

                            <div className='py-2 px-2'>
                              {historyItem.description.toLowerCase().includes('updated') && (
                                <span class="bg-blue-500 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-800 dark:text-white">
                                  Update
                                </span>
                              )}
                              {historyItem.description.toLowerCase().includes('corrected') && (
                                <span class="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-yellow-500 dark:text-white">
                                  Edit
                                </span>
                              )}
                              {historyItem.description.toLowerCase().includes('created') && (
                                <span class="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-500 dark:text-white">
                                  New
                                </span>
                              )}
                            </div>


                            <div className='flex justify-center items-center text-black text-sm'>
                              {historyItem.timestamp}
                            </div>

                          </div>
                          <div className='flex space-x-60'>

                            <div class=" text-sm py-2 dark:text-gray-400">
                              <p className='font-bold text-sm text-slate-700'>Description:<br /></p>
                              <p className='text-black  text-md'> {historyItem.description}</p>

                              <div className=' py-2 text-black'>
                                <p className='font-bold text-sm text-slate-700'>Comment:</p>
                                <p className='text-black text-md '> {historyItem.comment}</p>
                              </div>

                            </div>



                          </div>
                        </div>


                      </div>
                    </div>
                  </div>

                ))}
              {item.updateHistory && item.updateHistory.length === 0 && (
                <div className="text-gray-500 dark:text-gray-300">No update history available</div>
              )}
            </li>
          ))}
        </ol>

      </div>

    </div>


  );
};

export default RegionDropdownComponent;
