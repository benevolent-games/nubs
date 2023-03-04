import {Basis} from "../../elements/stick/types.js"

export function findClosestPointOnCircle(basis: Basis, x: number, y: number) {
	const magnitude = Math.sqrt((x ** 2) + (y ** 2))
	return [
		x / magnitude * basis.radius,
		y / magnitude * basis.radius,
	]
}
