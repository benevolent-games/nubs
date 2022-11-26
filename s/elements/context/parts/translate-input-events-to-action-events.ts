
import {LitElement} from "lit"

import {NubInput} from "../../../main.js"
import {Actions, Bindings, Nub} from "../../../types.js"
import {dispatchNubEvent} from "../../../framework/dispatch.js"
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

	return function handleInput(input: NubInput) {
		switch (input.detail.type) {

			case Nub.Type.Key: {
				for (const action of findActions.key(input.detail.code)) {
					actions.key[action] = input.detail
					dispatchNubEvent()
						.atTarget(element)
						.action(action)
						.key(input.detail)
						.fire()
				}
			} break

			case Nub.Type.Mouse: {
				for (const action of findActions.mouse(input.detail.name)) {
					actions.mouse[action] = input.detail
					dispatchNubEvent()
						.atTarget(element)
						.action(action)
						.mouse(input.detail)
						.fire()
				}
			} break

			case Nub.Type.Vector2: {
				for (const action of findActions.vector2(input.detail.name)) {
					actions.vector2[action] = input.detail
					dispatchNubEvent()
						.atTarget(element)
						.action(action)
						.vector2(input.detail)
						.fire()
				}
			} break
		}
	}
}
