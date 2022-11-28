
import {css} from "@chasemoskal/magical/x/camel-css/camel-css-lit.js"

export const styles = css`

:host {
	display: block;
	font-family: monospace;
	background: #111e;
	--outline-soft: #fff4;
	--outline-hard: #fff8;
	--pad-keygap: 0.4em;
	--pad-keyinner: 0.4em;
}

.keybindlist {
	margin: 1em;
	padding-right: 1em;
	overflow-x: hidden;
	overflow-y: scroll;

	.keybind {
		display: flex;
		width: 100%;

		> * {
			display: flex;
			flex-wrap: wrap;
		}

		.action {
			flex: 0 0 auto;
			width: 12em;
			padding: calc(var(--pad-keygap) + var(--pad-keyinner));
			padding-right: 1em;
			max-width: 100%;
			justify-content: flex-end;
			align-items: flex-start;
			color: orange;
		}

		.keys {
			flex: 1 1 auto;
			display: flex;
			flex-wrap: wrap;
			padding: calc(var(--pad-keygap) / 2) 0;
			gap: var(--pad-keygap);

			.keycap {
				flex: 1 1 auto;
				display: flex;
				justify-content: center;
				max-width: max-content;
				align-items: center;
				padding: var(--pad-keyinner);
				text-align: center;
				border: 1px solid var(--outline-soft);
				cursor: pointer;

				^:is(:hover, :focus) {
					border-color: var(--outline-hard);
				}

				^[data-add-new] {
					color: lime;
					border: 1px solid;
					cursor: pointer;
					margin-left: auto;

					^:is(:hover, :focus) {
						background-color: green;
					}
				}

				^[data-selected] {
					background: orange;
					box-shadow: inset 0px 0px 45px -23px rgba(0, 0, 0, 1);
				}
			}
		}
	}
}

.buttons {
	display: flex;
	justify-content: center;
	width: 100%;
	margin: 1em;
	gap: 1em;

	button {
		font: inherit;
		padding: 0.5em;
		background: #81818126;
		padding: 0.5em;
		color: white;
		border: 1px solid var(--outline-soft);
		border-radius: 0.5em;
		cursor: pointer;

		^:is(:hover, :focus) {
			background: rgb(183 183 183 / 15%);
			border-color: var(--outline-hard);
		}

		^[disabled] {
			color: rgb(129 129 129 / 11%);
			background: rgb(255 255 255 / 2%);
		}

		^:active:not([disabled]) {
			border: none;
		}
	}
}

::-webkit-scrollbar {
	width: 5px;
}

::-webkit-scrollbar-track {
	background: rgb(255 255 255 / 9%);
}

::-webkit-scrollbar-thumb {
	background: rgb(20 20 20);
}

::-webkit-scrollbar-thumb:hover {
	background: #5555558a;
}

`
