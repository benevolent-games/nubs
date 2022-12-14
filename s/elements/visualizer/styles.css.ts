
import {css} from "@chasemoskal/magical"
export default css`

:host {
	display: block;
	font-family: monospace;
	user-select: none;
}

.coordinatesbar {
	padding: 0.5em;
	p {
		strong, span {
			white-space: pre-wrap;
		}
		span {
			opacity: 0.6;
			font-size: 0.8em;
		}
	}
}

.keystats {
	display: flex;
	list-style: none;
	gap: 0.2em;
	flex-wrap: wrap;
	justify-content: center;
	align-items: flex-start;
	min-height: 10em;
	background: #0004;
	padding: 1em;
	border-top: 2px solid #fff4;

	li {
		display: flex;
		flex-direction: column;
		align-items: center;
		background: #fff1;
		border: 2px solid;
		padding: 0.5em;
		border-radius: 0.2em;
		span {
			opacity: 0.8;
			font-size: 0.8em;
		}
	}
}

`
