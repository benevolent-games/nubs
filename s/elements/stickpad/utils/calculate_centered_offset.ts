
import {V2} from "../../../tools/v2.js"
import {Basis} from "../../stick-graphic/types/basis.js"

export function calculate_centered_offset(
		basis: Basis,
		area_rect: DOMRect,
	): V2 {

	const {width, height} = area_rect
	const half_basis = basis.rect.width / 2

	return [
		(width / 2) - half_basis,
		(height / 2) - half_basis,
	]
}
