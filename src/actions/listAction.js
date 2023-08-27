import { createAsyncThunk } from '@reduxjs/toolkit'
import * as api from '../api'

export const getItem = createAsyncThunk(
    'list/getList',
    async (search = '', thunkAPI) => {
      try {
          const data = await api.getList(search)

          return data?.success ?  data : data
      } catch (error) {
        console.log(error)
        return { success: false, data: 'Something went wrong!' }
      }
    }
)


export const newItem = createAsyncThunk(
  'list/addList',
  async (item, thunkAPI) => {
    const data = await api.addList(item)
    return data
  }
)

export const setDoneItem = createAsyncThunk(
  'list/setDoneList',
  async (item, thunkAPI) => {
    const data = await api.setDoneList(item._id)
    return data
  }
)

export const updateItem = createAsyncThunk(
  'list/updateList',
  async (item, thunkAPI) => {
    const data = await api.updateList({ item: item.item, id: item._id })
    return data
  }
)

export const deleteItem = createAsyncThunk(
  'list/deleteList',
  async (item, thunkAPI) => {
    const data = await api.deleteList(item._id)
    return data
  }
)