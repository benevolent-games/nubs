import {css} from "@chasemoskal/magical"

export default css`
	:host {
		display: flex;
		width: 2em;
		height: 2em;
		border: 2px solid #080c12;
		cursor: pointer;
	}
	button {
		width: 100%;
		height: 100%:
		display: flex;
		flex-direction: column;
	}
	slot[name=text] {
		display: flex;
		font-size: 0.6rem;
		align-self: center;
	}

`
