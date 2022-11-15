
import {Nub} from "../types.js"
import {NubInput} from "../events/nub-input.js"
import {V2} from "../tools/v2.js"

export function dispatchNubEvent(
		element: EventTarget,
		channels: string[],
	) {

	return {
		input: {

			key: (key: string, pressed: boolean) => (
				element.dispatchEvent(new NubInput({
					key,
					pressed,
					channels,
					type: Nub.Type.Key,
				}))
			),

			vector2: ({vector}: {vector: V2}) => (
				element.dispatchEvent(new NubInput({
					vector,
					channels,
					type: Nub.Type.Vector2,
				}))
			),
		},
		action: {

			key: (action: string) => {
				throw new Error("todo implement actions")
			},

			vector2: (action: SVGAnimatedString) => {
				throw new Error("todo implement actions")
			},
		},
	}
}
