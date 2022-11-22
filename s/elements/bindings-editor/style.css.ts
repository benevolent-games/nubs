import {css} from "@chasemoskal/magical/x/camel-css/camel-css-lit.js"

export const styles = css`
	:host {
		position: absolute;
		border: 1px solid black;
		width: 100%;
		height: 100%;
		margin: auto;
		inset: 0;
		z-index: 10;
		background-color: rgb(25 26 32 / 45%);
		backdrop-filter: blur(3px);
		display: flex;
		justify-content: center;
		align-items: center;
	}
	h1 {
		padding: 0.5em;
	}
	.column {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100%;
	}
	.row {
		font-size: 2em;
		width: 70%;
		overflow-y: scroll;
		max-height: 70vh;
	}
	.bind, .add-bind {
		text-align: center;
		width: 25%;
		z-index: 10;
		flex: 0 0 25%;
	}
	.add-bind {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.container, .action {
		display: flex;
	}
	.action, .keybinds, .row, .binds-column {
		flex: 1;
	}
	.action, .bind, .add-bind {
		padding: 0.5em;
	}
	.keybinds {
		display: flex;
		flex-wrap: wrap;
	}
	.add-bind .add-key {
		display: flex;
		width: 1em;
		height: 1em;
		justify-content: center;
		border: 1px solid #005600;
		color: #005600;
		align-items: center;
		cursor: pointer;
	}
	.add-bind .add-key:hover {
		background-color: #0c4e0c4f;
	}
	.bind[selected], .add-bind[selected] {
		box-shadow: inset 0px 0px 45px -23px rgba(0, 0, 0, 1);
	}
	.key, .add-key, .info-key {
		pointer-events: none;
	}
	.info-key {
		display: none;
	}
	.bind[selected] {
		.info-key {
			display: block;
		}
		.key {
			display: none;
		}
	}
	.add-bind[selected] {
		.add-key {
			display: none;
		}
		.info-key {
			display: block;
		}
	}
	.buttons-container {
		display: flex;
		width: 70%;
		justify-content: flex-end;
		gap: 1em;
		margin: 1em;
	}
	.buttons-container button {
		padding: 0.5em;
		border: none;
		background-color: #81818126;
		border-radius: 10px;
		padding: 0.5em;
		color: white;
		font-size: 1.5em;
		border-bottom: 2px solid rgba(129, 129, 129, 0.15);
		cursor: pointer;
	}
	.buttons-container button:hover {
		background-color: rgb(183 183 183 / 15%);
	}
	.buttons-container button[disabled] {
		color: rgb(129 129 129 / 11%);
		background-color: rgb(255 255 255 / 2%);
	}
	.buttons-container button:active:not([disabled]) {
		border: none;
	}
	.container:nth-child(odd) .action, .keybinds {
		background-color: rgba(70, 71, 76, 0.39);
	}
	.container:nth-child(odd) .keybinds, .action {
		background-color: rgba(37, 37, 40, 0.43);
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
