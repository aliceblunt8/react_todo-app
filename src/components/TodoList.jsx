import React from 'react';
import PropTypes from 'prop-types';
import { TodoItem } from './TodoItem';

export const TodoList = React.memo(
  ({ items }) => (
    <ul className="todo-list">
      {items.map(item => (
        <TodoItem
          key={item.id}
          todo={item}
        />
      ))}
    </ul>
  ),
);

TodoList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  })).isRequired,
};
