import {Basis} from "../../elements/stick/types.js"
import {V2} from "../../tools/v2.js"

export function registerFinalValues(
		setVector: (n: V2) => void,
		triggerInput: (v: V2) => void,
		basis: Basis,
		x: number,
		y: number,
	) {

	const values: V2 = [
		x / basis.radius,
		-(y / basis.radius),
	]

	setVector([x, y])

	triggerInput(values)
}
