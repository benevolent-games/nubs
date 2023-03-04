
import {css} from "@chasemoskal/magical"
export const themeCss = css`

* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}

button {
	display: inline-block;
	padding: 0.3em;
	background: transparent;
	font: inherit;
	color: inherit;

	cursor: pointer;
	border: 1px solid;
	border-radius: 0.2em;

	opacity: 0.7;
	^:hover { opacity: 0.9; }
	^:active { opacity: 1; }
}

`
