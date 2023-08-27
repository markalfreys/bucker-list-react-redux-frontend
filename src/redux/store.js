import { configureStore } from '@reduxjs/toolkit'
import listsReducer from './reducers/listsReducer'

export default configureStore({ 
    reducer: {
        list: listsReducer
    }
})
