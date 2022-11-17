
import {Basis} from "../../types.js"

export function getBasis({base, stick}: {
		base: HTMLElement
		stick: HTMLElement
	}): Basis {

	const rect = base.getBoundingClientRect()
	const radius = (rect.width / 2) - (stick.getBoundingClientRect().width / 4)
	return {rect, radius}
}
