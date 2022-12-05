
import {Constructor} from "@chasemoskal/magical/x/types.js"

export class Xevent<D> extends CustomEvent<D> {
	constructor(name: string, detail: D) {
		super(name, {
			detail,
			bubbles: true,
			composed: true,
			cancelable: true,
		})
	}
}

export function xevent<
		E extends Constructor<Xevent<any>> & {eventName: string}
	>(Event: E) {
	type D = E extends Constructor<Xevent<infer D>> ? D : never
	type EI = InstanceType<E>
	return {
		target: (target: EventTarget) => ({

			dispatch: <X extends D = D>(detail: X) =>
				target.dispatchEvent(new Event(detail)),

			listen<X extends EI = EI>(listener: (event: X) => void) {
				target.addEventListener(Event.eventName, <any>listener)
				return () => target.removeEventListener(Event.eventName, <any>listener)
			},
		}),
	} 
}
