
import {css} from "@chasemoskal/magical"
export const styles = css`

:host {
	display: block;
	color: #b0d3ff;
	--highlight-color: #fffa;
	--highlight-text-shadow: 0.1em 0.1em 0.05em black;
}

.grid {
	margin: auto;
	display: flex;
	flex-direction: column;
	width: max-content;
	gap: 0.2em;
	padding: 0.5em;
	border-radius: 0.5em;
	background: #0004;

	> .row {
		display: flex;
		flex-direction: row;
		width: max-content;
		gap: 0.2em;

		button {
			border-radius: 0.3em;
		}
	}
}

.key {
	border: none;
	display: block;
	font-family: sans-serif;

	font-size: 1em;
	width: 3em;
	height: 3em;
	padding: 0.5em;
	
	background: #444a;
	color: inherit;

	border-top: 0.1em solid #fff2;
	border-bottom: 0.1em solid #0002;
}

.key {
	position: relative;

	span {
		display: block;
		position: absolute;
	}

	.icon {
		inset: 0.1em;
		bottom: 0.5em;
		svg {
			display: block;
			width: 100%;
			height: 100%;
		}
	}

	:is(.keycap, .label) {
		color: var(--highlight-color);
		text-shadow: var(--highlight-text-shadow);
	}

	.keycap {
		z-index: 2;
		top: -0.4em;
		left: -0.1em;
		font-size: 0.7em;
		text-transform: uppercase;
		font-weight: bold;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.label {
		font-size: 0.6em;
		bottom: -0.2em;
		left: 0;
		right: 0;
		text-align: center;
	}
}

:host([layout="halfboard"]) {
	.key[data-keycode="Tab"] { width: 3em; }
	.key[data-keycode="CapsLock"] { width: 3.5em; }
	.key[data-keycode="ShiftLeft"] { width: 4.5em; }

	.key[data-keycode="ControlLeft"] { width: 3em; }
	.key[data-keycode="MetaLeft"] { width: 3em; }
	.key[data-keycode="AltLeft"] { width: 3em; }

	// give the spacebar room to stretch out
	.row:last-child {
		width: 100%;
	}

	// set the spacebar to be expandable
	.key[data-keycode="Space"] {
		width: 4em;
		flex: 1 0 auto;
	}
}

:host([layout="compact"]) {
	.row:nth-child(2) {
		margin-left: 0.5em;
	}
	.row:nth-child(3) {
		margin-left: 2em;
	}
}

.key:hover {
	background: #ccc4;
}

.key[data-is-pressed] {
	background: #eee8;
	color: white;
}

.key:not([data-is-embellished]) {
	opacity: 0.2;
}

.draggable-container {
	grid-column: 2 / -1;
	border-radius: 5px;
	cursor: grab;
	position: relative;
	display: flex;
	align-items: center;
}

.draggable-item {
	position: absolute;
	width: 100%;
	height: 100%;
}

.toggle-editor {
	grid-column: span 1;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 5px;
	color: white;
	cursor: pointer;
}

.toggle-editor {
	background-color: #00000017;
}

.toggle-editor:hover {
	background-color: #0000004d;
}

.editor {
	display: none;
	position: absolute;
	width: 15em;
	height: 20em;
	top: -22em;
	font-family: sans-serif;
}

.editor[data-is-open] {
	display: flex;
}

.effects {
	display: flex;
	flex-direction: column;
	flex: 1;
	border: none;
	align-items: center;
	flex: 1;
}

.effect {
	border: none;
	color: white;
}

.effect option {
	color: black;
}

.edit-keys, .effects {
	display: flex;
	flex-direction: column;
	flex: 1;
	border: none;
	align-items: center;
	justify-content: center;
}

.edit-key, .effect {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 2.5em;
	width: 100%;
	text-align: center;
}

.effect:nth-child(even) {
	background-color: #00000073;
}

.effect:nth-child(odd) {
	background-color: #8080801f;
}

.edit-key:nth-child(even) {
	background-color: #0000003d;
}

.edit-key:nth-child(odd) {
	background-color: #80808030;
}

`
