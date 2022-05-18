import { combineReducers } from 'redux';
import calcPoint from './calcPoint';
import calcDistance from './calcDistance';

export default combineReducers({
	calcPoint,
	calcDistance,
});
