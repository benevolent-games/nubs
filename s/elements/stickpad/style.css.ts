
import {css} from "@chasemoskal/magical"

export default css`
	:host {
		display: flex;
		width: 30em;
		height: 15em;
	}

	.area {
		height: 100%;
		width: 100%;
	}

	nub-stick {
		width: 100%;
		height: 100%;
	}

	nub-stick::part(base) {
		visibility: hidden;
		width: 50px;
		height: 50px;
	}

	nub-stick[data-visible]::part(base) {
		visibility: visible;
		position: absolute;
	}
`
