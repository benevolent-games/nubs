
import {Nub} from "../types.js"
import {Bindings} from "../bindings/types.js"
import {NubInputEvent} from "../events/input.js"
import {NubActionEvent} from "../events/action.js"
import {NubBindingsEvent} from "../events/bindings.js"

export const dispatchNubEvent = () => ({
	atTarget: (target: EventTarget) => ({

		input: () => ({
			name: (name: string) => {
				function prepareDispatcher<xData extends {}, xDetail extends Nub.Detail.Any>(type: Nub.Type) {
					return (data: xData) => ({
						fire() {
							const event = new NubInputEvent<xDetail>({
								...(<any>data),
								name,
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
						const event = new NubActionEvent<Nub.Detail.Key>({...(<any>detail), action})
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

		bindings: (bindings: Bindings) => ({
			fire() {
				const event = new NubBindingsEvent({bindings})
				target.dispatchEvent(event)
				return event
			},
		}),
	}),
})
