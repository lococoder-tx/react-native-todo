import { TouchableOpacity, View, Text } from 'react-native'
import { styles } from './Footer.style'
import { Todo } from '../../data'

export const Footer = ({
  filter,
  setFilter,
  todos,
}: {
  filter: string
  setFilter: (filter: string) => void
  todos: Todo[]
}) => {
  const todoStats = todos.reduce(
    (acc, todo) => ({
      total: acc.total + 1,
      completed: acc.completed + (todo.isCompleted ? 1 : 0),
      active: acc.active + (!todo.isCompleted ? 1 : 0),
    }),
    { total: 0, completed: 0, active: 0 }
  )

  return (
    <View style={styles.footer}>
      <TouchableOpacity
        onPress={() => setFilter('all')}
        style={filter === 'all' ? styles.activeFilter : null}
      >
        <Text>All {todoStats.total}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setFilter('active')}
        style={filter === 'active' ? styles.activeFilter : null}
      >
        <Text>Active {todoStats.active}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setFilter('completed')}
        style={filter === 'completed' ? styles.activeFilter : null}
      >
        <Text>Completed {todoStats.completed}</Text>
      </TouchableOpacity>
    </View>
  )
}
