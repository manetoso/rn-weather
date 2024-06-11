import React, { FC, ReactElement } from 'react'

interface Props {
  children: React.ReactElement | React.ReactElement[]
}

const Case: FC<Props & { condition: boolean }> = ({ children }) => children

const Default: FC<Props> = ({ children }) => children

const Switch: FC<Props> & { Case: typeof Case; Default: typeof Default } = ({ children }) => {
  let matchChild: ReactElement | null = null
  let defaultCase: ReactElement | null = null

  React.Children.forEach(children, (child) => {
    if (!matchChild && child.type === Case) {
      const { condition } = child.props

      const conditionResult = Boolean(condition)

      if (conditionResult) {
        matchChild = child
      }
    } else if (!defaultCase && child.type === Default) {
      defaultCase = child
    }
  })

  return matchChild ?? defaultCase ?? null
}

Switch.Case = Case
Switch.Default = Default

export { Switch }
