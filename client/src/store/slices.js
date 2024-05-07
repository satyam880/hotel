import { createSlice } from '@reduxjs/toolkit'


export const userSlice=createSlice({
  name: 'slice1',
  initialState:{
    list:[],
    curr:""
  } ,
  curr:"",
  reducers: {
    
    get_user:(state,action)=>{
        state.list=action.payload;
    },
    // add_user:(state,action)=>{

    // },
    edit_user:(state,action)=>{
      let ind= state.list.findIndex(user=>user._id==action.payload)
        state.curr=state.list[ind]
    },
    delete_user:(state,action)=>{
      state.list=state.list.filter(user=>user._id!==action.payload)
    }

  },
})

// Action creators are generated for each case reducer function
export const {get_user, add_user, edit_user, delete_user } = userSlice.actions

export default userSlice.reducer