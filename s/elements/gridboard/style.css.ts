
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
	display: grid;
	grid-template-columns: repeat(5, 3rem);
	grid-template-rows: repeat(4, 3rem);
	gap: 0.5em 0.5em;
	padding: 0.5em;
	font-family: sans-serif;
	width: max-content;
	border-radius: 5px;
	background-color: #000a;
}

.key {
	border: none;
	display: flex;
	align-items: flex-start;
	justify-content: center;
	font-size: 1.5em;
	font-weight: bold;
	background: #4448;
	color: #fff4;
}

.key2 {
	outline: 1px solid #f008;
	border: 1px solid #0f08;
	display: flex;
	align-items: flex-start;
	justify-content: flex-start;
	height: 3em;
	width: 3em;
	margin: 0.5em;
	cursor: pointer;
	background-color: #0000002e;
	border-radius: 5px;
	color: #fff4;
	font-size: 1.5em;
	font-weigt: bold;
}

.key:hover {
	background-color: #00000052;
}

.key[data-pressed] {
	// height: 95%;
	background-color: #00000052;
	// border: none;
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
