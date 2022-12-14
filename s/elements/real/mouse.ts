
import {property} from "lit/decorators.js"
import {MagicElement, mixinCss} from "@chasemoskal/magical"

import hiddenCss from "./utils/hidden.css.js"
import {setupWindowMouseMoveListening} from "./utils/setup-window-mouse-move-listening.js"
import {setupWindowMouseButtonListening} from "./utils/setup-window-mouse-button-listening.ts.js"

@mixinCss(hiddenCss)
export class NubRealMouse extends MagicElement {

	@property({type: String, reflect: true})
	name: string = "1"

	realize() {
		const {use} = this
		use.setup(setupWindowMouseMoveListening)
		use.setup(setupWindowMouseButtonListening)
	}
}
