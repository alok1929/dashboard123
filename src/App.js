import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RegionDropdownComponent = () => {
  const [regionsData, setRegionsData] = useState({});
  const [regions, setRegions] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedTechnology, setSelectedTechnology] = useState('');
  const [selectedPlant, setSelectedPlant] = useState('');
  const [detailedData, setDetailedData] = useState(null);

  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const response = await axios.get('/demo.json');
        setRegionsData(response.data);
        // Extract region names from the keys
        const regionNames = Object.keys(response.data);
        //gets you only the region names from demo.json
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
      //assumes recieved data has nested format, thats why data.data
  
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
      }
  
      setDetailedData(dataForSelectedRegion);
    } catch (error) {
      console.error('Error fetching detailed data:', error);
    }
  };
  



  return (
    <div>
      <label htmlFor="regions">Select a Region:</label>
      <select
        id="regions"
        onChange={(e) => {
          setSelectedRegion(e.target.value);
        }}
      >
        <option value="">Select</option>
        {regions.map((region) => (
          <option key={region} value={region}>
            {region}
          </option>
        ))}
      </select>

      <label htmlFor="technologies">Select a Technology:</label>
      <select
        id="technologies"
        onChange={(e) => {
          setSelectedTechnology(e.target.value);
        }}
      >
        <option value="">Select</option>
        {selectedRegion &&
          regionsData[selectedRegion] &&
          Object.keys(regionsData[selectedRegion]).map((technology) => (
            <option key={technology} value={technology}>
              {technology}
            </option>
          ))}
      </select>

      <label htmlFor="plants">Select a Plant:</label>
      <select
        id="plants"
        onChange={(e) => {
          setSelectedPlant(e.target.value);
        }}
      >
        <option value="">Select</option>
        {selectedRegion &&
          selectedTechnology &&
          regionsData[selectedRegion][selectedTechnology] &&
          regionsData[selectedRegion][selectedTechnology].map((plant) => (
            <option key={plant} value={plant}>
              {plant}
            </option>
          ))}
      </select>

      <button onClick={handleSearch}>Search</button>

      {selectedRegion && (
      <div className='grid-cols-2'>
      <h2 className='col-span-2 mb-4'>Data for {selectedRegion}:</h2>
      {Array.isArray(detailedData) ? (
        detailedData.length > 0 ? (
          <table className='table-auto col-span-2'>
            <thead>
              <tr>
                <th className='border px-4 py-2' >Property</th>
                <th className='border px-4 py-2'>Value</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(detailedData[0]).map(([key, value]) => (
                <tr key={key}>
                  <td className='border px-4 py-2'>{key}</td>
                  <td className='border px-4 py-2'>{typeof value === 'object' ? JSON.stringify(value, null, 2) : value}</td>
                 {/*In the value key pair, if the value is of object type, just stringify it */}

                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No data available for the selected filters</p>
        )
      ) : (
        <p>Loading data...</p>
      )}
    </div>
    
    
      )}
    </div>
  );
};

export default RegionDropdownComponent;
