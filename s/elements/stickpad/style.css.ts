
import {css} from "@chasemoskal/magical"

export default css`
	:host {
		display: flex;
		width: 30em;
		height: 15em;
		border: 1px solid;
	}

	nub-stick-graphic {
		position: absolute;
		width: 8em;
	}
	
	nub-stick-graphic::part(base) {
		visibility: visible;
	}

	nub-stick-graphic[data-visible]::part(base) {
		visibility: visible;
	}
`
