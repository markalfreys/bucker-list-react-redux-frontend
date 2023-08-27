import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

const ConfirmationModal = ({ confirmationModal, open,  hideConfirmationModal }) => {

    const { confirmationModal: confirmationModalRedux } = useSelector(state => state.list)
    const dispath = useDispatch()
 
    const [modal, setModal] = useState(false)
    
    useEffect(() => {
      setModal(open)
    
      return () => {
        setModal(false)
      }
    }, [open])
    

    const handleCancelBtn = () => {
        typeof hideConfirmationModal === 'function' ? hideConfirmationModal() : setModal(false)
    }

    const handleYesBtn = () => {
        dispath(confirmationModal.action())
    }

	return (
        modal && 
		<div className='backdrop' >
            <div className='modal'> 
                <div className='confirmationModalContent'>
                    <p>{confirmationModal.message}</p>
                </div>
				<div className="confirmationButtons">
					<button onClick={handleCancelBtn} className="cancelBtn">Cancel</button>
					<button onClick={handleYesBtn} className="yesBtn">{confirmationModalRedux.loading ? 'Loading...' : 'Yes' }</button>
				</div>
            </div>
        </div>		
    )
}

export default ConfirmationModal