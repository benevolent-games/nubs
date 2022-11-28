
type Listener<E extends Event = Event> = (event: E) => void

export function setupEventListener<E extends Event>(
		target: EventTarget,
		event: {eventName: string},
		listener: Listener<E>,
	) {

	return setupEventListeners({
		targets: [target],
		events: [event],
		listeners: [<any>listener],
	})
}

export function setupEventListeners({
		targets, events, listeners, options
	}: {
		targets: EventTarget[]
		events: {eventName: string}[]
		listeners: Listener[]
		options?: AddEventListenerOptions
	}) {

	const memory: [
		EventTarget,
		string,
		Listener,
	][] = []

	// memorize each listener attachment
	for (const target of targets)
		for (const {eventName} of events)
			for (const listener of listeners)
				memory.push([target, eventName, listener])

	// add all event listeners
	for (const [target, eventName, listener] of memory)
		target.addEventListener(eventName, listener, options)

	return () => {

		// remove all event listeners
		for (const [target, eventName, listener] of memory)
			target.removeEventListener(eventName, listener)
	}
}