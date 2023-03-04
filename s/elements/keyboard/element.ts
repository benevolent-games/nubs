
import {MagicElement, mixinCss} from "@chasemoskal/magical"

import {hiddenCss} from "../../framework/styles/hidden.css.js"
import {setup_keyboard_listening} from "./utils/setup_keyboard_listening.js"

@mixinCss(hiddenCss)
export class NubKeyboard extends MagicElement {

	#listening = setup_keyboard_listening({
		listenTo: window,
		dispatchTo: this,
	})

	realize() {
		this.use.setup(this.#listening)
	}
}
