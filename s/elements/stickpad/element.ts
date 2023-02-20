import {html, TemplateResult} from "lit"
import {MagicElement, mixinCss, UseElement} from "@chasemoskal/magical"

import styles from "./style.css.js"
import {StickpadStarters} from "./types.js"
import {setupStickpadEvents} from "./setups/setup-stickpad-events.js"

@mixinCss(styles)
export class NubStickpad extends MagicElement {

	get nubStickBasePart() {
		return this.shadowRoot?.querySelector("nub-stick")!
			.shadowRoot?.querySelector("[part='base']")!
	}

	realize(use: UseElement<this>): void | TemplateResult<1 | 2> {
		const [stick, setStick] = use.state(false)
		const [position, setPosition] = use.state("")

		const setCenterPosition = (e : PointerEvent) => {
			setStick(true)
			const {clientWidth, clientHeight} = this.nubStickBasePart
			setPosition(`left: ${e.pageX - clientWidth / 2}px; top: ${e.pageY - clientHeight / 2}px;`)
		}

		const starters: StickpadStarters = {
			setStick,
			stickPad: this,
			setCenterPosition
		}

		use.setup(setupStickpadEvents({...starters}))

		return html`
			<nub-stick
				transform=${position}
				?data-visible=${stick}>
			</nub-stick>
		`
	}
}
