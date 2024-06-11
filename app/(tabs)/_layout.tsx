import { Tabs } from 'expo-router'
import React from 'react'

import { TabBarIcon } from '@/shared/components/navigation/TabBarIcon'
import { Colors } from '@/shared/constants/Colors'

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.light.tint,
        headerShown: false
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          )
        }}
      />
    </Tabs>
  )
}
