
import {css} from "@chasemoskal/magical"
export const styles = css`

:host {
	display: block;
	border: 1px solid;
	touch-action: none;

	max-width: var(--lookpad-max-width, 25rem);
	aspect-ratio: var(--lookpad-aspect-ratio, 2/1);
}
`
