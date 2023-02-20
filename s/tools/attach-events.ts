import {LitListener} from "./lit-listener.js"

export function attachEvents(
		target: EventTarget,
		spec: {[key: string]: ((event: Event) => void) | LitListener<Event>}
	) {

	const disposers = new Set<() => void>()

	for (const [eventName, listener] of Object.entries(spec)) {
		target.addEventListener(eventName, listener)
		disposers.add(
			() => target.removeEventListener(eventName, listener)
		)
	}

	return () => {
		for (const dispose of disposers)
			dispose()
	}
}
