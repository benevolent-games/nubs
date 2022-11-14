
import {V2} from "../../../tools/v2.js"

export interface Basis {
	rect: DOMRect
	radius: number
}

const withinRadius = (basis: Basis, x: number, y: number) => {
	return (x ** 2) + (y ** 2) < (basis.radius ** 2)
}

const findClosestPointOnCircle = (basis: Basis, x: number, y: number) => {
	const mag = Math.sqrt((x ** 2) + (y ** 2))
	return [
		x / mag * basis.radius,
		y / mag * basis.radius,
	]
}

const registerFinalValues = (
		setStyleTransforms: (s: {stick: string, understick: string}) => void,
		triggerInput: (v: V2) => void,
		basis: Basis,
		x: number,
		y: number,
	) => {
	const values: V2 = [
		x / basis.radius,
		-(y / basis.radius),
	]
	const underX = x * 0.5
	const underY = y * 0.5
	setStyleTransforms({
		stick: `transform: translate(${x}px, ${y}px);`,
		understick: `transform: translate(${underX}px, ${underY}px);`,
	})
	triggerInput(values)
}

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

export function setupStickTracking({shadow, triggerInput, setStyleTransforms}: {
		shadow: ShadowRoot
		triggerInput: (v: V2) => void
		setStyleTransforms: (s: {stick: string, understick: string}) => void
	}) {

	const moveStick = (clientX: number, clientY: number) => {
		const basis = getBasis(shadow)
		if (basis) {
			console.log("move stick")
			const {left, top, height, width} = basis.rect
			const middleX = left + (width / 2)
			const middleY = top + (height / 2)
			let x = clientX - middleX
			let y = clientY - middleY
			if (!withinRadius(basis, x, y))
				[x, y] = findClosestPointOnCircle(basis, x, y)
			registerFinalValues(setStyleTransforms, triggerInput, basis, x, y)
		}
	}

	const resetStick = () => {
		const basis = getBasis(shadow)
		if (basis)
			registerFinalValues(setStyleTransforms, triggerInput, basis, 0, 0)
	}

	return {moveStick, resetStick}
}
