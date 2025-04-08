import React, { useEffect, useState } from 'react';
import './App.css';
import { useQueryTasks } from './hooks/useQueryTasks';
import { useMutationAddTask } from './hooks/useMutationAddTask';
import Auth from './components/Auth';
import TodoContainer from './components/TodoContainer';
import {Routes, Route } from 'react-router-dom';
import Layout from './Layout';

function App() {

  const [todos, setTodos] = useState();
  const [inpAdd, setInpAdd] = useState('');
  const [radioAll, setCheckAll] = useState(true);
  const [radioDoned, setCheckDoned] = useState(false);
  const [radioActive, setActive] = useState(false);
  
  const {data, isLoading, refetch} = useQueryTasks();
  const {mutateAsync: addTaskMutateAsync} = useMutationAddTask();
 
 useEffect(() => {
  if (data) {
    if (radioAll) {
      setTodos(data);
    } else if (radioDoned) {
      let copy = data.filter(elem => elem.isdone)
      setTodos(copy);
      refetch();
    } else if (radioActive ){
      let copy = data.filter(elem => !elem.isdone)
      setTodos(copy)
      refetch();
    }
  }
 }, [data, radioAll, radioDoned, radioActive, refetch]);
 
 async function addTask () {
  if (inpAdd) {
    try {
      await addTaskMutateAsync({id: new Date().getTime(), task: inpAdd, isdone: false});
    } catch (error) {
      console.log(error);
    }
    refetch();
    setInpAdd('');
  }
 }

 //input for adding a task
 function handleInpAddTaskValue(e) {
  setInpAdd(e.target.value);
 }

 function handleCheckAll() {
  setCheckAll(true);
  setCheckDoned(false);
  setActive(false)
 }

 function handleCheckDoned() {
  setCheckAll(false);
  setCheckDoned(true);
  setActive(false);
 }

 function handleActive() {
  setCheckDoned(false);
  setCheckAll(false);
  setActive(true);
 }

 return (
  <Routes>
    <Route path='/' element={<Layout />}>
      <Route index element={
        <TodoContainer inpAdd={inpAdd} 
                       handleInpAddTaskValue={handleInpAddTaskValue}
                       addTask={addTask}
                       radioAll={radioAll} 
                       handleCheckAll={handleCheckAll}
                       radioDoned={radioDoned}
                       handleCheckDoned={handleCheckDoned}
                       radioActive={radioActive}
                       handleActive={handleActive}
                       todos={todos}
                       isLoading={isLoading}
                       refetch={refetch}/>
      } />
      <Route path='/auth' element={<Auth />} />
    </Route>
   </Routes>
 );
}

export default App;
