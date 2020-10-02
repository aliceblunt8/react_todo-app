import { createStore } from 'redux';

const initialState = {
  todos: [],
};

// Selectors
export const getTodos = state => state.todos;

// Action types
const SET_TODOS = 'SET_TODOS';
const ADD_TODO = 'ADD_TODO';
const DELETE_TODO = 'DELETE_TODO';
const UPDATE_TODO = 'UPDATE_TODO';
const TOGGLE_TODOS = 'TOGGLE_TODOS';
const CLEAR_COMPLETED = 'CLEAR_COMPLETED';

// Action creators
export const setTodos = todos => ({
  type: SET_TODOS,
  todos,
});

export const addTodo = todo => ({
  type: ADD_TODO,
  todo,
});

export const deleteTodo = todoId => ({
  type: DELETE_TODO,
  todoId,
});

export const updateTodo = (todoId, title) => ({
  type: UPDATE_TODO,
  todoId,
  title,
});

export const toggleTodos = checked => ({
  type: TOGGLE_TODOS,
  checked,
});

export const clearCompleted = () => ({
  type: CLEAR_COMPLETED,
});

// Reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TODOS:
      return {
        ...state,
        todos: action.todos,
      };
    case ADD_TODO:
      return {
        ...state,
        todos: [
          ...state.todos,
          action.todo,
        ],
      };
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.todoId),
      };
    case UPDATE_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.id !== action.todoId) {
            return { ...todo };
          }

          if (action.title) {
            return {
              ...todo,
              title: action.title,
            };
          }

          return {
            ...todo,
            completed: !todo.completed,
          };
        }),
      };
    case TOGGLE_TODOS:
      return {
        ...state,
        todos: state.todos.map(todo => (
          {
            ...todo,
            completed: action.checked,
          }
        )),
      };
    case CLEAR_COMPLETED:
      return {
        ...state,
        todos: state.todos.filter(todo => !todo.completed),
      };
    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;
