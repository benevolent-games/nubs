import {css} from "@chasemoskal/magical/x/camel-css/camel-css-lit.js"
export const styles = css`
:host {}

slot {
	display: flex;
	justify-content: space-around;
	max-width: 55rem;
	font-size: 0.8rem;
	margin: 1rem auto;
	align-items: center;
}

nub-stick {
	opacity: 0.2;
}

.flip {
	position: absolute;
	top: 0;
	border: none;
	padding: 0.5em;
	border-bottom-right-radius: 5px;
	cursor: pointer;
	color: white;
	background-color: #2f3c7c;
}

.flip:hover {
	background-color: #212b5a;
}

@media (max-width: 767px) {
	.nubs {
		font-size: 0.6rem;
	}
}
@media (max-width: 425px) {
	.nubs {
		font-size: 0.5rem;
	}
}

`
