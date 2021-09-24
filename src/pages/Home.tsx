import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

import { Header } from "../components/Header";
import { Task, TasksList } from "../components/TasksList";
import { TodoInput } from "../components/TodoInput";

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function isExistTitle(title: string) {
    let isExist = false;
    tasks.forEach((item) => item.title === title && (isExist = true));

    return isExist;
  }

  function handleAddTask(newTaskTitle: string) {
    if (isExistTitle(newTaskTitle)) {
      Alert.alert("Task já cadastrada", "Você não pode cadastrar uma Task com o mesmo nome.");
      return;
    }

    const newTask = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
      isEditing: false,
    };

    setTasks((oldTaskState) => [...oldTaskState, newTask]);
  }

  function handleToggleTaskDone(id: number) {
    const newTasks = tasks.map((item) => {
      if (item.id === id) {
        item.done = !item.done;
      }

      return item;
    });

    setTasks([...newTasks]);
  }

  function handleRemoveTask(id: number) {
    Alert.alert("Atenção", "Tem certeza que deseja remover essa Task?", [
      {
        style: "cancel",
        text: "Não",
      },
      {
        style: "destructive",
        text: "Sim",
        onPress: () => {
          const newTasks = tasks.filter((item) => item.id !== id);
          setTasks([...newTasks]);
        },
      },
    ]);
  }

  function handleUpdateTask(id: number, newTitle: string) {
    const newTasks = tasks.map((item) => {
      if (item.id === id) {
        item.title = newTitle;
      }

      return item;
    });

    setTasks([...newTasks]);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={(newTaskTitle) => handleAddTask(newTaskTitle)} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        updateTask={handleUpdateTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
});
