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
      }
  
      setDetailedData(dataForSelectedRegion);
    } catch (error) {
      console.error('Error fetching detailed data:', error);
    }
  };
  

  useEffect(() => {
    if (selectedRegion || selectedTechnology || selectedPlant) {
      handleSearch();
    } else {
      setDetailedData(null); // Reset detailedData if no filters are selected
    }
  }, [selectedRegion, selectedTechnology, selectedPlant]);

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
        <div>
          <h2>Data for {selectedRegion}:</h2>
          {Array.isArray(detailedData) ? (
            detailedData.length > 0 ? (
              <ul>
                {detailedData.map((item, index) => (
                  <li key={index}>
                    {JSON.stringify(item, null, 2)}
                  </li>
                ))}
              </ul>
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
