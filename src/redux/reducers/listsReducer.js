import { createSlice } from '@reduxjs/toolkit'
import { getItem, newItem, setDoneItem, updateItem, deleteItem } from '../../actions/listAction'

export const listSlice = createSlice({
    name: 'list',
    initialState: {
        lists: {
            list: [],
            loading: false,
            addLoading: false,
            error: null,
        },
        confirmationModal: {
            mount: false,
            loading: false,
            error: null,
        }
    },
    reducers:{
        closeError: state => {
            state.lists.error = null
        },
        openConformationModal: state => {
            state.confirmationModal.mount = true
        },
        closeConformationModal: state => {
            state.confirmationModal.mount = true
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getItem.pending, state => {
            state.lists.loading = true
        })
        builder.addCase(getItem.fulfilled, (state, action) => {
            if(action.payload.success){
                state.lists.list = action.payload.data
                state.lists.error=null
            }else{
                state.lists.list = []
                state.lists.error= action.payload.data
            }
            state.lists.loading = false
            
        })
        builder.addCase(newItem.rejected, state => {
            state.lists.error='Internal Error, please try again.'
            state.lists.addLoading = false
        })
        builder.addCase(newItem.pending, state => {
            state.lists.addLoading = true
            state.lists.error=null
        })
        builder.addCase(newItem.fulfilled, (state, action) => {
            state.lists.addLoading = false
            
            if(!action.payload.success) {
                state.lists.error=action.payload.data
                return;
            }
            
            state.lists.list = [action.payload.data, ...state.lists.list],
            state.lists.error=null

        })
        builder.addCase(setDoneItem.rejected, state => {
            state.confirmationModal.loading = false
            state.lists.error='Internal Error, please try again.'
            state.confirmationModal.mount = false
        })
        builder.addCase(setDoneItem.pending, state => {
            state.confirmationModal.loading = true
        })
        builder.addCase(setDoneItem.fulfilled, (state, action) => {
            state.confirmationModal.loading = false
            state.confirmationModal.mount = false

            if(!action.payload.success) return state.lists.error=action.payload.data;

            let temp = state.lists.list.filter(item => item._id !== action.payload.data._id)
            state.lists.list = [...temp, action.payload.data]
        })
        builder.addCase(updateItem.rejected, state => {
            state.confirmationModal.loading = false
            state.lists.error='Internal Error, please try again.'
            state.confirmationModal.mount = false
        })
        builder.addCase(updateItem.pending, state => {
            state.confirmationModal.loading = true
        })
        builder.addCase(updateItem.fulfilled, (state, action) => {
            state.confirmationModal.mount = false
            state.confirmationModal.loading = false
            if(!action.payload.success) {
                state.lists.error=action.payload.data
                return;
            }
            
            state.lists.list = state.lists.list.map(item => item._id === action.payload.data._id ? { ...item, item: action.payload.data.item } : item)
        })
        builder.addCase(deleteItem.rejected, state => {
            state.confirmationModal.loading = false
            state.lists.error='Internal Error, please try again.'
            state.confirmationModal.mount = false
        })
        builder.addCase(deleteItem.pending, state => {
            state.confirmationModal.loading = true
        })
        builder.addCase(deleteItem.fulfilled, (state, action) => {
            state.confirmationModal.mount = false
            state.confirmationModal.loading = false
       
            if(!action.payload.success) {
                state.lists.error=action.payload.data
                return;
            }
            
            state.lists.list = state.lists.list.filter(item => item._id !== action.payload.data )
        })
    }
})

export const { closeError, openConformationModal, closeConformationModal } = listSlice.actions

export default listSlice.reducer