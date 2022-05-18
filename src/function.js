export const addPoint = (coord) => ({
	type: 'ADD_POINT',
	payload: coord,
	newObj: {
		type: 'Feature',
		geometry: {
			type: 'Point',
			coordinates: coord,
		},
	},
});

export const measureDistance = (length) => ({
	type: 'MEASURE_DISTANCE',
	payload: length,
});
