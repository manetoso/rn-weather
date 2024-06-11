import { useState } from 'react'
import { WeatherResponse } from '@/shared/interfaces/interfaces'

export const useWeather = () => {
  const [weatherData, setWeatherData] = useState<WeatherResponse | null>(null)
  const [dateFormatted, setDateFormatted] = useState(() => {
    const today = new Date()
    return `${today.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric'
    })}, ${today.toLocaleTimeString()}`
  })
  const [errorMsg, setErrorMsg] = useState('')
  const [loading, setLoading] = useState(true)

  const getWeatherData = async (lat: number, lon: number, name: string) => {
    try {
      setLoading(true)
      const today = new Date()
      setDateFormatted(
        `${today.toLocaleString('en-US', {
          month: 'short',
          day: 'numeric'
        })}, ${today.toLocaleTimeString()}`
      )
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=14139611c1c12d2a9360c41c74383411&units=metric&exclude=minutely,hourly,alerts`
      )
      const data = await response.json()
      setWeatherData(data)
    } catch (error) {
      let message
      if (error instanceof Error) message = error.message
      else message = String(error)
      setErrorMsg(message)
    } finally {
      setLoading(false)
    }
  }

  return {
    dateFormatted,
    errorMsg,
    getWeatherData,
    loading,
    setErrorMsg,
    weatherData
  }
}
