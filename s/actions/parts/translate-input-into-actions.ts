
import {Nub} from "../../types.js"
import {ActionContext} from "../action-context.js"
import {findActionsForInputName} from "./find-actions-for-input-name.js"

export function translateInputIntoActions({detail, context}: {
		detail: Nub.Detail.Any
		context: ActionContext
	}) {

	const {kind, name} = detail
	const matchingActions = findActionsForInputName({
		kind,
		name,
		context,
	})

	const actionDetails: Nub.Detail.Action[] = []

	if (!context.actions.hasOwnProperty(kind))
		context.actions[kind] = {}

	for (const action of matchingActions) {
		context.actions[kind][action] = detail
		actionDetails.push({...detail, action})
	}

	return actionDetails
}
