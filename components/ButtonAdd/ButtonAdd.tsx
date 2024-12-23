import { Text, TouchableOpacity } from 'react-native'
import { styles } from './ButtonAdd.style'

export function ButtonAdd({ onPress }: { onPress: () => void }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>New Todo</Text>
    </TouchableOpacity>
  )
}
