import { ActivityIndicator, FlatList, Image, RefreshControl, StyleSheet } from 'react-native'

import { useGeolocation } from '@/shared/hooks/useGeolocation'
import { HelloWave } from '@/shared/components/HelloWave'
import ParallaxScrollView from '@/shared/components/ParallaxScrollView'
import { ThemedText } from '@/shared/components/ThemedText'
import { ThemedView } from '@/shared/components/ThemedView'
import { Colors } from '@/shared/constants/Colors'
import { useCallback, useState } from 'react'
import { Switch } from '@/shared/components/Switch'
import { SingleDayTemp } from './components/SingleDayTemp'

import Resp from '@/shared/constants/Response.json'

export default function HomeScreen() {
  const { errorMsg, location, loading } = useGeolocation()
  const [refreshing, setRefreshing] = useState(false)
  const [dateFormatted, setDateFormatted] = useState(() => {
    const today = new Date()
    return `${today.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric'
    })}, ${today.toLocaleTimeString()}`
  })

  const onRefresh = useCallback(() => {
    const today = new Date()
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
      setDateFormatted(
        `${today.toLocaleString('en-US', {
          month: 'short',
          day: 'numeric'
        })}, ${today.toLocaleTimeString()}`
      )
    }, 2000)
  }, [])
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: Colors.light.tabIconSelected, dark: '#1D3D47' }}
      headerImage={
        <Image
          source={{ uri: 'https://openweathermap.org/img/wn/01d@4x.png' }}
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
          <ThemedView style={styles.stepContainer}>
            <ThemedText type="default">
              {dateFormatted !== '' ? `${dateFormatted}` : 'Loading...'}{' '}
            </ThemedText>
            <ThemedText type="subtitle">
              {location?.city}, {location?.country}
            </ThemedText>
          </ThemedView>
          <ThemedView style={styles.stepContainer}>
            <ThemedText type="defaultSemiBold">
              Feels like {Resp.current.feels_like} °C.{' '}
              {Resp.current.weather.map((w) => w.description).join(', ')}
            </ThemedText>
          </ThemedView>
          <ThemedView style={styles.mainInfoContainer}>
            <ThemedText type="title">{Resp.current.temp} °C</ThemedText>
            <ThemedView style={styles.stepContainer}>
              <ThemedText type="default">Humidity: {Resp.current.humidity}%</ThemedText>
              <ThemedText type="default">Dew point: {Resp.current.dew_point} °C</ThemedText>
              <ThemedText type="default">Wind: {Resp.current.wind_speed} m/s</ThemedText>
              <ThemedText type="default">Visibility: {Resp.current.visibility} m</ThemedText>
            </ThemedView>
          </ThemedView>

          <ThemedView style={styles.titleContainer}>
            <ThemedText type="title">8-day forecast</ThemedText>
          </ThemedView>

          <FlatList
            data={Resp.daily}
            renderItem={({ item }) => <SingleDayTemp detail={item} />}
            keyExtractor={(item) => item.dt.toString()}
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
