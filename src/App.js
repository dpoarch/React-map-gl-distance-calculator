import React, { useState } from 'react';
import ReactMapGL, { FullscreenControl, Source, Layer } from 'react-map-gl';
import { useDispatch, useSelector } from 'react-redux';
import * as turf from '@turf/turf';
import { addPoint, measureDistance } from './function';
import useEffectSkipInitialRender from './hook';
import './App.css';
import 'mapbox-gl/dist/mapbox-gl.css';

function App() {
	const [viewport, setViewport] = useState({
		width: '100wv',
		height: '100vh',
		latitude: 14.64216637055076,
		longitude: 121.00633629081217,
		zoom: 12,
	});

	const [lineCoordinates, setLineCoordinates] = useState('');

	const dispatch = useDispatch();
	const points = useSelector((state) => state.calcPoint);

	const totalDistance = useSelector((state) => state.calcDistance.distance);

	let featuresArray = [
		{
			type: 'Feature',
			geometry: {
				type: 'LineString',
				coordinates: lineCoordinates,
			},
		},
	];

	points.mapPoint.map((single) => featuresArray.push(single));

	let geojson = {
		type: 'FeatureCollection',
		features: featuresArray,
	};

	if (geojson.features[0].geometry.coordinates.length > 1) {
		dispatch(measureDistance(turf.length(geojson.features[0])));
	}

	useEffectSkipInitialRender(() => {
		setLineCoordinates(points.allPoints);
		return;
	}, [points]);

	const mapClick = (e) => {
		const selectedCoordinates = [e.lngLat[0], e.lngLat[1]];
		dispatch(addPoint(selectedCoordinates));
	};
	return (
		<div className="mapContainer">
			<ReactMapGL
				{...viewport}
				mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
				onClick={(e) => mapClick(e)}
				onViewportChange={(nextViewport) => {
					setViewport({
						...viewport,
						latitude: nextViewport.latitude,
						longitude: nextViewport.longitude,
						zoom: nextViewport.zoom,
					});
				}}
			>
				<Source id="point" type="geojson" data={geojson}>
					<Layer
						id="measure-points"
						type="circle"
						source="geojson"
						paint={{
							'circle-radius': 5,
							'circle-color': '#000',
						}}
						filter={['in', '$type', 'Point']}
					/>
					<Layer
						id="measure-lines"
						type="line"
						source="geojson"
						layout={{
							'line-cap': 'round',
							'line-join': 'round',
						}}
						paint={{
							'line-color': '#000',
							'line-width': 3.5,
						}}
						filter={['in', '$type', 'LineString']}
					/>
				</Source>
				{totalDistance > 0 && (
					<div className="distance-container">
						Total distance: {totalDistance.toFixed(2)} km
					</div>
				)}
			</ReactMapGL>
			<div className="fullScreenButton">
				<FullscreenControl container={document.querySelector('body')} />
			</div>
		</div>
	);
}

export default App;
