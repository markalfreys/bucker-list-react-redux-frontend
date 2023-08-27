import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faCheckCircle, faEdit, faSave, faTimes, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react'

function ListItem({ item, clickEve }) {

  const [edit, setEdit] = useState(false)
  const [editValue, setEditValue] = useState(item.item)
  
  useEffect(() => {
    setEditValue(item.item)
  
    return () => {
      setEditValue(item.item)
    }
  }, [item])
  

  const handleSetEdit = (e) => {
    setEdit(true)
    e.target.focus()
  }

  const handleEditClick = () => {
    clickEve('edit', {...item, item: editValue})
    setEdit(false)
    setEditValue(item.item)
  }

  return (
    <div className={`list ${item.status?.toLowerCase() === 'done' ? 'doneItem' : ''}`}>
        {
          edit ? <input type="text" className='listInput' value={editValue} onChange={(e) => setEditValue(e.target.value)} /> :
          <span className={`${item.status?.toLowerCase() === 'done' ? 'doneItem' : ''}`}>{item.item}</span>
        }
        <br />
        {
          item.status?.toLowerCase() === 'done' ? 
          <div>
            <FontAwesomeIcon icon={faCheckCircle} color='white' size='lg' className='iconAction' title='done' />
          </div> : 
          <div className='iconActionContainer'>
            {
              edit ? 
              <>
                <FontAwesomeIcon icon={faSave} color={item.item === editValue ? 'gray' : 'green'} size='lg' className='iconAction' title='done' onClick={item.item === editValue ? undefined : handleEditClick}/>
                <FontAwesomeIcon icon={faTimes} color='red' size='lg' className='iconAction' title='edit' onClick={() => setEdit(false)}/>
              </> :
              <>
                <FontAwesomeIcon icon={faCheck} color='green' size='lg' className='iconAction' title='done' onClick={() => clickEve('done', {...item, item: editValue})}/>
                <FontAwesomeIcon icon={faEdit} color='blue' size='lg' className='iconAction' title='edit' onClick={handleSetEdit}/>
                <FontAwesomeIcon icon={faTrashAlt} color='red' size='lg' className='iconAction' title='remove' onClick={() => clickEve('delete', item)}/>
              </>
            }
          </div>
        }
    </div>
  )
}

export default ListItem