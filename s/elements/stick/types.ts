
import {V2} from "../../tools/v2.js"

export interface StickStarters {
	query(): {
		base: HTMLElement
		stick: HTMLElement
	}

	triggerInput: (v: V2) => void

	setVector: (n: {x: number, y: number}) => void

	setTrackingPointerId: (x: number | undefined) => void
	getTrackingPointerId: () => number | undefined

}

export interface StickControls {
	resetStick: () => void
	moveStick: (clientX: number, clientY: number) => void
}

export interface Basis {
	rect: DOMRect
	radius: number
}
