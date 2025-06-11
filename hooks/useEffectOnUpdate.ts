import { useEffect, useRef } from "react";

export const useEffectOnUpdate = (cb: () => void, deps: any[], firstRenderCb?: () => void) => {
	const firstRender = useRef(true);
	useEffect(() => {
		if (firstRender.current) {
			firstRender.current = false;
			firstRenderCb?.();
		} else cb();
	}, deps);
};
