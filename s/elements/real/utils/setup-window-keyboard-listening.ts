
import {LitElement} from "lit"
import {dispatchNubEvent} from "../../../framework/dispatch.js"

export function setupWindowKeyboardListening(
		element: LitElement & {channels: string}
	) {

	const dispatch = ({code, repeat}: KeyboardEvent, pressed: boolean) => {
		if (!repeat)
			dispatchNubEvent()
				.atTarget(element)
				.input()
				.parseChannels(element.channels)
				.key({code, pressed})
				.fire()
	}

	const keydown = (event: KeyboardEvent) => dispatch(event, true)
	const keyup = (event: KeyboardEvent) => dispatch(event, false)

	window.addEventListener("keydown", keydown)
	window.addEventListener("keyup", keyup)

	return () => {
		window.removeEventListener("keydown", keydown)
		window.removeEventListener("keyup", keyup)
	}
}
