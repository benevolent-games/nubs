
import {css} from "@chasemoskal/magical"

export default css`
	:host {
		position: relative;
		display: flex;
		width: 30em;
		height: 15em;
		border: 1px solid;
		touch-action: none;
	}

	nub-stick-graphic {
		position: absolute;
		width: 8em;
		height: 8em;
	}
`
