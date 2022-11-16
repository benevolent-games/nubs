
import {Nub} from "../types.js"
import {NubInput} from "../events/nub-input.js"
import {parseChannels} from "./parse-channels.js"
import {NubAction} from "../events/nub-action.js"

export const dispatchNubEvent = () => ({
	atTarget: (target: EventTarget) => ({

		input: () => ({
			parseChannels: (rawChannels: string) => {
				const channels = parseChannels(rawChannels)
				return {
					key: (data: Nub.Data.Key) => wrapFireCall(() => (
						target.dispatchEvent(
							new NubInput<Nub.Detail.Key>({
								...data,
								channels,
								type: Nub.Type.Key,
							})
						)
					)),
					vector2: (data: Nub.Data.Vector2) => wrapFireCall(() => (
						target.dispatchEvent(
							new NubInput<Nub.Detail.Vector2>({
								...data,
								channels,
								type: Nub.Type.Vector2,
							})
						)
					)),
				}
			},
		}),

		action: (action: string) => ({
			key: (detail: Nub.Detail.Key) => wrapFireCall(() =>
				target.dispatchEvent(
					new NubAction<Nub.Detail.Key>({...detail, action})
				)
			),
			vector2: (detail: Nub.Detail.Vector2) => wrapFireCall(() =>
				target.dispatchEvent(
					new NubAction<Nub.Detail.Vector2>({...detail, action})
				)
			),
		}),
	}),
})

function wrapFireCall(fun: () => void) {
	return {fire: fun}
}
