
import {Nub} from "../types.js"
import {NubInputEvent} from "../events/input.js"
import {ActionContext} from "./action-context.js"
import {translateInputIntoActions} from "./parts/translate-input-into-actions.js"

export function interpretInputEventsAsActions({context, onAction}: {
		context: ActionContext
		onAction: (detail: Nub.Detail.Action) => void
	}) {

	return ({detail}: NubInputEvent) =>
		translateInputIntoActions({detail, context})
			.forEach(onAction)
}
