import { createStore } from "vuex";
import axiosClient from "../axios";

const store = createStore({
    state:{
        user: {
            data: {},
            token: sessionStorage.getItem("TOKEN"),
        }
    },
    getters:{},
    actions: {
        register({commit}, user) {
            return axiosClient.post('/register', user)
              .then(({data}) => {
                commit('setUser', data.user);
                commit('setToken', data.token)
                return data;
              })
          },
          login({commit}, user) {
            return axiosClient.post('/login', user)
              .then(({data}) => {
                commit('setUser', data.user);
                commit('setToken', data.token)
                return data;
              })
          }, 
          logout({commit}) {
            return axiosClient.post('/logout')
              .then(response => {
                commit('logout')
                return response;
              })
          },
          fetchTodos({ commit }) {
            return axiosClient.get('/todos')
                .then(response => {
                    commit('setTodos', response.data); 
                    return response.data;
                })
                .catch(error => {
                    console.error('Error fetching todos:', error);
                    throw error;
                });
        },
        updateTodo({ commit }, todo) {
          return axiosClient.patch(`/todos/${todo.id}`, todo)
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
    },
    mutations:{
        logout: (state) => {
            state.user.token = null;
            state.user.data = {};
            sessionStorage.removeItem("TOKEN");
        },
        setUser: (state, user) => {
            state.user.data = user;
          },
        setToken: (state, token) => {
            state.user.token = token;
            sessionStorage.setItem('TOKEN', token);
          },
          setTodos(state, todos) {
            state.todos = todos;
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

    },
    modules:{},
});

export default store;