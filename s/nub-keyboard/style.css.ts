export const styles = `
	:host {
		display: block;
		width: 13em;
		height: 13em;
		position: relative;
	}
	.flex-box {
		display: flex;
		flex-direction: column;
	}
	.grid-box {
		display: grid;
		grid-template-columns: repeat(5, 2em);
		grid-template-rows: repeat(5, 2em);
		font-family: sans-serif;
		background-color: #d1cbcb;
		width: 100%;
		gap: 0.3em;
		border-radius: 5px;
		justify-content: space-around;
		padding: 0.3em;
	}
	.key {
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: white;
		color: #5c5c5c;
		border-radius: 5px;
		cursor: pointer;
		border: none;
		border-bottom: 1px solid #817f7f;
	}
	.draggable {
		grid-column: 3 / -1;
		background-color: #565252;
		border-radius: 5px;
		cursor: grab;
	}
	.toggle-editor {
		grid-column: span 2;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 5px;
		background-color: #ffffff;
		color: black;
	}
	.editor {
		display: none;
		position: absolute;
		width: 15em;
		height: 20em;
		top: -22em;
		font-family: sans-serif;
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
