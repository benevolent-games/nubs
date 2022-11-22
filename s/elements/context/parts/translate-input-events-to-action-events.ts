
import {LitElement} from "lit"

import {NubInput} from "../../../main.js"
import {Actions, Bindings, Nub} from "../../../types.js"
import {dispatchNubEvent} from "../../../framework/dispatch.js"
import {findActionsForKeyEvent} from "./find-actions-for-key-event.js"
import {findActionsForMouseEvent} from "./find-actions-for-mouse-event.js"
import {findActionsForVector2Event} from "./find-actions-for-vector2-event.js"

export function translateInputEventsToActionEvents({
		actions,
		bindings,
		element,
	}: {
		actions: Actions
		bindings: Bindings
		element: LitElement
	}) {

	return function handleInput(input: NubInput) {
		switch (input.detail.type) {

			case Nub.Type.Key: {
				for (const action of findActionsForKeyEvent(
						input.detail.code,
						input.detail.channels,
						bindings,
					)) {
					actions.key[action] = input.detail
					dispatchNubEvent()
						.atTarget(element)
						.action(action)
						.key(input.detail)
						.fire()
				}
			} break

			case Nub.Type.Mouse: {
				for (const action of findActionsForMouseEvent(
						input.detail.channels,
						bindings,
					)) {
					actions.mouse[action] = input.detail
					dispatchNubEvent()
						.atTarget(element)
						.action(action)
						.mouse(input.detail)
						.fire()
				}
			} break

			case Nub.Type.Vector2: {
				for (const action of findActionsForVector2Event(
						input.detail.channels,
						bindings,
					)) {
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
