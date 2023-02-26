
import {MagicElement, mixinCss} from "@chasemoskal/magical"

import hiddenCss from "../../framework/styles/hidden.css.js"
import {setupKeyboardListening} from "./utils/setup-keyboard-listening.js"

@mixinCss(hiddenCss)
export class NubKeyboard extends MagicElement {

	#listening = setupKeyboardListening({
		listenTo: window,
		dispatchTo: this,
	})

	realize() {
		this.use.setup(this.#listening)
	}
}
