import { FC } from 'react'
import { ActivityIndicator, StyleSheet } from 'react-native'
import type { LocationGeocodedAddress } from 'expo-location'

import { ThemedText } from '@/shared/components/ThemedText'
import { ThemedView } from '@/shared/components/ThemedView'
import { Switch } from '@/shared/components/Switch'

import { WeatherResponse } from '@/shared/interfaces/interfaces'
import { Colors } from '@/shared/constants/Colors'

interface Props {
  dateFormatted: string
  error: string
  loading: boolean
  location: LocationGeocodedAddress
  weatherData: WeatherResponse | null
}

export const WeatherData: FC<Props> = ({
  dateFormatted,
  error,
  loading,
  location,
  weatherData
}) => {
  return (
    <Switch>
      <Switch.Case condition={loading}>
        <ActivityIndicator color={Colors.light.icon} />
      </Switch.Case>

      <Switch.Case condition={error.length > 0}>
        <ThemedText>{error}</ThemedText>
      </Switch.Case>

      <Switch.Default>
        <ThemedView style={styles.stepContainer}>
          <ThemedText type="default">
            {dateFormatted !== '' ? `${dateFormatted}` : 'Loading...'}{' '}
          </ThemedText>
          <ThemedText type="subtitle">
            {location.city}, {location.country}
          </ThemedText>
        </ThemedView>
        <ThemedView style={styles.stepContainer}>
          <ThemedText type="defaultSemiBold">
            Feels like {weatherData!.main.feels_like} °C.{' '}
            {weatherData!.weather.map((w) => w.description).join(', ')}
          </ThemedText>
        </ThemedView>
        <ThemedView style={styles.mainInfoContainer}>
          <ThemedText type="title">{weatherData!.main.temp} °C</ThemedText>
          <ThemedView style={styles.stepContainer}>
            <ThemedText type="default">Humidity: {weatherData!.main.humidity}%</ThemedText>
            <ThemedText type="default">Wind: {weatherData!.wind.speed} m/s</ThemedText>
            <ThemedText type="default">Visibility: {weatherData!.visibility} m</ThemedText>
          </ThemedView>
        </ThemedView>
        <ThemedView style={styles.stepContainer}>
          <ThemedText type="default">
            Highest: {weatherData!.main.temp_max} °C, Lowest: {weatherData!.main.temp_min} °C.
          </ThemedText>
        </ThemedView>
        <ThemedView style={styles.stepContainer}>
          <ThemedText type="default">Clouds coverage: {weatherData!.clouds.all}%</ThemedText>
        </ThemedView>
        <ThemedView style={styles.stepContainer}>
          <ThemedText type="default">Wind degree: {weatherData!.wind.deg}°</ThemedText>
          <ThemedText type="default">Wind gust: {weatherData!.wind.gust} m/s</ThemedText>
        </ThemedView>
        <ThemedView style={styles.stepContainer}>
          <ThemedText type="default">Sea level: {weatherData!.main.sea_level} hPa</ThemedText>
          <ThemedText type="default">Ground level: {weatherData!.main.grnd_level} hPa</ThemedText>
        </ThemedView>
        <ThemedView style={styles.stepContainer}>
          <ThemedText type="default">City name: {weatherData!.name}</ThemedText>
          <ThemedText type="default">Country: {weatherData!.sys.country}</ThemedText>
          <ThemedText type="default">
            Sunrise: {new Date(weatherData!.sys.sunrise * 1000).toLocaleTimeString()}
          </ThemedText>
          <ThemedText type="default">
            Sunset: {new Date(weatherData!.sys.sunset * 1000).toLocaleTimeString()}
          </ThemedText>
          <ThemedText type="default">Latitude: {weatherData!.coord.lat}</ThemedText>
          <ThemedText type="default">Longitude: {weatherData!.coord.lon}</ThemedText>
        </ThemedView>
      </Switch.Default>
    </Switch>
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
  }
})
