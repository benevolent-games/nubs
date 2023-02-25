
import {Nub} from "../../types.js"
import {ActionState} from "../types/action-state.js"
import {findActionsForInputName} from "./find-actions-for-input-name.js"

export function translateInputIntoActions({detail, state}: {
		detail: Nub.Detail.Any
		state: ActionState
	}) {

	const {kind, name} = detail
	const matchingActions = findActionsForInputName({
		kind,
		name,
		state,
	})

	const actionDetails: Nub.Detail.Action[] = []

	if (!state.actions.hasOwnProperty(kind))
		state.actions[kind] = {}

	for (const action of matchingActions) {
		state.actions[kind][action] = detail
		actionDetails.push({...detail, action})
	}

	return actionDetails
}
