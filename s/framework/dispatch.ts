
import {Nub} from "../types.js"
import {NubInput} from "../events/nub-input.js"
import {parseChannels} from "./parse-channels.js"
import {NubAction} from "../events/nub-action.js"

export const dispatchNubEvent = () => ({
	atTarget: (target: EventTarget) => ({

		input: () => ({
			parseChannels: (rawChannels: string) => {
				const channels = parseChannels(rawChannels)
				function prepareDispatcher<xData extends {}, xDetail extends Nub.Detail.Any>(type: Nub.Type) {
					return (data: xData) => ({
						fire() {
							const event = new NubInput<xDetail>({
								...(<any>data),
								channels,
								type,
							})
							target.dispatchEvent(event)
							return event
						},
					})
				}
				return {
					key: prepareDispatcher<Nub.Data.Key, Nub.Detail.Key>(Nub.Type.Key),
					mouse: prepareDispatcher<Nub.Data.Mouse, Nub.Detail.Mouse>(Nub.Type.Mouse),
					vector2: prepareDispatcher<Nub.Data.Vector2, Nub.Detail.Vector2>(Nub.Type.Vector2),
				}
			},
		}),

		action: (action: string) => {
			function prepareDispatcher<xDetail extends Nub.Detail.Any>() {
				return (detail: xDetail) => ({
					fire() {
						const event = new NubAction<Nub.Detail.Key>({...(<any>detail), action})
						target.dispatchEvent(event)
						return event
					}
				})
			}
			return {
				key: prepareDispatcher<Nub.Detail.Key>(),
				mouse: prepareDispatcher<Nub.Detail.Mouse>(),
				vector2: prepareDispatcher<Nub.Detail.Vector2>(),
			}
		},
	}),
})
