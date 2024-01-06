import React, { useState, useEffect } from 'react';

const ContentComponent = () => {
    const [contentData, setContentData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:2255/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                // Set the fetched data to state
                setContentData(data.data); // Assuming your data is under 'data.data', modify accordingly
                console.log(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [contentData]);

    return (
        <div className="container mx-auto mt-4">
            <h1 className="text-2xl font-bold ml-5">Items in the Grocery</h1>
            <div className="grid grid-cols-3 gap-4 bg-blue-200 p-3 m-5 rounded-md">
                {contentData.map((item, index) => (
                    <div key={index} className="bg-blue-100 p-4 rounded-md">
                        <h2 className="text-lg font-semibold mb-2">
                            {item.ItemName}
                        </h2>
                        <div className='w-3/4 m-auto rounded-lg border'>
                            <img
                                src={item.ImageURL}
                                alt={item.ItemName}
                            />
                        </div>
                        <p>
                            {item.price} {item.IsQuantityInWeight === "true" ? "Per Kg" : "Per item"}
                        </p>
                        <p>
                            Stock Available : {item.quantity} {item.IsQuantityInWeight === "true" ? "Kg" : "Packets"}
                        </p>
                        <p>
                            {item.description}
                        </p>
                    </div>
                ))}


            </div>
        </div>
    );
};

export default ContentComponent;
