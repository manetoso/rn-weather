import { useEffect, useState } from 'react'
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
  reverseGeocodeAsync,
  LocationGeocodedAddress
} from 'expo-location'

// 14139611c1c12d2a9360c41c74383411

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const useGeolocation = () => {
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
      await sleep(3000)
      let location = await getCurrentPositionAsync({})
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

  return { loading, location, errorMsg }
}
