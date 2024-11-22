'use client';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeather } from '../redux/weatherSlice';

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress"

const WeatherCard = () => {
  const [city, setCity] = useState('');
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector((state) => state.weather);

  const handleSearch = () => {
    if (city.trim() !== '') {
      dispatch(fetchWeather({ city }));
    }
    setCity('');
  };

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen p-6 bg-gradient-to-r from-blue-500 to-indigo-600">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h1 className="mb-4 text-3xl font-bold text-center text-indigo-600">
          Weather App
        </h1>
        <div className="flex items-center gap-2 mb-4">
          <Input
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <Button
            onClick={handleSearch}
            className="px-4 py-2 text-white transition bg-indigo-600 rounded-md hover:bg-indigo-700"
          >
            Get Weather
          </Button>
        </div>
        {loading && (
          <div className="my-4">
            <Progress className="w-full" value={33} />
          </div>
        )}
        {error && <p className="text-center text-red-500">{error}</p>}
        {data && (
          <div className="mt-4 text-center">
            <img
              src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
              alt="Weather Icon"
              className="mx-auto mb-2"
            />
            <h2 className="text-xl font-bold text-indigo-700">{data.name}</h2>
            <p className="text-gray-700 capitalize">{data.weather[0].description}</p>
            <p className="text-gray-800">
              Temperature: <span className="font-medium">{Math.round(data.main.temp - 273.15)}°C</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherCard;
