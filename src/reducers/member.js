import { HANDLE_CHANGE } from "../action/types"


const initialState = {
    searchText: '',
    id: '',
    nama: '',
    image: '',
    listMember: [],
    status: 'tambah',
    loading: false,
    message: '',
    goBack: false,
    deleted: false
}

const member = (state = initialState, action) => {
    switch (action.type) {
        case 'LOADER_START':
            return {
                ...state,
                loading: true
            }
        case HANDLE_CHANGE:
            return {
                ...state,
                loading: true,
                message: ''
            }
        case 'HANDLE_CHANGE_SUCCESS':
            return {
                ...state,
                loading: false,
                listMember: action.listMember
            }
        case 'HANDLE_CHANGE_FAILURE':
            return {
                ...state,
                loading: false,
                message: action.message,
                listMember: []
            }
        case 'GET_MEMBER':
            return {
                ...state,
                loading: true,
                message: ''
            }
        case 'GET_MEMBER_SUCCESS':
            return {
                ...state,
                loading: false,
                listMember: action.listMember
            }
        case 'GET_MEMBER_FAILURE':
            return {
                ...state,
                listMember: [],
                loading: false,
                message: action.message
            }
        case 'ADD_CHANGE':
            return {
                ...state,
                [action.payload.key]: action.payload.value
            }
        case 'ADD_MEMBER':
            return {
                ...state,
                loading: true,
                goBack: false,
                message: ''
            }
        case 'ADD_MEMBER_SUCCESS':
            return {
                ...state,
                loading: false,
                goBack: true,
                // [action.payload.key]: action.payload.value
            }
        case 'ADD_MEMBER_FAILURE':
            return {
                ...state,
                loading: false,
                message: action.message
            }
        case 'UPDATE_MEMBER':
            return {
                ...state,
                goBack: false,
                message: ''
            }
        case 'UPDATE_MEMBER_SUCCESS':
            return {
                ...state,
                loading: false,
                goBack: true,
            }
        case 'UPDATE_MEMBER_FAILURE':
            return {
                ...state,
                loading: false,
                message: action.message
            }
        case 'DELETE_MEMBER':
            return {
                ...state,
                loading: false,
            }
        case 'DELETE_MEMBER_SUCCESS':
            return {
                ...state,
                loading: false,
                deleted: true
            }
        case 'DELETE_MEMBER_FAILURE':
            return {
                ...state,
                deleted: false,
                message: action.message
            }
        case 'GET_DATA':
            return {
                ...state,
                id: action.payload.id,
                nama: action.payload.nama,
                image: action.payload.image,
                status: action.payload.status
            }
        case 'CLEAR_FORM':
            return {
                ...state,
                nama: '',
                image: '',
                status: 'tambah'
            }
        default:
            return { ...state }
    }
}

export default member;