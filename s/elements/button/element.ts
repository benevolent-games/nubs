import {html} from "lit"
import {MagicElement, mixinCss} from "@chasemoskal/magical"

import styles from "./style.css.js"

@mixinCss(styles)
export class NubButton extends MagicElement {
	realize() {
		return html`
			<button>
				<slot name="text"></slot>
				<slot name="icon"></slot>
			</button>
		`
	}
}
