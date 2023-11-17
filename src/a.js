const searchu = () =>
  {Array.isArray(detailedData) ? (
    detailedData.length > 0 ? (
      <div className="">
        {detailedData.map((item, index) => (
          <div key={index} className="grid grid-cols-6 grid-rows-4">
            {Object.entries(item)
              .filter(([key, value]) => value !== 'false' && key !== 'technology' && key !== 'region' && key !== 'plant' && key !== 'contractName' && key !== 'isActive')
              .map(([key, value], innerIndex) => (
                <div key={innerIndex} className="bg-gray-200 w-11/12 h-20 inline-block  m-4 py-3 rounded-lg">
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