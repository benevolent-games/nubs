
import {property} from "lit/decorators.js"
import {MagicElement, mixinCss} from "@chasemoskal/magical"

import {hiddenCss} from "../../framework/styles/hidden.css.js"
import {setup_keyboard_listening} from "./utils/setup_keyboard_listening.js"

@mixinCss(hiddenCss)
export class NubKeyboard extends MagicElement {

	@property({type: Boolean, reflect: true})
	["prevent-default"]: boolean = false

	#listening = setup_keyboard_listening({
		listenTo: window,
		dispatchTo: this,
		getPreventDefault: () => this["prevent-default"],
	})

	realize() {
		this.use.setup(this.#listening)
	}
}
