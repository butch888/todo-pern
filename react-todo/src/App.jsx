import './App.css';
import React, { useEffect, useState } from 'react';
import {Routes, Route } from 'react-router-dom';
import { useQueryTasks } from './hooks/useQueryTasks';
import { useMutationAddTask } from './hooks/useMutationAddTask';
import {Auth, TodoContainer, Layout, AuthProvider, PrivateRoute, DelAllUsers } from './components/index';

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

 const userId = localStorage.getItem('user_id')
 
 async function addTask () {
  if (inpAdd) {
    try {
      await addTaskMutateAsync({id: new Date().getTime(), task: inpAdd, isdone: false, user_id: userId});
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
  <AuthProvider>
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route element={<PrivateRoute />}>
          <Route path='/' element={
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
        </Route>
        <Route path='/auth' element={<Auth />} />
        <Route path='/delUsers' element={<DelAllUsers />} />
      </Route>
   </Routes>
  </AuthProvider>
 );
}

export default App;
