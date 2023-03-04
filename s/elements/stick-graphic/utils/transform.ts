
import {noop as css} from "../../../tools/template-noop.js"

export const transform = (x: number, y: number) => css`
	transform: translate(
		${x}px,
		${y}px
	);
`
