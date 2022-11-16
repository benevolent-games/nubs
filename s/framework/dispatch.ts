
import {Nub} from "../types.js"
import {V2} from "../tools/v2.js"
import {NubInput} from "../events/nub-input.js"
import {parseChannels} from "./parse-channels.js"
import {NubAction} from "../events/nub-action.js"

function wrapFireCall(fun: () => void) {
	return {fire: fun}
}

export const dispatchNubEvent = () => ({
	atTarget: (target: EventTarget) => ({

		input: () => ({
			parseChannels: (rawChannels: string) => {
				const channels = parseChannels(rawChannels)
				return {
					key: ({code, pressed}: Nub.Data.Key) => wrapFireCall(() => (
						target.dispatchEvent(
							new NubInput({
								code,
								pressed,
								channels,
								type: Nub.Type.Key,
							})
						)
					)),
					vector2: ({vector}: {vector: V2}) => wrapFireCall(() => (
						target.dispatchEvent(
							new NubInput({
								vector,
								channels,
								type: Nub.Type.Vector2,
							})
						)
					)),
				}
			},
		}),

		action: () => ({
			key: (action: string, detail: Nub.Detail.Key) => wrapFireCall(() =>
				target.dispatchEvent(
					new NubAction<Nub.Detail.Key>({...detail, action})
				)
			),
			vector2: (action: string, detail: Nub.Detail.Vector2) => wrapFireCall(() =>
				target.dispatchEvent(
					new NubAction<Nub.Detail.Vector2>({...detail, action})
				)
			),
		}),
	}),
})
