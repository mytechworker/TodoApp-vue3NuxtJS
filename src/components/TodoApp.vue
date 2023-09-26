<template>
    <div>
    <div class="todo-app">
      <h1>Todo App in Nuxt with vue3</h1>
      <input
        v-model="newTask"
        class="todo_title"
        placeholder="Add a new task and Press Enter"
      />
      <button @click="addTask()" id="btnAdd">Add Task</button>
      <table class="todo-table">
        <thead>
          <tr>
            <th>Status</th>
            <th>Task</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="task in tasks" :key="task.id">
            <td>
              <input
                type="checkbox"
                :checked="task.completed"
                @click="toggleTask(task)"
              />
            </td>
            <td>
              <span :class="{ completed: task.completed }">{{ task.text }}</span>
            </td>
            <td>
              <button @click="removeTask(task)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from "vue";
  import axios from "axios";
  
  export default {
    setup() {
      const newTask = ref("");
      const tasks = ref([]);
  
      const fetchTasks = async () => {
        try {
          const response = await axios.get("http://localhost:5000/tasks");
          tasks.value = response.data;
        } catch (error) {
          console.error("Error fetching tasks:", error);
        }
      };
  
      const addTask = async () => {
        if (newTask.value.trim() === "") return alert("Please enter task name.");
        try {
          const response = await axios.post("http://localhost:5000/tasks", {
            text: newTask.value,
            completed: false,
          });
          tasks.value.push(response.data);
          newTask.value = "";
        } catch (error) {
          console.error("Error adding task:", error);
        }
      };
  
      const toggleTask = async (task) => {
        try {
          task.completed = !task.completed;
          const response = await axios.patch(
            `http://localhost:5000/tasks/${task.id}`,
            {
              completed: task.completed,
            }
          );
          task.completed = response.data.completed;
        } catch (error) {
          console.error("Error toggling task:", error);
        }
      };
  
      const removeTask = async (task) => {
        if (confirm("Are you sure you wish to delete this task?")) {
          try {
            await axios.delete(`http://localhost:5000/tasks/${task.id}`);
            const index = tasks.value.findIndex((t) => t.id === task.id);
            if (index !== -1) {
              tasks.value.splice(index, 1);
            }
          } catch (error) {
            console.error("Error removing task:", error);
          }
        }
      };
  
      onMounted(fetchTasks);
  
      return {
        newTask,
        tasks,
        addTask,
        toggleTask,
        removeTask,
      };
    },
  };
  </script>
  
  <style scoped>
  /* todo_title style */
  .todo-app h1 {
    text-align: center;
  }
  .todo_title {
    max-width: 400px;
    width: 100%;
    margin: 50px auto 30px;
    padding: 15px;
    display: flex;
  }

  /*todo-app add button style */
  .todo-app #btnAdd{
    margin: 0 auto;
    display: flex;
    padding: 15px 40px;
    font-size: 18px;
    font-weight: 500;
  }

  @media (max-width: 425px) {
    .todo_title {
      max-width: 80%;
    }
  }
  /* start table style */
  .todo-table {
    max-width: 1300px;
    width: 100%;
    margin: 0 auto;
    border-collapse: collapse;
    margin-top: 30px;
  }
  .todo-table :is(thead, tbody) tr {
    width: 100%;
  }
  .todo-table :is(th, td) {
    width: 100%;
  }
  .todo-table :is(thead, tbody) :is(th:first-child, td:first-child),
  .todo-table :is(thead, tbody) :is(th:last-child, td:last-child) {
    width: 50px;
  }
  
  .todo-table th,
  .todo-table td {
    border: 1px solid #ccc;
    padding: 10px;
    text-align: center;
  }
  
  .todo-table th {
    background-color: #f0f0f0;
  }
  
  .completed {
    text-decoration: line-through;
  }
  </style>
  