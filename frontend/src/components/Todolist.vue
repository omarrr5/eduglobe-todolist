<template>
  <div class="todo-list">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="todo in todos" :key="todo.id">
          <td>{{ todo.id }}</td>
          <td>{{ todo.title }}</td>
          <td>
            <span :class="{ 'completed': todo.completed, 'pending': !todo.completed }">
              {{ todo.completed ? 'Completed' : 'Pending' }}
            </span>
          </td>
          <td>
            <button @click="deleteTodo(todo.id)" class="delete-button">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'Todolist',
  props: {
    todos: {
      type: Array,
      default: () => []
    }
  },
    methods: {
    deleteTodo(todoId) {
      this.$emit('delete-todo', todoId);
    }
  }
};
</script>


<style scoped>
.todo-list {
  max-width: 600px;
  margin: 0 auto;
  padding-top: 50px;
}

table {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
}

thead {
  background-color: #f5f5f5;
}

th, td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  font-weight: bold;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}

.completed {
  color: green;
}

.pending {
  color: red;
}

.delete-button {
  margin-top: 5px;
  padding: 8px 14px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.delete-button:hover {
  background-color: #c82333;
}
</style>