/* eslint-disable max-len */
import React, { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TodoList } from './components/TodoList';
import { TodosFilter } from './components/TodosFilter';
import { getfilteredTodos } from './helpers';
import { getTodos, setTodos, addTodo, toggleTodos, clearCompleted } from './redux/store';

const TodoApp = () => {
  const todos = useSelector(getTodos);
  const dispatch = useDispatch();

  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState('all');
  const completedTodos = useMemo(
    () => todos.filter(todo => todo.completed).length,
    [todos],
  );
  const activeTodos = useMemo(
    () => todos.filter(todo => !todo.completed).length,
    [todos],
  );

  useEffect(() => {
    if (!localStorage.todos) {
      localStorage.setItem('todos', JSON.stringify([]));
    } else {
      dispatch(setTodos(JSON.parse(localStorage.getItem('todos'))));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!newTodo) {
      return;
    }

    dispatch(addTodo({
      id: +new Date(),
      title: newTodo,
      completed: false,
    }));

    setNewTodo('');
  };

  const filteredTodos = useMemo(
    () => getfilteredTodos(todos, filter),
    [todos, filter],
  );

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="new-todo"
            placeholder="What needs to be done?"
            value={newTodo}
            onChange={event => setNewTodo(event.target.value.trimLeft())}
          />
        </form>
      </header>

      {todos.length > 0 && (
        <>
          <section className="main">
            <input
              type="checkbox"
              id="toggle-all"
              className="toggle-all"
              checked={activeTodos === 0}
              onChange={event => dispatch(toggleTodos(event.target.checked))}
            />
            <label htmlFor="toggle-all">Mark all as complete</label>
            <TodoList
              items={filteredTodos}
            />
          </section>

          <footer className="footer">
            <span className="todo-count">
              {`${activeTodos} items left`}
            </span>

            <TodosFilter
              handleFilter={status => setFilter(status)}
              selectedFilter={filter}
            />
            {completedTodos > 0 && (
              <button
                type="button"
                className="clear-completed"
                onClick={() => dispatch(clearCompleted())}
              >
                Clear completed
              </button>
            )}
          </footer>
        </>
      )}
    </section>
  );
};

export default TodoApp;
