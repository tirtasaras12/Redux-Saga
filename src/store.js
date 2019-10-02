import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers';
import rootSaga from './saga';
// import rootSaga from './saga/member';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

export default function createStores() {

    const composeEnhance = typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose

    const store = createStore(
        rootReducer,
        // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() || {},
        composeEnhance(applyMiddleware(...middlewares))
    )
    
    sagaMiddleware.run(rootSaga);

    return store
}