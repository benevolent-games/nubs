
import {LitElement} from "lit"
import {Nub} from "../../../types.js"
import {NubInputEvent} from "../../../events/input.js"

export function setupWindowKeyboardListening(
		element: LitElement & {name: string}
	) {

	const dispatch = ({code, repeat}: KeyboardEvent, pressed: boolean) => {
		if (!repeat)
			NubInputEvent
				.target(element)
				.dispatch({
					code,
					pressed,
					type: Nub.Type.Key,
					name: element.name,
				})
	}

	const pressed = true
	const unpressed = false

	const keydown = (event: KeyboardEvent) => dispatch(event, pressed)
	const keyup = (event: KeyboardEvent) => dispatch(event, unpressed)

	window.addEventListener("keydown", keydown)
	window.addEventListener("keyup", keyup)

	return () => {
		window.removeEventListener("keydown", keydown)
		window.removeEventListener("keyup", keyup)
	}
}
