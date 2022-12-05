
import {LitElement} from "lit"

import {Actions, Nub} from "../../../types.js"
import {Bindings} from "../../../bindings/types.js"
import {NubInputEvent} from "../../../events/input.js"
import {NubActionEvent} from "../../../events/action.js"
import {queryBindingsToRelateInputsToActions} from "./query-bindings-to-relate-inputs-to-actions.js"

export function translateInputEventsToActionEvents({
		actions,
		bindings,
		element,
	}: {
		actions: Actions
		bindings: Bindings
		element: LitElement
	}) {

	const findActions = queryBindingsToRelateInputsToActions(bindings)

	return function handleInput(input: NubInputEvent) {
		switch (input.detail.type) {

			case Nub.Type.Key: {
				for (const action of findActions.key(input.detail.code)) {
					actions.key[action] = input.detail
					NubActionEvent
						.target(element)
						.dispatch({
							...input.detail,
							action,
							type: Nub.Type.Key,
						})
				}
			} break

			case Nub.Type.Mouse: {
				for (const action of findActions.mouse(input.detail.name)) {
					actions.mouse[action] = input.detail
					NubActionEvent
						.target(element)
						.dispatch({
							...input.detail,
							action,
							type: Nub.Type.Mouse,
						})
				}
			} break

			case Nub.Type.Vector2: {
				for (const action of findActions.vector2(input.detail.name)) {
					actions.vector2[action] = input.detail
					NubActionEvent
						.target(element)
						.dispatch({
							...input.detail,
							action,
							type: Nub.Type.Vector2,
						})
				}
			} break
		}
	}
}
