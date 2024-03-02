<template>
  <div class="task-detail">
    <h2>Task Details</h2>
    <div>
      <p><strong>Title:</strong> {{ title }}</p>
    </div>
    <button @click="openModal" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2 rounded">Add To-Do Item</button>

    <div class="todo-list">
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in filteredItems" :key="item.id">
            <td>{{ item.title }}</td>
            <td>
              <button @click="deleteTodoHandler(item.id)" class="delete-button">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="modal" v-show="showModal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <h2 class="text-xl font-semibold mb-4">Add To-Do Item</h2>
        <form @submit.prevent="addTodo">
          <div class="flex flex-col mb-4">
            <label for="todoTitle" class="text-sm font-medium">Title</label>
            <input type="text" id="todoTitle" v-model="todoTitle" placeholder="What you Wanna Do?" class="border rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-500" required>
          </div>
          <div class="flex justify-end">
            <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2 rounded">
              Add To-Do
            </button>
            <button type="button" @click="closeModal" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
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
props: {
    title: {
      type: String,
      required: true
    },
    todoId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      showModal: false,
      todoTitle: ''
    };
  },
  computed: {
    todos() {
      return this.$store.state.todos;
    },
    filteredItems() {
      return this.todos.filter(todo => todo.id === this.todoId).items;
    }
  },
  methods: {
    openModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.todoTitle = '';
    },
    addTodo() {
      this.$store.dispatch('addTodoItem', { todoId: this.todoId, item: { title: this.todoTitle } })
        .then(() => {
          this.closeModal();
        })
        .catch(error => {
          console.error('Error adding todo item:', error);
        });
    },
  }
};
</script>

<style scoped>
.task-detail {
  max-width: 600px;
  margin: 0 auto;
  padding-top: 50px;
}

h2 {
  font-size: 24px;
  margin-bottom: 20px;
}

p {
  font-size: 18px;
  margin-bottom: 10px;
}

.todo-list {
  max-width: 600px;
  margin: 0 auto;
  padding-top: 20px;
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
