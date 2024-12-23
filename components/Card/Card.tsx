import { Text, TouchableOpacity } from 'react-native'
import { styles } from './Card.style'
import { Todo } from '../../data'
import { Check } from 'lucide-react-native'

export function Card({
  todo,
  onPress,
  onLongPress,
}: {
  todo: Todo
  onPress: () => void
  onLongPress: () => void
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.card}
      onPress={onPress}
      onLongPress={onLongPress}
    >
      <Text
        style={[
          styles.title,
          todo.isCompleted && { textDecorationLine: 'line-through' },
        ]}
      >
        {todo.title}
      </Text>
      {todo.isCompleted && <Check size={24} color="#000000" />}
    </TouchableOpacity>
  )
}
