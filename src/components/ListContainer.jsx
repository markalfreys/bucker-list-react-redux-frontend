import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteItem, getItem, setDoneItem, updateItem } from '../actions/listAction'

import ListItem from "./ListItem"
import ConfirmationModal from './ConfirmationModal'
import { closeConformationModal, openConformationModal } from '../redux/reducers/listsReducer'


function ListContainer() {

    const { lists, confirmationModal: confirmationModalRedux } = useSelector(state => state.list)
    const dispath = useDispatch()

    const handleSearch = (e) => {
        var search = e.target.value

        dispath(getItem(search))
    }

    const [confirmationModal, setConfirmationModal] = useState({
        open: false,
        action: undefined,
        message: ''
    })

    const hideConfirmationModal = () => {
        dispath(closeConformationModal())
        setConfirmationModal({
            action: undefined,
            message: ''
        })
    }

    const showConfirmationModal = (type, item) => {
        if(!type || !item) return;

        if(type === 'done'){
            setConfirmationModal({
                action: () => setDoneItem(item),
                message: 'Are you sure you want to set Done this item?'
            })
        }else if(type === 'edit'){
            setConfirmationModal({
                action: () => updateItem(item),
                message: 'Update the changes?'
            })
        }else if(type === 'delete'){
            setConfirmationModal({
                action: () => deleteItem(item),
                message: 'Are you sure you want to set Delete this item?'
            })
        }else return hideConfirmationModal();

        dispath(openConformationModal())
    }
    
    return (
        <> 
            <div className='listContainer'>
                <input type="search" name="" id="" placeholder='Search item...' onChange={handleSearch} />
                <div className='lists fancyScrollBar'>
                {
                    lists.loading ? 
                    <div className='loadingBox'>
                        <div className='rotating'></div>    
                    </div> :
                    lists.list.length > 0 ? lists.list.map((item, key) => <ListItem key={key} item={item} clickEve={showConfirmationModal} />) :
                    <p className='noListMessage'>No List Found!</p>
                }
                </div>
            </div>
            {confirmationModalRedux?.mount && <ConfirmationModal confirmationModal={confirmationModal} open={confirmationModalRedux.mount} hideConfirmationModal={hideConfirmationModal} />}
        </>
    )
}

export default ListContainer