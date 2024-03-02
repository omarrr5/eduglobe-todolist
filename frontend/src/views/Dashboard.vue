<template>
  <div>
    <header class="bg-white shadow flex items-center justify-center">
      <h2 class="text-3xl font-bold tracking-tight text-gray-900 mr-4">To Do List</h2>
      <button @click="openModal" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-4 rounded">
        Add Task
      </button>
    </header>
    <main>
      <div class="modal" v-show="showModal">
        <div class="modal-content">
          <span class="close" @click="closeModal">&times;</span>
          <h2 class="text-xl font-semibold mb-4">Enter Task Details</h2>
          <form @submit.prevent="addTask">
            <div class="flex flex-col mb-4">
              <label for="taskTitle" class="text-sm font-medium">Title</label>
              <input type="text" id="taskTitle" v-model="taskTitle" placeholder="Enter task title" class="border rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-500" required>
            </div>
            <div class="flex justify-end">
              <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2 rounded">
                Add Task
              </button>
              <button type="button" @click="closeModal" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
      <div>
        <Todolist :todos="tasks" @delete-todo="deleteTask" @update-task="updateTask"/>
      </div>
    </main>
  </div>
</template>

<script>
import Todolist from '../components/Todolist.vue';

export default {
  name: "Dashboard",
  components: {
    Todolist,
  },
  data() {
    return {
      showModal: false,
      taskTitle: '',
      tasks: [],
    };
  },
  methods: {
    openModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.taskTitle = '';
    },
 


  addTask() {
    const todo = {
      title: this.taskTitle,
      completed: false 
    };
    this.$store.dispatch('addTodo', todo)
      .then((data) => {
        this.tasks.push(data);
        this.taskTitle = '';
        this.closeModal();
      })
      .catch(error => {
        console.error('Error adding todo:', error);
      });
  },

    updateTask(updatedTask){
      const index = this.tasks.findIndex(task => task.id === updatedTask.id);
      if(index !== -1){
        this.tasks[index] = { ...updatedTask };
      }
    },

    deleteTask(todoId) {
      this.tasks = this.tasks.filter(todo => todo.id !== todoId);
    },
  }
};
</script>

<style>
.modal {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0,0,0,0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>
