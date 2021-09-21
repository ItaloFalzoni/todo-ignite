import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const newTask = { 
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }

    setTasks(oldTaskState => [...oldTaskState, newTask])
  }

  function handleToggleTaskDone(id: number) {
    const newTasks = tasks.map(item => {
      if (item.id === id) {
        item.done = !item.done
      }

      return item
    })

    setTasks([...newTasks])
  }

  function handleRemoveTask(id: number) {
    const newTasks = tasks.filter(item => item.id !== id)
    setTasks([...newTasks])
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={(newTaskTitle) => handleAddTask(newTaskTitle)} />

      <TasksList
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})