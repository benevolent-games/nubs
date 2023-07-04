
import {NubCauseEvent} from "../../../events/cause.js"
import {EventTargeting} from "../../../framework/types/event-targeting.js"

export function setup_keyboard_listening({
		listenTo,
		dispatchTo,
		getPreventDefault,
	}: EventTargeting & {
		getPreventDefault: () => boolean
	}) {

	function dispatch_cause(pressed: boolean) {
		return (event: KeyboardEvent) => {

			const modifier_key = event.shiftKey
				? "Shift "
				: event.altKey
					? "Alt "
					: event.ctrlKey
						? "Ctrl "
						: ""

			const is_a_modifier = event.code.startsWith("Shift")
				|| event.code.startsWith("Alt")
				|| event.code.startsWith("Control")

			if (getPreventDefault())
				event.preventDefault()

			if (event.repeat)
				return

			NubCauseEvent
				.target(dispatchTo)
				.dispatch({
					pressed,
					kind: "key",
					is_a_modifier,
					cause: `${modifier_key}${event.code}`,
				})
		}
	}

	const pressed = true
	const unpressed = false

	const keydown = dispatch_cause(pressed) as EventListener
	const keyup = dispatch_cause(unpressed) as EventListener

	listenTo.addEventListener("keydown", keydown)
	listenTo.addEventListener("keyup", keyup)

	return () => {
		return () => {
			listenTo.removeEventListener("keydown", keydown)
			listenTo.removeEventListener("keyup", keyup)
		}
	}
}
