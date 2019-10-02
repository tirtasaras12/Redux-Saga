import { all, call, put, takeLatest, fork } from 'redux-saga/effects';
import Axios from 'axios';

// GET MEMBER START HERE
const getMemberRequest = async () => {
    return await Axios
        .get('http://10.1.17.192:3000/artist')
        .then(response => response).catch(error => error)
}

function* getMember() {
    try {
        const response = yield call(getMemberRequest);
        if (response.statusText === "OK") {
            yield put({
                type: 'GET_MEMBER_SUCCESS',
                listMember: response.data
            });
        } else {
            yield put({
                type: 'GET_MEMBER_FAILURE',
                message: "Oops, something went wrong"
            })
        }
    } catch (error) {
        yield put({
            type: 'GET_MEMBER_FAILURE',
            message: "Oops, something went wrong"
        })
    }
}

function* getMemberSaga() {
    yield takeLatest('GET_MEMBER', getMember)
}

//SEARCH MEMBER
const handleChangeRequest = async payload => {
    return await Axios
        .get('http://10.1.17.192:3000/artist?nama=' + payload)
        .then(response => response)
        .catch(error => error)
}

function* handleChange({ payload }) {
    try {
        const response = yield call(handleChangeRequest, payload);
        // console.log('response ==>', response);

        if (response.statusText === "OK") {
            yield put({
                type: 'HANDLE_CHANGE_SUCCESS',
                listMember: response.data
            });
        } else {
            yield put({
                type: 'HANDLE_CHANGE_FAILURE',
                message: "Data not found!"
            })
        }
    } catch (error) {
        yield put({
            type: 'HANDLE_CHANGE_FAILURE',
            message: "Oops, something went wrong"
        })
    }
}

function* handleChangeSaga() {
    yield takeLatest('HANDLE_CHANGE', handleChange)
}

//ADD MEMBER
const addChangeRequest = async payload => {
    // console.log('payload==>', payload);
    return await Axios
        .post('http://10.1.17.192:3000/artist', payload.form)
        .then(response => response).catch(error => error)
}

function* addChange(payload) {
    try {
        const response = yield call(addChangeRequest, payload);
        if (response.statusText === "Created") {
            yield put({
                type: 'ADD_MEMBER_SUCCESS',
            });
        } else {
            yield put({
                type: 'ADD_MEMBER_FAILURE',
                message: "Input failed!"
            })
        }
    } catch (error) {
        yield put({
            type: 'ADD_MEMBER_FAILURE',
            message: "Oops, something went wrong"
        })
    }
}

function* addChangeSaga() {
    yield takeLatest('ADD_MEMBER', addChange)
}

//UPDATE MEMBER
const updateMemberRequest = async payload => {
    // console.log('payload==>', payload);

    return await Axios
        .put('http://10.1.17.192:3000/artist/' + payload.update.id, {
            nama: payload.update.nama,
            image: payload.update.image
        })
        .then(response => response).catch(error => error)
}

function* updateMember(payload) {
    try {
        const response = yield call(updateMemberRequest, payload);
        // console.log('response ==>', response);

        if (response.statusText === "OK") {
            yield put({
                type: 'UPDATE_MEMBER_SUCCESS'
            });
        } else {
            yield put({
                type: 'UPDATE_MEMBER_FAILURE',
                message: "Update data failed!"
            })
        }
    } catch (error) {
        yield put({
            type: 'UPDATE_MEMBER_FAILURE',
            message: "Oops, something went wrong"
        })
    }
}

function* updateMemberSaga() {
    yield takeLatest('UPDATE_MEMBER', updateMember)
}

//DELETE MEMBER
const deleteMemberRequest = async payload => {
    console.log('payload==>', payload);
    return await Axios
        .delete('http://10.1.17.192:3000/artist/' + payload.delete.id)         
        .then(response => response).catch(error => error)
}

function* deleteMember(payload) {
    try {
        const response = yield call(deleteMemberRequest, payload);
        if (response.statusText === "OK") {
            yield put({
                type: 'DELETE_MEMBER_SUCCESS'

            })
        } else {
            yield put({
                type: 'DELETE_MEMBER_FAILURE',
                message: "Can't delete this item!"
            })
        }
    } catch (error) {
        yield put({
            type: 'DELETE_MEMBER_FAILURE',
            message: "Oops, something went wrong"
        })
    }
}

function* deleteMemberSaga(){
    yield takeLatest('DELETE_MEMBER', deleteMember)
}

export default function* rootSaga() {
    yield all([
        fork(getMemberSaga),
        fork(handleChangeSaga),
        fork(addChangeSaga),
        fork(updateMemberSaga),
        fork(deleteMemberSaga)
    ])
}