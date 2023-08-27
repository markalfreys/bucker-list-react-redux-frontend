import { useDispatch } from 'react-redux'

import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { closeError } from '../redux/reducers/listsReducer'

import sadZombie from '../assets/img/sad-zombie2.png'

const ErrorModal = ({ error }) => {

    const dispath = useDispatch()

    const handleCloseModal = () => dispath(closeError())

    return (
        <div className='backdrop'>
            <div className='modal'> 
                <div className='closeIconCont'>
                    <FontAwesomeIcon icon={faTimes} size='lg' onClick={handleCloseModal} className='closeIcon' />
                </div>
                <div className='modalContent'>
                    <img src={sadZombie} alt="" loading="lazy" />
                    <p>{error}</p>
                </div>
            </div>
        </div>
    )
}


export default ErrorModal