
import {css} from "@chasemoskal/magical"
import {NubStickGraphic} from "../stick-graphic/element.js"
export const styles = css`

:host {
	display: block;
	width: 8em;
	height: 8em;
	touch-action: none;
}

[part="graphic"] {
	width: 100%;
	height: 100%;
}

`
