
import {css} from "@chasemoskal/magical"

export default css`
.base {
	position: relative;
	aspect-ratio: 1/1;
	max-width: 100%;
	max-height: 100%;
	background: var(--thumb-stick-background, #000);
	border-radius: 100%;
	cursor: grab;
}

.stick, .understick {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	width: var(--thumb-stick-size, 66%);
	height: var(--thumb-stick-size, 66%);
	border-radius: 999em;
	background: var(--thumb-stick-color, #fff);
	margin: auto;
	pointer-events: none;
}

.understick {
	opacity: 0.5;
}
`
