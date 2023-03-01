
import {property} from "lit/decorators.js"
import {MagicElement, mixinCss} from "@chasemoskal/magical"

import {hiddenCss} from "../../framework/styles/hidden.css.js"
import {setup_pointer_move_listening} from "./utils/setup_pointer_move_listening.js"
import {setup_pointer_button_listening} from "./utils/setup_pointer_button_listening.js"

@mixinCss(hiddenCss)
export class NubPointer extends MagicElement {

	@property({type: String, reflect: true})
	cause: string = "pointer"

	#listenPointerMove = setup_pointer_move_listening({
		listenTo: window,
		dispatchTo: this,
		getCause: () => this.cause,
	})

	#listenPointerButton = setup_pointer_button_listening({
		listenTo: window,
		dispatchTo: this,
	})

	realize() {
		const {use} = this
		use.setup(this.#listenPointerMove)
		use.setup(this.#listenPointerButton)
	}
}
