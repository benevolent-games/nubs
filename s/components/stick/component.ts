
import {html} from "lit"
import {component} from "@chasemoskal/magical/x/component.js"

import styles from "./style.css.js"
import * as v2 from "../../tools/v2.js"
import {attachEvents} from "../../tools/attach-events.js"
import {asLitListener} from "../../tools/lit-listener.js"
import {findTouchAppleFriendly} from "../../tools/find-touch-ios-friendly.js"

export interface Basis {
	rect: DOMRect
	radius: number
}

export const NubStick = component({
		styles,
		shadow: true,
		properties: {},
	}, use => {

	function triggerInput(values: v2.V2) {

	}

	const [, setTrackingMouse, getTrackingMouse] = use.state(false)
	const [trackingTouchId, setTrackingTouchId] = use.state<number | void>(undefined)
	const [styleTransforms, setStyleTransforms] = use.state({
		stick: "",
		understick: "",
	})

	function getBasis(): undefined | Basis {
		const base = use.element.shadowRoot?.querySelector<HTMLElement>(".base")
		const stick = use.element.shadowRoot?.querySelector<HTMLElement>(".stick")
		if (base && stick) {
			const rect = base?.getBoundingClientRect()!
			const radius = (rect.width / 2) - (stick.getBoundingClientRect().width / 4)
			return {rect, radius}
		}
		else
			return undefined
	}

	const {resetStick, moveStick} = (() => {
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
	
		const registerFinalValues = (basis: Basis, x: number, y: number) => {
			const values: v2.V2 = [
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
	
		const moveStick = (clientX: number, clientY: number) => {
			const basis = getBasis()
			if (basis) {
				console.log("move stick")
				const {left, top, height, width} = basis.rect
				const middleX = left + (width / 2)
				const middleY = top + (height / 2)
				let x = clientX - middleX
				let y = clientY - middleY
				if (!withinRadius(basis, x, y))
					[x, y] = findClosestPointOnCircle(basis, x, y)
				registerFinalValues(basis, x, y)
			}
		}
	
		const resetStick = () => {
			const basis = getBasis()
			if (basis)
				registerFinalValues(basis, 0, 0)
		}

		return {moveStick, resetStick}
	})()


	use.setup(() => attachEvents(window, {
		mouseup() {
			setTrackingMouse(false)
			resetStick()
		},
		mousemove(event) {
			const {clientX, clientY} = <MouseEvent>event
			const trackingMouse = getTrackingMouse()
			if (trackingMouse)
				moveStick(clientX, clientY)
		},
	}))

	const baseEvents = {
		mousedown: asLitListener<MouseEvent>({
			handleEvent({clientX, clientY}) {
				setTrackingMouse(true)
				moveStick(clientX, clientY)
			},
		}),
		touchstart: asLitListener<TouchEvent>({
			passive: false,
			handleEvent(event) {
				const touch = event.targetTouches[0]
				setTrackingTouchId(touch.identifier)
				const {clientX, clientY} = touch
				moveStick(clientX, clientY)
				event.preventDefault()
			},
		}),
		touchmove: asLitListener<TouchEvent>({
			passive: false,
			handleEvent(event) {
				const touch = findTouchAppleFriendly(trackingTouchId!, event.touches)
				if (touch) {
					const {clientX, clientY} = touch
					moveStick(clientX, clientY)
				}
				event.preventDefault()
			},
		}),
		touchend: asLitListener<TouchEvent>({
			handleEvent() {
				setTrackingTouchId(undefined)
				resetStick()
			},
		}),
	}

	return html`
		<div class=base
			@mousedown=${baseEvents.mousedown}
			@touchstart=${baseEvents.touchstart}
			@touchmove=${baseEvents.touchmove}
			@touchend=${baseEvents.touchend}>
				<div class=stick style="${styleTransforms.stick}"></div>
				<div class=understick style="${styleTransforms.understick}"></div>
		</div>
	`
})
