import { createStore } from 'redux'
import { SetUserReducer } from './reducers/SetUserReducer'

export const ConfigureStore = () => {
    return createStore(SetUserReducer);
}