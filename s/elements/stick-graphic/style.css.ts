
import {css} from "@chasemoskal/magical"
export const styles = css`

:host {
	display: block;
	width: 10em;
	height: 10em;
}

[part="base"] {
	position: relative;
	aspect-ratio: 1/1;
	width: 100%;
	height: 100%;
	background: var(--thumb-stick-background, #000);
	border-radius: 100%;
}

[part="stick"], [part="understick"] {
	position: absolute;
	inset: 0;
	width: var(--thumb-stick-size, 66%);
	height: var(--thumb-stick-size, 66%);
	border-radius: 100%;
	background: var(--thumb-stick-color, #fff);
	margin: auto;
	pointer-events: none;
}

[part="understick"] {
	opacity: 0.5;
}

`
