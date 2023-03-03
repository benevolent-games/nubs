
import {html} from "lit"
import {property} from "lit/decorators.js"
import {MagicElement, mixinCss} from "@chasemoskal/magical"

import {styles} from "./style.css.js"
import {Keylog} from "./starters/keylog.js"
import {LayoutName} from "./layouts/layout-name.js"
import {GridButtonsView} from "./views/grid-buttons.js"
import {makeCauseDispatcher} from "./starters/make-cause-dispatcher.js"
import {selectStandardLayout} from "./layouts/select-standard-layout.js"
import {listenForKeyEventsAndUpdateKeylog} from "./starters/listen-for-key-events-and-update-keylog.js"

@mixinCss(styles)
export class NubGridboard extends MagicElement {

	@property({type: String, reflect: true})
	layout: LayoutName = "compact"

	#dispatchCause = makeCauseDispatcher(this)

	realize() {
		const {use} = this
		const dispatchCause = this.#dispatchCause
		const layout = selectStandardLayout(this.layout)

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
				${GridButtonsView({layout, keylog, dispatchCause})}
			</div>
		`
	}
}
