
import {html} from "lit"
import {component} from "@chasemoskal/magical/x/component.js"
import styles from "./style.css.js"
import * as v2 from "../../tools/v2.js"
import {attachEvents} from "../../tools/attach-events.js"
import {LitListener, asLitListener} from "../../tools/lit-listener.js"
import {findTouchAppleFriendly} from "../../tools/find-touch-ios-friendly.js"

export interface Basis {
	rect: DOMRect
	radius: number
}

export const NubStick = component<{}>({
		styles,
		shadow: true,
		properties: {},
	}, use => {

	const [stickTransform, setStickTransform] = use.state("")
	const [understickTransform, setUnderstickTransform] = use.state("")
	const [basis, setBasis] = use.state<Basis | void>(undefined)
	const [trackingMouse, setTrackingMouse] = use.state(false)
	const [trackingTouchId, setTrackingTouchId] = use.state<number | void>(undefined)

	function recalibrate() {
		const base = use.element.shadowRoot?.querySelector<HTMLElement>(".base")
		const stick = use.element.shadowRoot?.querySelector<HTMLElement>(".stick")!
		const rect = base?.getBoundingClientRect()!
		const radius = (rect.width / 2) - (stick.getBoundingClientRect().width / 4)
		setBasis({rect, radius})
	}

	const withinRadius = (x: number, y: number) => {
		return (x ** 2) + (y ** 2) < (basis.radius ** 2)
	}

	const findClosestPointOnCircle = (x: number, y: number) => {
		const mag = Math.sqrt((x ** 2) + (y ** 2))
		return [
			x / mag * basis.radius,
			y / mag * basis.radius,
		]
	}

	const registerFinalValues = (x: number, y: number) => {
		const values: V2 = [
			x / this.#basis.radius,
			-(y / this.#basis.radius),
		]
		this.values = values
		this.onstickmove(values)
		stick.style.transform = `translate(${x}px, ${y}px)`

		const underX = x * 0.5
		const underY = y * 0.5
		understick.style.transform = `translate(${underX}px, ${underY}px)`
	}

	const moveStick = (clientX: number, clientY: number) => {
		const {left, top, height, width} = this.#basis.rect
		const middleX = left + (width / 2)
		const middleY = top + (height / 2)
		let x = clientX - middleX
		let y = clientY - middleY
		if (!withinRadius(x, y)) {
			[x, y] = findClosestPointOnCircle(x, y)
		}
		registerFinalValues(x, y)
	}

	const resetStick = () => {
		registerFinalValues(0, 0)
	}

	use.setup(() => attachEvents(window, {
		resize: recalibrate,
		scroll: recalibrate,
		mouseup() {
			setTrackingMouse(false)
			resetStick()
		},
		mousemove(e) {
			const {clientX, clientY} = <MouseEvent>e
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
			handleEvent(event) {
				setTrackingTouchId(undefined)
				resetStick()
			},
		}),
	}

	return html`
		<div
			class=base
			@mousedown=${baseEvents.mousedown}
			@touchstart=${baseEvents.touchstart}
			@touchmove=${baseEvents.touchmove}
			@touchend=${baseEvents.touchend}>
				<div class=stick style="${stickTransform}"></div>
				<div class=understick></div>
		</div>
	`
})
