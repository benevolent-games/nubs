
import {property} from "lit/decorators.js"
import {MagicElement, mixinCss} from "@chasemoskal/magical"

import hiddenCss from "../../framework/styles/hidden.css.js"
import {setupPointerMoveListening} from "./utils/setup-pointer-move-listening.js"
import {setupPointerButtonListening} from "./utils/setup-pointer-button-listening.js"

@mixinCss(hiddenCss)
export class NubPointer extends MagicElement {

	@property({type: String, reflect: true})
	cause: string = "pointer"

	#listenPointerMove = setupPointerMoveListening({
		listenTo: window,
		dispatchTo: this,
		getCause: () => this.cause,
	})

	#listenPointerButton = setupPointerButtonListening({
		listenTo: window,
		dispatchTo: this,
	})

	realize() {
		const {use} = this
		use.setup(this.#listenPointerMove)
		use.setup(this.#listenPointerButton)
	}
}
