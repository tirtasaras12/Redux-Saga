import { HANDLE_CHANGE } from "./types"

export const loaderStart = () => ({
    type: 'LOADER_START'
})

export const handleChange = (text) => ({
    type: HANDLE_CHANGE,
    payload: text
})

export const getMember = () => ({
    type: 'GET_MEMBER',
    // data: data
})

export const addMember = payload => ({
    type: 'ADD_MEMBER',
    form: payload
})

export const addChange = payload => ({
    type: 'ADD_CHANGE',
    payload: payload,
})

export const updateMember = payload => ({
    type: 'UPDATE_MEMBER',
    update: payload
})

export const deleteMember = payload => ({
    type: 'DELETE_MEMBER',
    delete: payload
})

export const getData = data => ({
    type: 'GET_DATA',
    payload: data
})

export const clearForm = () => ({
    type: 'CLEAR_FORM'
})