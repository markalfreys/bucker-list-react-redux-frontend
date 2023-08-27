import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBucket } from '@fortawesome/free-solid-svg-icons'

function Header() {
  return (
    <header>
        <div className='container'>
          <FontAwesomeIcon icon={faBucket} size="2x" color='white' />
          <h3>Bucket List</h3>
        </div>
    </header>
  )
}

export default Header