<template>
  <div class="todo-list">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Status</th>
          <th>Actions</th>
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
            <button @click="openEditModal(todo)" class="edit-button">Edit</button>
            <button @click="deleteTodoHandler(todo.id)" class="delete-button">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    
    <div class="modal" v-show="editModal">
      <div class="modal-content">
        <span class="close" @click="closeEditModal">&times;</span>
        <h2 class="text-xl font-semibold mb-4">Edit Task</h2>
        <form @submit.prevent="updateTask">
          <div class="flex flex-col mb-4">
            <label for="editTaskName" class="text-sm font-medium">Task Name</label>
            <input type="text" id="editTaskName" v-model="editedTask.title" placeholder="Enter task name" class="border rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-500">
          </div>
          <div class="flex flex-col mb-4">
            <label for="editTaskStatus" class="text-sm font-medium">Task Status</label>
            <select id="editTaskStatus" v-model="editedTask.completed" class="border rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-500">
            <option :value="!editedTask.completed">{{ editedTask.completed ? 'Pending' : 'Completed' }}</option>
            </select>
          </div>
          <div class="flex justify-end">
            <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2 rounded">
              Update Task
            </button>
            <button type="button" @click="closeEditModal" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: 'Todolist',
  computed: {
    todos() {
      return this.$store.state.todos; 
    }
  },
  created() {
    this.$store.dispatch('fetchTodos'); 
  },
    data() {
    return {
      editModal: false,
      editedTask: { id: null, title: '', completed: false }, 
    };
  },
  methods: {
    deleteTodoHandler(todoId) {
      this.$store.dispatch('deleteTodo', todoId)
        .then(() => {
          console.log('Todo deleted successfully');
        })
        .catch(error => {
          console.error('Error deleting todo:', error);
        });
    },
    openEditModal(todo) {
      this.editedTask = { ...todo }; 
      this.editModal = true;
    },
    closeEditModal() {
      this.editModal = false;
    },
    updateTask() {
      this.$store.dispatch('updateTodo', this.editedTask) 
        .then(() => {
          console.log('Todo updated successfully');
          this.closeEditModal(); 
        })
        .catch(error => { 
          console.error('Error updating todo:', error);
        });
    },
    updateTaskStatus() {
      this.$emit('update-task', this.editedTask);
      this.closeEditModal();
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

.delete-button, .edit-button { 
  margin-top: 5px;
  padding: 8px 14px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.delete-button {
  background-color: #dc3545;
  color: white;
}

.delete-button:hover {
  background-color: #c82333;
}

.edit-button {
  margin-right: 5px;
  background-color: #28a745;
  color: white;
}

.edit-button:hover {
  background-color: #218838;
}
</style>
