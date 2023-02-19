import {html, TemplateResult} from "lit"
import {MagicElement, mixinCss, UseElement} from "@chasemoskal/magical"

import styles from "./style.css.js"
import {attachEvents} from "../../tools/attach-events.js"

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

		use.setup(() => {
			attachEvents(window, {
				pointerup() {setStick(false)}
			})
		})

		return html`
			<nub-stick
				@pointerdown=${(e: PointerEvent) => setCenterPosition(e)}
				transform=${position} 
				?data-visible=${stick}>
			</nub-stick>
		`
	}
}
