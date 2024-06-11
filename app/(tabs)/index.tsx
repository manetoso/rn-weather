import { useCallback, useEffect, useState } from 'react'
import { ActivityIndicator, Image, RefreshControl, StyleSheet } from 'react-native'

import ParallaxScrollView from '@/shared/components/ParallaxScrollView'
import { HelloWave } from '@/shared/components/HelloWave'
import { ThemedText } from '@/shared/components/ThemedText'
import { ThemedView } from '@/shared/components/ThemedView'
import { Switch } from '@/shared/components/Switch'
import { useGeolocation } from '@/shared/hooks/useGeolocation'
import { useWeather } from './hooks/useWeather'
import { WeatherData } from './components/WeatherData'
import { Colors } from '@/shared/constants/Colors'

export default function HomeScreen() {
  const { errorMsg, location, coords, loading } = useGeolocation()
  const {
    dateFormatted,
    errorMsg: weatherErrorMsg,
    getWeatherData,
    loading: weatherLoading,
    setErrorMsg,
    weatherData
  } = useWeather()
  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = useCallback(async () => {
    try {
      setRefreshing(true)
      if (coords === null) throw new Error('No location data')
      await getWeatherData(coords.latitude, coords.longitude)
    } catch (error) {
      let message
      if (error instanceof Error) message = error.message
      else message = String(error)
      setErrorMsg(message)
    } finally {
      setRefreshing(false)
    }
  }, [coords]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (coords === null) return
    getWeatherData(coords.latitude, coords.longitude)
  }, [coords]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: Colors.light.tabIconSelected, dark: '#1D3D47' }}
      headerImage={
        <Image
          source={{
            uri: `https://openweathermap.org/img/wn/${weatherData?.weather[0].icon || '01d'}@4x.png`
          }}
          style={styles.reactLogo}
        />
      }
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome to RN Weather!</ThemedText>
        <HelloWave />
      </ThemedView>

      <Switch>
        <Switch.Case condition={loading}>
          <ActivityIndicator color={Colors.light.icon} />
        </Switch.Case>

        <Switch.Case condition={errorMsg !== ''}>
          <ThemedText>{errorMsg}</ThemedText>
        </Switch.Case>

        <Switch.Case condition={location === null}>
          <ThemedText>No location data</ThemedText>
        </Switch.Case>

        <Switch.Default>
          <WeatherData
            dateFormatted={dateFormatted}
            location={location!}
            loading={weatherLoading}
            weatherData={weatherData}
            error={weatherErrorMsg}
          />
        </Switch.Default>
      </Switch>
    </ParallaxScrollView>
  )
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  mainInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute'
  }
})
