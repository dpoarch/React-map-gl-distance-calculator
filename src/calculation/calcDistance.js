export const calcDistance = (state = '', action) => {
	switch (action.type) {
		case 'MEASURE_DISTANCE':
			console.log('Current distance', action.payload);
			return { ...state, distance: action.payload };
		default:
			return state;
	}
};

export default calcDistance;
