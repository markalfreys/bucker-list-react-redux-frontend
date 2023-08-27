import { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { newItem } from '../actions/listAction';

const AddListForm = () => {

  const [item, setItem] = useState('')
  const { addLoading, loading } = useSelector(state => state.list.lists)
  const dispath = useDispatch()

  const handleAddNewItem = (e) => {
    e.preventDefault();

    if(!item && addLoading) return;

    dispath(newItem(item))
    setItem('')
  }

  return (
    <div className='addContainer'>
      <h3>Add new list</h3><br />
      <form action="" method="post" onSubmit={handleAddNewItem}>
        <input type="text" name="item" id="" value={item} placeholder='Item...' onChange={(e) => setItem(e.target.value)}/>
        <input type="submit" value={addLoading ? 'Loading...' : 'ADD'}  disabled={addLoading && loading}/>
      </form>
    </div>
  )
}

export default AddListForm