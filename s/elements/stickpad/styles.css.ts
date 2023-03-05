
import {css} from "@chasemoskal/magical"
export const styles = css`

:host {
	display: block;
	width: 24em;
	height: 12em;
	border: 1px solid;
}

[part="area"] {
	position: relative;
	width: 100%;
	height: 100%;
}

[part="graphic"] {
	position: absolute;
	width: 8em;
	height: 8em;
}

`
