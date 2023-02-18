import {html, TemplateResult} from "lit"
import {MagicElement, mixinCss, UseElement} from "@chasemoskal/magical"

import styles from "./style.css.js"
import {attachEvents} from "../../tools/attach-events.js"

@mixinCss(styles)
export class NubStickpad extends MagicElement {
	realize(use: UseElement<this>): void | TemplateResult<1 | 2> {
		const [stick, setStick] = use.state(false)
		const [position, setPosition] = use.state("")

		use.setup(() => {
			attachEvents(window, {
				pointerup() {setStick(false)}
			})
		})

		return html`
			<div
				class="area"
				@pointerdown=${(e: PointerEvent) => {
					const {pageX, pageY} = <PointerEvent>e
					setStick(true)
					const nubStick = this.shadowRoot?.querySelector("nub-stick")
					const {clientWidth, clientHeight} = nubStick?.shadowRoot?.querySelector("[part='base']")!
					setPosition(`left: ${pageX - clientWidth / 2}px; top: ${pageY - clientHeight / 2}px;`)
				}}
			>
				<nub-stick transform=${position} ?data-visible=${stick}></nub-stick>
			</div>
		`
	}
}
