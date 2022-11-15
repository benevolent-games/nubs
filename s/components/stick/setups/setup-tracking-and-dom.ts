
import {getBasis} from "./utils/get-basis.js"
import {withinRadius} from "./utils/within-radius.js"
import {StickControls, StickStarters} from "../types.js"
import {registerFinalValues} from "./utils/register-final-values.js"
import {findClosestPointOnCircle} from "./utils/find-closest-point-on-circle.js"

export function setupTrackingAndDom({
		shadow,
		triggerInput,
		setStyleTransforms,
	}: StickStarters): StickControls {
	return {

		moveStick(clientX: number, clientY: number) {
			const basis = getBasis(shadow)
			if (basis) {
				const {left, top, height, width} = basis.rect
				const middleX = left + (width / 2)
				const middleY = top + (height / 2)
				let x = clientX - middleX
				let y = clientY - middleY
				if (!withinRadius(basis, x, y))
					[x, y] = findClosestPointOnCircle(basis, x, y)
				registerFinalValues(setStyleTransforms, triggerInput, basis, x, y)
			}
		},

		resetStick() {
			const basis = getBasis(shadow)
			if (basis)
				registerFinalValues(setStyleTransforms, triggerInput, basis, 0, 0)
		},
	}
}
