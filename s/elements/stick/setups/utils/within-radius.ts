
import {Basis} from "../../types.js"

export function withinRadius(basis: Basis, x: number, y: number) {
	return (x ** 2) + (y ** 2) < (basis.radius ** 2)
}
