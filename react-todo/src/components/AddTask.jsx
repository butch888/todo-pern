

const AddTask = (props) => {
  const {inpAdd, handleInpAddTaskValue, addTask} = props;
  return (
    <div style={{margin: '10px 0'}}>
      <input type='text' value={inpAdd} autoFocus={true} onChange={handleInpAddTaskValue}/>
      <button onClick={addTask}>+</button>
    </div>
  )
}

export default AddTask;