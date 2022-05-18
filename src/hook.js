import { useEffect, useRef } from 'react';

const useEffectSkipInitialRender = (callback, dataArr) => {
	const isInitialRender = useRef(true);

	useEffect(() => {
		if (isInitialRender.current) {
			isInitialRender.current = false;
			return;
		}
		return callback();
	}, dataArr);
};

export default useEffectSkipInitialRender;
