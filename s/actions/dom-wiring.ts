
import {Bindings} from "./types/bindings.js"
import {NubInputEvent} from "../events/input.js"
import {NubActionEvent} from "../events/action.js"
import {ActionState} from "./types/action-state.js"
import {setupActionController} from "./controller.js"
import {NubBindingsEvent} from "../events/bindings.js"
import {ActionDomWiring} from "./types/action-dom-wiring.js"
import {interpretInputEventsAsActions} from "./parts/interpret-input-events-as-actions.js"

export function setupActionDomWiring({
		initialModes,
		defaultBindings,
		eventDispatchingTarget,
		inputEventListeningTarget,
	}: {
		defaultBindings: Bindings
		initialModes: string[]
		inputEventListeningTarget: EventTarget
		eventDispatchingTarget: EventTarget
	}): ActionDomWiring {

	const state: ActionState = {
		actions: {},
		bindings: defaultBindings,
		modes: new Set<string>(initialModes),
	}

	const controller = setupActionController({
		state,
		onModesChange: modes => {
			// TODO
		},
		onBindingsChange: bindings => {
			NubBindingsEvent
				.target(eventDispatchingTarget)
				.dispatch({bindings})
		},
	})

	function startListening() {
		return NubInputEvent
			.target(inputEventListeningTarget)
			.listen(interpretInputEventsAsActions({
				state,
				onAction: detail => {
					NubActionEvent
						.target(eventDispatchingTarget)
						.dispatch(detail)
				},
			}))
	}

	return {
		controller,
		startListening,
	}
}
