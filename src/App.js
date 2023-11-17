import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const RegionDropdownComponent = () => {
  const [regionsData, setRegionsData] = useState({});
  const [regions, setRegions] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedTechnology, setSelectedTechnology] = useState('');
  const [selectedPlant, setSelectedPlant] = useState('');
  const [contractName, setContractName] = useState('');
  const [isActive, setActive] = useState('');
  const [detailedData, setDetailedData] = useState(null);
  const [detailedActive, setDetailedActive] = useState(null);
  const [modalIsOpen, setModalOpen] = useState(false);
  const [isSearchPerformed, setSearchPerformed] = useState(false);
  const [showGrid, setShowGrid] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
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
      const response = await axios.get('/search.json');
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
        setContractName(contractNameItem ? contractNameItem.contractName : '');

        // Set flags to indicate search has been performed and to show the grid
        setSearchPerformed(true);
        setShowGrid(true);

      }
    } catch (error) {
      console.error('Error fetching detailed data:', error);
    }


  };

  return (
    <div>
      <div className='flex flex-col justify-center items-center p-6 font-medium text-2xl bg-slate-200 px-12'>
        Contracts and Warranties
      </div>
      <div className='flex justify-center items-center py-4 space-x-6'>
        <label htmlFor='regions' className=''></label>
        <select
          id='regions'
          className='rounded-lg p-3'
          onChange={(e) => {
            setSelectedRegion(e.target.value);
          }}
        >
          <option value=''>Region</option>
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

        <button
          className='text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

        {isSearchPerformed === true && showGrid === true && (
          <div className='px-4 m-4 bg-slate-300 rounded-2xl'>
            <div className='flex justify-center space-x-96'>
              {Array.isArray(detailedData) ? (
                detailedData.length > 0 ? (
                  <div className="">
                    {detailedData.map((item, index) => (
                      <div key={index} className="grid grid-cols-6 grid-rows-4">
                        {Object.entries(item)
                          .filter(([key, value]) => value !== 'false' && key !== 'technology' && key !== 'region' && key !== 'plant' && key !== 'contractName' && key !== 'isActive')
                          .map(([key, value], innerIndex) => (
                            <div key={innerIndex} className="bg-gray-200 w-11/12 h-20 inline-block m-4 py-3 rounded-lg">
                              <div className="flex-col px-2" style={{ overflow: 'hidden', maxWidth: '200px', maxHeight: '400px' }}>
                                <div>
                                  <div className="flex flex-col w-4/5">
                                    <div className=' text-sm px-2'>{key}:</div>
                                    <div>
                                      <span className="m-2 text-lg" style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                        {typeof value === 'object' ? JSON.stringify(value, null, 2) : value}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    ))}
                    <div className='py-3 px-4'>
                      {isActive === 'true' ? (
                        <button className='bg-green-500 p-6 text-white px-6 py-1 rounded-xl'>
                          Active
                        </button>
                      ) : null}
                    </div>
                    <div>
                      {contractName && (
                        <h2 className='py-4 text-2xl font-semibold'>{contractName}</h2>
                      )}
                    </div>
                    <div className='flex '>
                      <div className='py-3 px-4'>
                        {showGrid && (
                          <button className='bg-green-800 p-6 text-white px-3 py-1 rounded-xl'>
                            Update
                          </button>
                        )}
                      </div>
                      <div className='py-3 px-4'>
                        <button
                          className='bg-yellow-600 p-6 text-white px-4 py-1 rounded-xl'
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
                                className='text-2xl font-bold bg-slate-400 rounded-3xl p-2 '
                                onClick={closeModal}
                              >
                                X
                              </button>
                            </div>
                            <div>
                              <h2 className='flex justify-center font-bold text-2xl'>
                                Edit {contractName}
                              </h2>

                              {/* Include your modal content here */}
                            </div>
                          </div>
                        </Modal>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p>No data available for the selected filters</p>
                )
              ) : (
                <p className='flex flex-col spin-container'>
                  <button className='animate-spin' disabled>
                    <svg path="rolling.svg"></svg>
                  </button>
                </p>
              )}
            </div>
          </div>
        )}

    </div>
  )
}


export default RegionDropdownComponent;
