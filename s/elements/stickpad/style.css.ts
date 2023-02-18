
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
		display: none;
	}

	nub-stick[data-visible]::part(base) {
		display: block;
		width: 50px;
		height: 50px;
		position: absolute;
	}
`
