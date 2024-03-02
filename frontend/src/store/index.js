import { createStore } from "vuex";
import axiosClient from "../axios";

const store = createStore({
  state:{
    user: {
      data: {},
      id: sessionStorage.getItem("USER_ID") || null, 
      token: sessionStorage.getItem("TOKEN"),
    },
    todos: [],
  },
  getters:{},
  actions: {
    register({commit}, user) {
      return axiosClient.post('/register', user)
        .then(({data}) => {
          commit('setUser', data.user);
          commit('setToken', data.token);
          commit('setUserId', data.user.id);
          return data;
        })
        .catch(error => {
          console.error('Error registering user:', error);
          throw error;
        });
    },
    login({commit}, user) {
      return axiosClient.post('/login', user)
        .then(({data}) => {
          commit('setUser', data.user);
          commit('setToken', data.token);
          commit('setUserId', data.user.id);
          return data;
        })
        .catch(error => {
          console.error('Error logging in:', error);
          throw error;
        });
    }, 
    logout({commit}) {
      return axiosClient.post('/logout')
        .then(response => {
          commit('logout')
          return response;
        })
        .catch(error => {
          console.error('Error logging out:', error);
          throw error;
        });
    },


    fetchUserTodos({ commit, state }) {
      const userId = state.user.id; 
      return axiosClient.get(`/user/${userId}/todos`)
        .then(response => {
          commit('setTodos', response.data); 
          return response.data;
        })
        .catch(error => {
          console.error('Error fetching user todos:', error);
          throw error;
        });
    },

    addTodo({ commit, state }, task) {
      const userId = state.user.id; 
      const todo = {
        title: task.title,
        completed: task.completed
      };
      return axiosClient.post(`/user/${userId}/todos`, todo)
        .then(response => {
          const newTodo = response.data; 
          commit('addTodo', newTodo);  
          return newTodo;
        })
        .catch(error => {
          console.error('Error adding todo:', error);
          throw error;
        });
    },
    

    updateTodo({ commit }, updatedTodo) {
      return axiosClient.patch(`/todos/${updatedTodo.id}`, updatedTodo)
        .then(response => {
          commit('updateTodo', response.data); 
          return response.data; 
        })
        .catch(error => {
          console.error('Error updating todo:', error);
          throw error;
        });
    },

    deleteTodo({ commit }, todoId) {
      return axiosClient.delete(`/todos/${todoId}`)
        .then(response => {
          commit('removeTodo', todoId); 
          return response.data;
        })
        .catch(error => {
          console.error('Error deleting todo:', error);
          throw error;
        });
    },

    addTodoItem({ commit }, { todoId, item }) {
      return axiosClient.post(`/todos/${todoId}/items`, item)
        .then(response => {
          const newItem = response.data;
          commit('addTodoItem', newItem);
          return newItem;
        })
        .catch(error => {
          console.error('Error adding todo item:', error);
          throw error;
        });
    },
  },
  mutations:{
    logout: (state) => {
      state.user.token = null;
      state.user.data = {};
      sessionStorage.removeItem("TOKEN");
    },
    setUser: (state, userData) => {
      state.user.data = userData;
    },
    setToken: (state, token) => {
      state.user.token = token;
      sessionStorage.setItem('TOKEN', token);
    },
    setUserId: (state, userId) => {
      state.user.id = userId;
      sessionStorage.setItem('USER_ID', userId);
    },
    setTodos(state, todos) {
      state.todos = todos;
    },
    addTodo(state, newTodo) {
      state.todos.push(newTodo);
    },
    updateTodo(state, updatedTodo) {
      state.todos = state.todos.map(todo => {
        if (todo.id === updatedTodo.id) {
          return updatedTodo;
        }
        return todo;
      });
    },
    removeTodo(state, todoId) {
      state.todos = state.todos.filter(todo => todo.id !== todoId); 
    },
    addTodoItem(state, newItem) {
      const todoIndex = state.todos.findIndex(todo => todo.id === newItem.todo_id);
      if (todoIndex !== -1) {
        state.todos[todoIndex].items.push(newItem);
      }
    },
  },
  modules:{},
});

export default store;
