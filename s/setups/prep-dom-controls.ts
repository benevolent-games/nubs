
import {getBasis} from "./utils/get-basis.js"
import {withinRadius} from "./utils/within-radius.js"
import {StickControls, StickStarters} from "../elements/stick/types.js"
import {registerFinalValues} from "./utils/register-final-values.js"
import {findClosestPointOnCircle} from "./utils/find-closest-point-on-circle.js"

export function prepDomControls({
		query,
		triggerInput,
		setVector,
	}: StickStarters): StickControls {

	return {
		moveStick(clientX: number, clientY: number) {
			const basis = getBasis(query())
			if (basis) {
				const {left, top, height, width} = basis.rect
				const middleX = left + (width / 2)
				const middleY = top + (height / 2)
				let x = clientX - middleX
				let y = clientY - middleY
				if (!withinRadius(basis, x, y))
					[x, y] = findClosestPointOnCircle(basis, x, y)
				registerFinalValues(setVector, triggerInput, basis, x, y)
			}
		},
		resetStick() {
			const basis = getBasis(query())
			if (basis)
				registerFinalValues(setVector, triggerInput, basis, 0, 0)
		},
	}
}
