
/**
 * convert a button number, from a mouse event, into a string that resembles a keyboard event code
 * - see https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button#value
 */
export function convertMouseButtonToCause(button: number) {
	switch (button) {
		case 0: return "Mouse1"
		case 1: return "Mouse3"
		case 2: return "Mouse2"
		case 3: return "Mouse4"
		case 4: return "Mouse5"
		default: return "Mouse1"
	}
}
