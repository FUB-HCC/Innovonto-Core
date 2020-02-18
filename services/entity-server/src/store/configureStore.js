import {routerMiddleware} from 'connected-react-router'
import {createBrowserHistory} from 'history'
import {applyMiddleware, compose, createStore} from 'redux'
import {persistStore, persistCombineReducers} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk'
import createRootReducer from '../reducers'


export const history = createBrowserHistory();
const rootReducer = createRootReducer(history);
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['session']
};
const persistedReducer = persistCombineReducers(persistConfig, {...rootReducer});

export default function configureStore(preloadedState) {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    const store = createStore(
        persistedReducer, // root reducer with router state
        preloadedState,
        composeEnhancers(
            applyMiddleware(
                routerMiddleware(history),
                thunk,
            ),
        ),
    );

    let persistor = persistStore(store);

    return {store, persistor}
}
