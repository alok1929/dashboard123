const handleSearch = async () => {
  try {
    const response = await axios.get('/detailedData.json');
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
