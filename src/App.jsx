import { useEffect, useState } from 'react'
import './App.css'

import searchIcon from './assets/search.png'
import humidityIcon from './assets/humidity.png'
import clearIcon from './assets/clear.png'
import cloudIcon from './assets/cloud.png'
import drazzileIcon from './assets/drazzile.png'
import rainIcon from './assets/rain.png'
import snowIcon from './assets/snow.png'
import windIcon from './assets/wind.png'



const WeatherDetails=({icon,temp,city,country,lat,long,humidity,wind})=>{
  return(
  <>
  <div className="image">
    <img src={icon} alt="image" />
  </div>
  <div className="temp">{temp}°C</div>
  <div className="city">{city}</div>
  <div className="country">{country}</div>
  <div className="cord">
    <div>
      <span className="lat">latitude</span>
      <span>{lat}</span>
    </div>
    <div>
      <span className="lat">latitude</span>
      <span>{long}</span>
    </div>
  </div>
  <div className="data-container">
    <div className="element">
      <img src={humidityIcon} alt="humidity" />
      <div className="data">
        <div className="humidity-percent">{humidity}%</div>
        <div className="text">Humidity</div>
      </div>

    </div>
    <div className="element">
      <img src={windIcon} alt="wind" />
      <div className="data">
        <div className="wind-percent">{wind} Km/h</div>
        <div className="text">Wind</div>
      </div>

    </div>
  </div>
  </>
  )
}


function App() {

const api_key="432513b7fbd3ed2839a18ee7be2fcb96";
const[text,setText]=useState("tenkasi");
const[icon,seticon]=useState(snowIcon);
const[temp,setTemp]=useState(0);
const[city,setCity]=useState("");
const[country,setCountry]=useState("");

const[lat,setLat]=useState(0);
const[long,setlong]=useState(0);
const[humidity,setHumidity]=useState(0);
const[wind,setWind]=useState(0);

const[cityNotFound,setCityNotFound]=useState(false);
const[loading,setLoading]=useState(false);
const[error,setError]=useState(null);


const weathericonMap ={
  "01d":clearIcon,
  "01d":clearIcon,
  "02d":cloudIcon,
  "02n":cloudIcon,
  "03d":drazzileIcon,
  "03n":drazzileIcon,
  "04d":drazzileIcon,
  "04n":drazzileIcon,
  "09d":rainIcon,
  "09n":rainIcon,
  "10d":rainIcon,
  "10n":rainIcon,
  "13d":snowIcon,
  "13n":snowIcon,
};

const search=async()=>{
  setLoading(true);

  let url=`https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=Metric`


  try{
    let res = await fetch(url);
    let data = await res.json();
    // console.log(data)
    if(data.cod === "404"){
      console.log("City not found");  
      setCityNotFound(true);
      setLoading(false);
      return;
    }

    setHumidity(data.main.humidity);
    setWind(data.wind.speed);
    setTemp(Math.floor(data.main.temp));
    setCity(data.name);
    setCountry(data.sys.country);
    setLat(data.coord.lat);
    setlong(data.coord.lon);
    const weatherIconCode=data.weather[0].icon;
    seticon( weathericonMap[weatherIconCode]|| clearIcon)
    setCityNotFound(false);


  }catch(error){
  console.log("An error occured: ",error.message)
  setError("An error occur while fetching data");
  }finally{
    setLoading(false);
  }
}

const handleCity=(e)=>{
    setText(e.target.value);
}
const handleKey=(e)=>{
  if(e.key == "Enter"){
    search();
  }
}
useEffect(function (){
search()
},[]); 

  return (
    <>
      <div className='container'>
        <div className="input-container">
          <input type="text" 
          className='city-input'
          placeholder='Search City'
          onChange={handleCity}
          value={text} onKeyDown={handleKey} />
          <div className="search-icon"  onClick={()=>search()}>
            <img src={searchIcon} alt="Search"/>
          </div>
        </div>
        
        { loading && <div className="loading-message">Loading...</div>}
        {error && <div className="error-message">{error}</div>}
        {cityNotFound && <div className="city-not-found">City not found</div>}

        {!loading && !error && !cityNotFound &&<WeatherDetails icon={icon} temp={temp} city={city} country={country} lat={lat} long={long}
        humidity={humidity} wind={wind}/>}
        <p className='copyright'>
          Designed by <span>Mariselvam</span>
        </p>
       </div>
    </>
  )
}

export default App
