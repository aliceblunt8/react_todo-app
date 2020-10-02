import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { deleteTodo, updateTodo } from '../redux/store';

export const TodoItem = ({ todo }) => {
  const [isEditable, setEditing] = useState(false);
  const [newTitle, setTitle] = useState(todo.title);
  const dispatch = useDispatch();

  const handleEditing = (event) => {
    const { key } = event;

    switch (key) {
      case 'Enter':
        if (newTitle) {
          dispatch(updateTodo(todo.id, newTitle));
        } else {
          setTitle(todo.title);
        }

        setEditing(false);
        break;

      case 'Escape':
        setEditing(false);
        setTitle(todo.title);
        break;

      default:
        break;
    }
  };

  const handleBlur = () => {
    if (newTitle) {
      dispatch(updateTodo(todo.id, newTitle));
    } else {
      setTitle(todo.title);
    }

    setEditing(false);
  };

  return (
    <li
      className={classNames(
        { completed: todo.completed },
        { editing: isEditable },
      )}
      onDoubleClick={() => setEditing(!isEditable)}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={todo.completed}
          onChange={() => dispatch(updateTodo(todo.id))}
        />
        <label>{todo.title}</label>
        <button
          type="button"
          className="destroy"
          onClick={() => dispatch(deleteTodo(todo.id))}
        />
      </div>
      {isEditable && (
        <input
          type="text"
          className="edit"
          autoFocus
          value={newTitle}
          onChange={event => setTitle(event.target.value.trim())}
          onKeyUp={handleEditing}
          onBlur={handleBlur}
        />
      )}
    </li>
  );
};

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
};
