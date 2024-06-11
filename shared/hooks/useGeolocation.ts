import { useEffect, useState } from 'react'
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
  reverseGeocodeAsync,
  type LocationGeocodedAddress,
  type LocationObjectCoords
} from 'expo-location'

export const useGeolocation = () => {
  const [coords, setCoords] = useState<LocationObjectCoords | null>(null)
  const [location, setLocation] = useState<LocationGeocodedAddress | null>(null)
  const [errorMsg, setErrorMsg] = useState<string>('')
  const [loading, setLoading] = useState(true)

  const askForPermission = async () => {
    let { status } = await requestForegroundPermissionsAsync()
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied')
      return
    }
  }

  const getLocation = async () => {
    try {
      let location = await getCurrentPositionAsync({})
      setCoords(location.coords)
      if (location) {
        let addresses = await reverseGeocodeAsync(location.coords)
        setLocation(addresses[0])
      }
    } catch (error) {
      let message
      if (error instanceof Error) message = error.message
      else message = String(error)
      setErrorMsg(message)
    } finally {
      setLoading(false)
    }
  }

  const getLocationData = async () => {
    await askForPermission()
    await getLocation()
  }

  useEffect(() => {
    getLocationData()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return {
    coords,
    errorMsg,
    loading,
    location
  }
}
