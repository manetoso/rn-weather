import { TextInput, type TextInputProps, StyleSheet } from 'react-native'

export type ThemedTextInputProps = TextInputProps & {
  lightColor?: string
  darkColor?: string
}

export function ThemedTextInput({ style, lightColor, darkColor, ...rest }: ThemedTextInputProps) {
  return <TextInput style={[styles.input, style]} {...rest} />
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#ccc',
    height: 40,
    marginBottom: 20,
    width: '100%',
    paddingHorizontal: 8
  }
})
