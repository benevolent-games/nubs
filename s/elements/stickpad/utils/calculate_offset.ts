
import {V2} from "../../../tools/v2.js"
import {Basis} from "../../stick-graphic/types/basis.js"

export function calculate_offset(
		event: PointerEvent,
		basis: Basis,
		area_rect: DOMRect,
	): V2 {

	const half_basis_width = basis.rect.width / 2

	return [
		(event.clientX - area_rect.left) - half_basis_width,
		(event.clientY - area_rect.top) - half_basis_width,
	]
}
