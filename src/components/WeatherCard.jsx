'use client';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeather } from '../redux/weatherSlice';

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const WeatherCard = () => {
  const [city, setCity] = useState('');
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector((state) => state.weather);

  const handleSearch = () => {
    if (city.trim() !== '') {
      dispatch(fetchWeather({ city }));
    }
    setCity('')
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 w-full bg-gray-100 min-h-screen">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-semibold text-center mb-4">Weather App</h1>
        <div className="flex items-center gap-2 mb-4">
          <Input
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="flex-1"
          />
          <Button onClick={handleSearch} className="px-4 py-2">
            Get Weather
          </Button>
        </div>
        {loading && <p className="text-center text-blue-500">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        {data && (
          <div className="mt-4 text-center">
            <img
              src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
              alt="Weather Icon"
              className="mx-auto mb-2"
            />
            <h2 className="text-xl font-semibold">{data.name}</h2>
            <p className="text-gray-700">{data.weather[0].description}</p>
            <p className="text-gray-700">
              Temperature: <span className="font-medium">{Math.round(data.main.temp - 273.15)}°C</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherCard;
