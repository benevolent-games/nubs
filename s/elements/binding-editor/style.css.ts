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
		display: flex;
		font-size: 2em;
		width: 70%;
	}
	.binds-column {
		display: flex;
		flex-direction: column;
	}
	.binds-row {
		display: flex;
		flex-wrap: wrap;
	}
	.bind, .add-bind {
		text-align: center;
		width: 20%;
		padding: 0.5em;
		z-index: 10;
		flex: 0 0 20%;
	}
	.add-bind {
	  display: flex;
    justify-content: center;
    align-items: center;
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
	.key, .add-key {
		pointer-events: none;
	}
	.info-key {
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
	.binds-row:nth-child(odd) {
		background-color: rgba(70, 71, 76, 0.39);
	}
	.binds-row:nth-child(even) {
		background-color: rgba(37, 37, 40, 0.43);
	}
	.actions div {
		padding: 0.5em;
	}
	.actions, .binds-column {
		flex: 1;
	}
	.actions div:nth-child(even) {
		background-color: rgba(70, 71, 76, 0.39);
	}
	.actions div:nth-child(odd) {
		background-color: rgba(37, 37, 40, 0.43);
	}
`
