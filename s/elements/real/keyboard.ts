
import {property} from "lit/decorators.js"
import {MagicElement, mixinCss} from "@chasemoskal/magical"

import hiddenCss from "./utils/hidden.css.js"
import {setupWindowKeyboardListening} from "./utils/setup-window-keyboard-listening.js"

@mixinCss(hiddenCss)
export class NubRealKeyboard extends MagicElement {

	@property({type: String, reflect: true})
	name: string = "1"

	realize() {
		const {use} = this
		use.setup(setupWindowKeyboardListening)
	}
}
