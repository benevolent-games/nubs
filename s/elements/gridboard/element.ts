
import {html} from "lit"
import {MagicElement, mixinCss} from "@chasemoskal/magical"

import {styles} from "./style.css.js"
import {property} from "lit/decorators.js"
import {GridButtonsView} from "./views/grid-buttons.js"
import {makeTriggerInputFunction} from "./starters/trigger-input.js"

@mixinCss(styles)
export class NubGridboard extends MagicElement {

	@property({type: String, reflect: true})
	name: string = "1"

	#starters = {
		triggerInput: makeTriggerInputFunction(this),
	}

	realize() {
		const {use} = this
		const {triggerInput} = this.#starters

		return html`
			<div class=grid>
				${GridButtonsView({triggerInput})}
			</div>
		`
	}
}
