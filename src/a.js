import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TestFetchComponent = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [childNodes, setChildNodes] = useState({});
  const [selectedNodeType, setSelectedNodeType] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/demo.json');
        const keys = Object.keys(response.data);
        setCountries(keys);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      // Directly use axios.get here
      axios.get('/demo.json')
        .then(response => {
          setChildNodes(response.data[selectedCountry]);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }
  }, [selectedCountry]);

  return (
    <div>
      <div>
        <label htmlFor="countries">Select a Country:</label>
        <select
          id="countries"
          onChange={(e) => {
            setSelectedCountry(e.target.value);
            setSelectedNodeType(null); // Reset selectedNodeType when a new country is selected
            setSelectedNode(null); // Reset selectedNode when a new country is selected
          }}
        >
          <option value="">Select</option>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>

      {selectedCountry && (
        <div>
          {Object.keys(childNodes).length > 0 ? (
            <div>
              <label htmlFor="nodeTypes">Select a Node Type:</label>
              <select
                id="nodeTypes"
                onChange={(e) => {
                  setSelectedNodeType(e.target.value);
                  setSelectedNode(null); // Reset selectedNode when a new node type is selected
                }}
              >
                <option value="">Select</option>
                {Object.keys(childNodes).map((nodeType) => (
                  <option key={nodeType} value={nodeType}>
                    {nodeType}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <p>No child nodes available for {selectedCountry}</p>
          )}

          {selectedNodeType && (
            <div>
              <label htmlFor="nodes">Select a Node:</label>
              <select
                id="nodes"
                onChange={(e) => setSelectedNode(e.target.value)}
              >
                <option value="">Select</option>
                {childNodes[selectedNodeType].map((node) => (
                  <option key={node} value={node}>
                    {node}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TestFetchComponent;
