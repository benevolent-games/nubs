
import {css} from "@chasemoskal/magical"

export const styles = css`

:host {
	display: block;
	font-family: monospace;
	background: #111e;
	color: #fffc;
	--outline-soft: #fff4;
	--outline-hard: #fff8;
	--pad-keygap: 0.4em;
	--pad-keyinner: 0.2em;
}

.metabar {
	padding: 0.1em 0.5em;
	button {
		background: transparent;
		border: none;
		color: inherit;
		opacity: 0.7;
		cursor: pointer;
		^:is(:hover) { opacity: 1; }
	}
}

.modetabs {
	button {
		^[data-is-current] {
			font-weight: bold;
		}
	}
}

[data-panel="text-editor"] {
	padding: 1em;

	textarea {
		max-width: 100%;
		width: 100%;
		min-height: 24em;
		background: #0007;
		color: #fffa;
		border: 0;
		padding: 1em;
	}
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
				font: inherit;
				border: none;
				color: inherit;
				border-radius: 0.3em;
				background: transparent;
				display: flex;
				justify-content: center;
				max-width: max-content;
				align-items: center;
				padding: var(--pad-keyinner) 0.5em;
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

				^[data-waiting] {
					background: orange;
					color: white;
					font-weight: bold;
					text-shadow: 1px 2px 4px #000a;
				}
			}
		}
	}
}

.problem {
	color: orange;
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

		^[disabled] {
			opacity: 0.2;
		}

		^:is(:hover, :focus):not([disabled]) {
			background: rgb(183 183 183 / 15%);
			border-color: var(--outline-hard);
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
