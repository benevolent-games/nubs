
import {property} from "lit/decorators.js"
import {MagicElement, mixinCss} from "@chasemoskal/magical"

import {styles} from "./style.css.js"
import {setupPointerListening} from "./utils/setup-pointer-listening.js"

@mixinCss(styles)
export class NubLookpad extends MagicElement {

	@property({type: String, reflect: true})
	cause: string = "Lookpad"

	#pointerListening = setupPointerListening({
		dispatchCauseEventsOn: this,
		listenForPointerEventsOn: this,
		getCause: () => this.cause,
	})

	realize() {
		const {use} = this
		use.setup(this.#pointerListening)
	}
}
