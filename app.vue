<template>
  <TodoApp/>
</template>

<script>
import TodoApp from "./src/components/TodoApp.vue";
export default {
  name: 'App',
  components: {
    TodoApp,
  }
}
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
  margin-top: 20px;
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
