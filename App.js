import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function App() {
  const apiKey = '7eedef80acbec38ac5ef5fe66f6d6d75'
  const cities = [
    {name: 'Aguilares'},
    {name: 'Apopa'},
    {name: 'Ayutuxtepeque'},
    {name: 'Ciudad Delgado'},
    {name: 'Cuscatancingo'},
    {name: 'El Paisnal'},
    {name: 'Guazapa'},
    {name: 'Ilopango'},
    {name: 'Mejicanos'},
    {name: 'Nejapa'},
    {name: 'Panchimalco'},
    {name: 'Rosario de Mora'},
    {name: 'San Marcos'},
    {name: 'San Martín'},
    {name: 'San Salvador'},
    {name: 'Santiago Texacuangos'},
    {name: 'Santo Tomás'},
    {name: 'Soyapango'},
    {name: 'Tonacatepeque'}
  ]
  
  const [city, setCity] = useState('Aguilares')
  const [icon, setIcon] = useState('')
  const [actualTemperature, setActualTemperature] = useState(0)
  const [weather, setWeather] = useState('')
  const [maxTemp, setMaxTemp] = useState(0)
  const [minTemp, setMinTemp] = useState(0)
  const [humidity , setHumidity ] = useState('')
  const [wind, setWind] = useState('')

  function loadData(cityName) {
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName},sv&appid=${apiKey}&lang=es&units=metric`, {
      method: 'GET',
    }).then(response => response.json()).then(responseJSON => {
      console.log(responseJSON.weather[0].icon, 'DATA')
      setIcon(`http://openweathermap.org/img/wn/${responseJSON.weather[0].icon}@2x.png`)
      setMaxTemp(responseJSON.main.temp_max)
      setMinTemp(responseJSON.main.temp_min)
      setActualTemperature(responseJSON.main.temp)
      setWeather(responseJSON.weather[0].description)
      setHumidity(responseJSON.main.humidity)
      setWind(responseJSON.wind.speed)
    })
  }

  const B = (props) => <Text style={{fontSize: 20, fontWeight: 'bold'}}>{props.children}</Text>

  useEffect(() => {
    if(city) loadData(city)
  }, city)

  return (
    <View style={styles.container}>
      <Picker
        style={[styles.picker,{marginBottom:10}]}
        selectedValue={city}
        onValueChange={(itemValue, itemIndex) => {
          setCity(itemValue)
          loadData(itemValue)
        }}
      >
        {
          cities.map(city => <Picker.Item label={city.name} value={city.name} />)
        }
      </Picker>
      <Text style={styles.title}>{city}</Text>
      <Image style={styles.icon} source={{uri: icon}} />
      <StatusBar style="auto" />
      <Text style={styles.textMargin}><B>{actualTemperature} °C</B>    ({weather})</Text>
      <Text style={styles.textMargin}>Mínimo {minTemp} °C   Máximo {maxTemp} °C</Text>
      <Text style={styles.textMargin}><B>Humedad:</B>  {humidity}%</Text>
      <Text style={styles.textMargin}><B>Viento:</B>  {wind} m/s</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10
  },
  picker: {
    color: 'black',
    backgroundColor: '#f3f3f3',
    width: '100%',
    height: 40,
    marginTop: 10
  },
  title: {
    marginTop: 20,
    marginBottom: 0,
    fontSize: 25,
    fontWeight: 'bold'
  },
  icon: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginTop: -25,
    marginBottom: -20
  },
  textMargin: {
    margin: 5
  }
});
