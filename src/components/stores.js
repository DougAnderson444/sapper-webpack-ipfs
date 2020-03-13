import { writable, derived, readable } from 'svelte/store';

export const dataStore = writable({});
export const ifpsNode= writable(0);
export const nodeId= writable(0);
export const nodeAgentVersion= writable(0);
export const nodeProtocolVersion = writable(0);
export const keys = writable(0);  // public and private key object


// start function is called when the store gets its first subscriber; 
export const time = readable(new Date(), function start(set) {
	const interval = setInterval(() => {
		set(new Date());
	}, 1000);

    //stop is called when the last subscriber unsubscribes
	return function stop() {
		clearInterval(interval);
	};
});

// ### elaspe timer
// this can be reset with: $start = new Date();
export const start = writable(new Date());

export const elapsed = derived(
	[time, start],
	([$time, $start]) => Math.max(Math.round(($time - $start) / 1000),0)
);