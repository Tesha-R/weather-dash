import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [weatherData, setWeatherData] = useState(null);

  const apiKey = import.meta.env.VITE_ACCUWEATHER_API;
  const location = 'encinitas';

  // Fetch location key
  useEffect(() => {
    async function getLocationKey() {
      const response = await fetch(
        `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey}&q=${location}`
      );
      const data = await response.json();
      // console.log('get key', data);
      if (data.length > 0) {
        const locationKey = data[0].Key; // Get the location key from the API response
        getWeatherForecast(locationKey); // Call the function to get the weather forecast with the location key
      } else {
        throw new Error('Location not found');
      }
    }
    async function getWeatherForecast(locationKey) {
      try {
        const response = await fetch(
          `http://dataservice.accuweather.com/forecasts/v1/daily/1day/${locationKey}?apikey=${apiKey}`
        );
        const data = await response.json();
        // console.log('get forecast', data);
        setWeatherData(data); // Update the state with the fetched weather data
        // console.log('weatherData', weatherData);
      } catch (error) {
        console.error(error);
      }
    }

    getLocationKey(); // Fetch the location key when the component mounts
  }, [apiKey]); // Empty dependency array. Run once when the component mounts

  return (
    <>
      <div className="container mx-auto mt-5 p-5">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-2xl text-white font-light">
            Weather<span className="font-semibold">Dash</span>
          </h1>
          <input
            type="text"
            name="search"
            id="search-el"
            placeholder="Search"
            className="text-white bg-gray-900 bg-opacity-50 p-5 rounded-[30px] lg:w-1/6"
          />
        </div>
        <div className="flex flex-wrap gap-7 text-left mb-5">
          {weatherData && weatherData.DailyForecasts ? (
            <>
              <div className="w-full text-white lg:w-1/4">
                <div className=" bg-gray-900 bg-opacity-50 p-10 rounded-[30px] mb-5">
                  {' '}
                  <p>
                    {new Date(
                      weatherData.DailyForecasts[0].Date
                    ).toDateString()}
                  </p>
                  <p className="text-9xl">
                    {weatherData.DailyForecasts[0].Temperature.Maximum.Value}°{' '}
                    <span className="text-sm">High</span>
                  </p>
                  <p className="text-2xl">
                    {weatherData.DailyForecasts[0].Temperature.Minimum.Value}°{' '}
                    <span>Low</span>
                  </p>
                  <p className="text-2xl">San Diego, CA</p>
                </div>
                <div className=" bg-gray-900 bg-opacity-50 p-10 rounded-[30px] mb-5">
                  {' '}
                  <p className="text-2xl">Moon</p>
                  <p>San Diego, CA</p>
                </div>
                <div className=" bg-gray-900 bg-opacity-50 p-10 rounded-[30px]">
                  {' '}
                  <p className="text-2xl">20</p>
                  <p>Sunset/Sunrise</p>
                </div>
              </div>
              <div className="flex-auto w-full text-white bg-gray-900 bg-opacity-50 p-10 rounded-[30px] md:w-2/5">
                {' '}
                <p className="text-7xl font-light leading-normal text-white">
                  {weatherData.Headline.Text}
                </p>
              </div>
              <div className="flex-auto w-full md:w-1/4">
                <p className="text-white mb-3">Recently search:</p>
                <div className=" text-white bg-gray-900 bg-opacity-50 p-10 rounded-[30px] mb-5">
                  <p className="text-6xl">20</p>
                  <p className="text-2xl">San Diego, CA</p>
                  <p>San Diego, CA</p>
                </div>
                <div className=" text-white bg-gray-900 bg-opacity-50 p-10 rounded-[30px]">
                  <p className="text-6xl">20</p>
                  <p>San Diego, CA</p>
                </div>
              </div>
            </>
          ) : (
            <p>Loading weather info...</p>
          )}
        </div>
        <div className="text-white bg-gray-900 bg-opacity-50 p-10 rounded-[30px]">
          weather weeks
        </div>
      </div>
    </>
  );
}

export default App;
