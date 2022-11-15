
import {Basis} from "../../types.js"

export function getBasis(shadow: ShadowRoot): Basis {
	const base = shadow.querySelector<HTMLElement>(".base")
	const stick = shadow.querySelector<HTMLElement>(".stick")

	if (base && stick) {
		const rect = base?.getBoundingClientRect()!
		const radius = (rect.width / 2) - (stick.getBoundingClientRect().width / 4)
		return {rect, radius}
	}
	else
		throw new Error("no basis")
}
