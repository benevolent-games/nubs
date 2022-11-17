
import {css} from "@chasemoskal/magical/x/camel-css/camel-css-lit.js"
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
	display: grid;
	grid-template-columns: repeat(5, 2em);
	grid-template-rows: repeat(5, 2em);
	font-family: sans-serif;
	background-color: #00000021;
	width: 100%;
	gap: 0.3em;
	border-radius: 5px;
	justify-content: space-around;
	padding: 0.5em;
}

.key {
	display: flex;
	justify-content: flex-start;
	align-items: flex-start;
	background-color: #0000002e;
	height: 100%;
	width: 100%;
	color: white;
	border-radius: 5px;
	cursor: pointer;
	border: none;
	border-bottom: 1px solid #182252;
	align-self: flex-end;
	justify-self: flex-end;
	padding-top: 0.2em;
	font-size: 0.9em;
}

.key:hover {
	background-color: #00000052;
}

.key[data-pressed] {
	height: 95%;
	background-color: #00000052;
	border: none;
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
