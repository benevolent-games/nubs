
import {html, LitElement} from "lit"
import {mixinCss} from "@chasemoskal/magical"
import {property, query} from "lit/decorators.js"

import {styles} from "./style.css.js"
import {NubCauseEvent} from "../../events/cause.js"
import {setup_lookpad_pointer_listeners} from "./utils/setup_lookpad_pointer_listeners.js"

@mixinCss(styles)
export class NubLookpad extends LitElement {

	@property({type: String, reflect: true})
	cause: string = "Lookpad"

	@query(".pad")
	private pad: HTMLElement | undefined

	#pointer_listeners = setup_lookpad_pointer_listeners({
		get_pointer_capture_element: () => this.pad!,
		on_pointer_drag: ({clientX, clientY, movementX, movementY}) => {
			NubCauseEvent
				.target(this)
				.dispatch({
					kind: "pointer",
					cause: this.cause,
					position: [clientX, clientY],
					movement: [movementX, movementY],
				})
		},
	})

	render() {
		const listeners = this.#pointer_listeners

		return html`
			<div
				class=pad
				@pointerdown=${listeners.pointerdown}
				@pointermove=${listeners.pointermove}
				@pointerup=${listeners.pointerup}
			></div>
		`
	}
}
