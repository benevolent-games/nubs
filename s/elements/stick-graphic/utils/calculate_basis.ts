
import {Basis} from "../types/basis.js"

export function calculate_basis(
		base: HTMLElement | void,
		stick: HTMLElement | void,
	): Basis | undefined {

	if (base && stick) {
		const rect = base.getBoundingClientRect()

		const half_base = (rect.width / 2)
		const quarter_stick = (stick.getBoundingClientRect().width / 4)

		return {
			rect,
			radius: half_base - quarter_stick,
		}
	}
}
