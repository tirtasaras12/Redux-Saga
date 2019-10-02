import { all } from 'redux-saga/effects';

import member  from './member';

export default function* rootSaga() {
    yield all([
        member()
    ])
}