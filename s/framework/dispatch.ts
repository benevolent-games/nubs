
import {Nub} from "../types.js"
import {V2} from "../tools/v2.js"
import {NubInput} from "../events/nub-input.js"
import {parseChannels as parseChannels2} from "./parse-channels.js"

export const dispatchNubEvent = (target: EventTarget) => ({
	parseChannels(rawChannels: string) {
		const channels = parseChannels2(rawChannels)
		return {
			input: {
				key: ({code, pressed}: Nub.Data.Key) => (
					target.dispatchEvent(new NubInput({
						code,
						pressed,
						channels,
						type: Nub.Type.Key,
					}))
				),
				vector2: ({vector}: {vector: V2}) => (
					target.dispatchEvent(new NubInput({
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
				vector2: (action: string) => {
					throw new Error("todo implement actions")
				},
			},
		}
	},
})
