
import {Basis} from "../types/basis.js"

export function calculate_basis(
		base: HTMLElement | void,
		over: HTMLElement | void,
	): Basis | undefined {

	if (base && over) {
		const rect = base.getBoundingClientRect()

		const half_base = (rect.width / 2)
		const quarter_stick = (over.getBoundingClientRect().width / 4)

		return {
			rect,
			radius: half_base - quarter_stick,
		}
	}
}
