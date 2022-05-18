const initialState = {
	allPoints: [],
	mapPoint: [],
};

export const calcPoint = (state = initialState, action) => {
	switch (action.type) {
		case 'ADD_POINT':
			console.log('Selected coordinates', action.payload);
			return {
				...state,
				allPoints: [...state.allPoints, action.payload],
				mapPoint: [...state.mapPoint, action.newObj],
			};
		default:
			return state;
	}
};

export default calcPoint;
