import { FC } from 'react'
import { StyleSheet } from 'react-native'

import { ThemedText } from '@/shared/components/ThemedText'
import { ThemedView } from '@/shared/components/ThemedView'
import { Collapsible } from '@/shared/components/Collapsible'

export const SingleDayTemp: FC<any> = ({ detail }) => {
  const date = new Date(detail.dt * 1000)
  return (
    <Collapsible
      title={date.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric'
      })}
    >
      <ThemedText type="subtitle">{detail.summary}</ThemedText>
      <ThemedText type="defaultSemiBold">
        {detail.weather.map((w: any) => w.description).join(', ')}
      </ThemedText>
      <ThemedText type="default">
        Highest: {detail.temp.max} °C, Lowest: {detail.temp.min} °C.
      </ThemedText>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="default">Humidity: {detail.humidity}%</ThemedText>
        <ThemedText type="default">Dew point: {detail.dew_point} °C</ThemedText>
        <ThemedText type="default">Wind: {detail.wind_speed} m/s</ThemedText>
      </ThemedView>
    </Collapsible>
  )
}

const styles = StyleSheet.create({
  stepContainer: {
    marginVertical: 8
  }
})
