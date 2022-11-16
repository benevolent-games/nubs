
import {Basis} from "../../types.js"
import {V2} from "../../../../tools/v2.js"

export function registerFinalValues(
		setStyleTransforms: (s: {stick: string, understick: string}) => void,
		triggerInput: (v: V2) => void,
		basis: Basis,
		x: number,
		y: number,
	) {

	const values: V2 = [
		x / basis.radius,
		-(y / basis.radius),
	]

	const underX = x * 0.5
	const underY = y * 0.5

	setStyleTransforms({
		stick: `transform: translate(${x}px, ${y}px);`,
		understick: `transform: translate(${underX}px, ${underY}px);`,
	})

	triggerInput(values)
}
