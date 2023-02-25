
import {Nub} from "../../types.js"
import {NubInputEvent} from "../../events/input.js"
import {ActionState} from "../types/action-state.js"
import {translateInputIntoActions} from "./translate-input-into-actions.js"

export function interpretInputEventsAsActions({state, onAction}: {
		state: ActionState
		onAction: (detail: Nub.Detail.Action) => void
	}) {

	return ({detail}: NubInputEvent) =>
		translateInputIntoActions({detail, state})
			.forEach(onAction)
}
