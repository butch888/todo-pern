import React from 'react'
import TodoList from './TodoList';
import Radio from './Radio';
import AddTask from './AddTask';
export default function TodoContainer(props) {
  const {
          inpAdd, 
          handleInpAddTaskValue, 
          addTask,
          radioAll,
          handleCheckAll,
          radioDoned,
          handleCheckDoned,
          radioActive,
          handleActive,
          todos,
          isLoading,
          refetch
        } = props;

  return (
    <div>
      <AddTask inpAdd={inpAdd}
                handleInpAddTaskValue={handleInpAddTaskValue}
                addTask={addTask} />

      <Radio checkAll={radioAll} 
              handleCheckAll={handleCheckAll}
              checkDoned={radioDoned}
              handleCheckDoned={handleCheckDoned}
              active={radioActive}
              handlActive={handleActive}/>
      
      {!isLoading ? todos?.map((todo) => (
        <TodoList key={todo.id} id={todo.id} isDone={todo.isdone} task={todo.task} refetch={refetch}/>
      )) : <div>Loading...</div>}
    </div>
  )
}
