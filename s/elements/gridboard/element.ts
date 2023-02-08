
import {html} from "lit"
import {property} from "lit/decorators.js"
import {MagicElement, mixinCss} from "@chasemoskal/magical"

import {styles} from "./style.css.js"
import {Keylog} from "./starters/keylog.js"
import {GridButtonsView} from "./views/grid-buttons.js"
import {makeTriggerInputFunction} from "./starters/trigger-input.js"
import {listenForKeyEventsAndUpdateKeylog} from "./starters/listen-for-key-events-and-update-keylog.js"

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

		const [keylog, setKeylog, getKeylog] = (
			use.state<Keylog>({})
		)

		use.setup(
			listenForKeyEventsAndUpdateKeylog(
				window,
				getKeylog,
				setKeylog,
			)
		)

		return html`
			<div class=grid>
				${GridButtonsView({keylog, triggerInput})}
			</div>
		`
	}
}
