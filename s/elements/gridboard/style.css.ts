
import {css} from "@chasemoskal/magical"
export const styles = css`

:host {
	display: block;
	position: relative;
}

.shell {
	display: flex;
	flex-direction: column;
}

.grid {
	margin: auto;
	display: flex;
	flex-direction: column;
	width: max-content;

	> .row {
		display: flex;
		flex-direction: row;
		background: #000a;
		width: max-content;
		padding: 0.25rem 0.5rem;
		gap: 0.5rem;
		border-radius: 0.3rem;

		button {
			border-radius: 0.3rem;
		}

		^:first-child { padding-top: 0.5rem; }
		^:last-child { padding-bottom: 0.5rem; }
	}
}

.key {
	border: none;
	display: flex;

	font-size: 1.5rem;
	width: 2em;
	height: 2em;

	align-items: flex-start;
	justify-content: center;
	font-weight: bold;
	background: #4448;
	color: #fff4;
	text-shadow: 0 2px 1px #0007;
	border-top: 1px solid #fff2;
	border-bottom: 1px solid #0002;
}

.key[data-keycode="Tab"] { width: 3em; }
.key[data-keycode="CapsLock"] { width: 4em; }
.key[data-keycode="ShiftLeft"] { width: 5em; }

.key:hover {
	background: #ccc4;
}

.key[data-is-pressed] {
	background: #eee8;
	color: white;
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

svg {
	width: 40px;
	fill: #0000004d;
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

.actions {
	display: flex;
	flex-direction: column;
	flex: 1;
	border: none;
	align-items: center;
	flex: 1;
}

.action {
	border: none;
	color: white;
}

.action option {
	color: black;
}

.edit-keys, .actions {
	display: flex;
	flex-direction: column;
	flex: 1;
	border: none;
	align-items: center;
	justify-content: center;
}

.edit-key, .action {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 2.5em;
	width: 100%;
	text-align: center;
}

.action:nth-child(even) {
	background-color: #00000073;
}

.action:nth-child(odd) {
	background-color: #8080801f;
}

.edit-key:nth-child(even) {
	background-color: #0000003d;
}

.edit-key:nth-child(odd) {
	background-color: #80808030;
}

`
