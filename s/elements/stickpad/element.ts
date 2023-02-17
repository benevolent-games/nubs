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
			<div class="area"
			@pointerdown=${(e: PointerEvent) => {
				const {pageX, pageY} = <PointerEvent>e
				setStick(true)
				setPosition(`left: ${pageX - 25}px; top: ${pageY - 25}px;`)
			}}>
			${stick
				? html`
					<div class="stick" style="${position}">
						<nub-stick></nub-stick>
					</div>`
				: null}
			</div>
		`
	}
}
