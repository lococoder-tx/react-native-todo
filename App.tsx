import { Alert, SafeAreaView, ScrollView, View } from 'react-native'
import { styles } from './App.style'
import { Header } from './components/Header/Header'
import { Card } from './components/Card/Card'
import { Todo } from './data'
import { useState, useMemo, useEffect, useRef } from 'react'
import { Footer } from './components/Footer/Footer'
import { ButtonAdd } from './components/ButtonAdd/ButtonAdd'
import Dialog from 'react-native-dialog'
import AsyncStorage from '@react-native-async-storage/async-storage'

let isFirstRender = true
let isFromLoad = false

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [filter, setFilter] = useState<string>('all')
  const [isDialogVisible, setIsDialogVisible] = useState(false)
  const [todoTitle, setTodoTitle] = useState('')
  const scrollViewRef = useRef<ScrollView>(null)

  useEffect(() => {
    loadTodoList()
  }, [])

  useEffect(() => {
    if (!isFromLoad) {
      if (!isFirstRender) {
        saveTodoList(todos)
      } else {
        isFirstRender = false
      }
    } else {
      isFromLoad = false
    }
  }, [todos])

  async function loadTodoList() {
    try {
      const todos = await AsyncStorage.getItem('@todolist')
      const parsedTodos = todos ? JSON.parse(todos) : []
      isFromLoad = true
      setTodos(parsedTodos)
      console.log('Todos loaded from AsyncStorage')
    } catch (error) {
      console.error('Error loading todos:', error)
    }
  }

  async function saveTodoList(todos: Todo[]) {
    try {
      await AsyncStorage.setItem('@todolist', JSON.stringify(todos))
      console.log('Todos saved to AsyncStorage')
    } catch (error) {
      console.error('Error saving todos:', error)
    }
  }

  const filteredTodos = useMemo(() => {
    if (filter === 'all') return todos
    if (filter === 'active') return todos.filter((todo) => !todo.isCompleted)
    if (filter === 'completed') return todos.filter((todo) => todo.isCompleted)
    return todos
  }, [todos, filter])

  function updateTodo(id: number) {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    )
  }

  function deleteTodo(id: number) {
    Alert.alert('Delete Todo', 'Are you sure you want to delete this todo?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () =>
          setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id)),
      },
    ])
  }

  function addTodo(title: string) {
    setTodos((prevTodos) => [
      ...prevTodos,
      { id: Date.now(), title, isCompleted: false },
    ])
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true })
    }, 100)
  }

  function renderAddDialog() {
    return (
      <Dialog.Container visible={isDialogVisible}>
        <Dialog.Title>Add Todo</Dialog.Title>
        <Dialog.Description>
          Choose a title for your new todo.
        </Dialog.Description>
        <Dialog.Input
          placeholder="Todo title"
          onChangeText={setTodoTitle}
          value={todoTitle}
        />
        <Dialog.Button
          color="#2F76E5"
          label="Cancel"
          onPress={() => setIsDialogVisible(false)}
        />
        <Dialog.Button
          color="#2F76E5"
          label="Add"
          onPress={() => {
            addTodo(todoTitle)
            setIsDialogVisible(false)
            setTodoTitle('')
          }}
        />
      </Dialog.Container>
    )
  }

  return (
    <>
      <SafeAreaView style={styles.app}>
        <View style={styles.header}>
          <Header />
        </View>
        <View style={styles.body}>
          <ScrollView ref={scrollViewRef}>
            {filteredTodos?.map((todo) => (
              <Card
                key={todo.id}
                todo={todo}
                onPress={() => updateTodo(todo.id)}
                onLongPress={() => deleteTodo(todo.id)}
              />
            ))}
          </ScrollView>
        </View>
        <ButtonAdd onPress={() => setIsDialogVisible(true)} />
      </SafeAreaView>
      <Footer filter={filter} setFilter={setFilter} todos={todos || []} />
      {renderAddDialog()}
    </>
  )
}
