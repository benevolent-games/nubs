
import {NubModesEvent} from "../events/modes.js"
import {NubActionEvent} from "../events/action.js"
import {ActionState} from "./types/action-state.js"
import {setupActionController} from "./controller.js"
import {NubBindingsEvent} from "../events/bindings.js"
import {interpretInputEventsAsActions} from "./parts/interpret-input-events-as-actions.js"

export function setupActionDomWiring(dispatchEventsOn: EventTarget) {

	const state: ActionState = {
		actions: {},
		bindings: {},
		modes: new Set<string>(),
	}

	const controller = setupActionController({
		state,
		onModesChange: modes => {
			NubModesEvent
				.target(dispatchEventsOn)
				.dispatch({modes})
		},
		onBindingsChange: bindings => {
			NubBindingsEvent
				.target(dispatchEventsOn)
				.dispatch({bindings})
		},
	})

	return {
		controller,

		handleInputEventAndEmitActions: interpretInputEventsAsActions({
			state,
			onAction: detail => {
				NubActionEvent
					.target(dispatchEventsOn)
					.dispatch(detail)
			},
		}),
	}
}
