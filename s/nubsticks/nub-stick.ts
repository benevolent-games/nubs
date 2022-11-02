import {V2} from "./utils/v2.js"
import * as v2 from "./utils/v2.js"
import { styles } from "./style.css.js"
import {findTouchAppleFriendly} from "./utils/find-touch-ios-friendly.js"

export class NubStick extends HTMLElement {

	shadow = this.attachShadow({
		mode: "open",
		delegatesFocus: false,
	})

	values: V2 = v2.zero()
	onstickmove = (vector: V2) => {}

	#basis: {
		rect: DOMRect
		radius: number
	}

	recalibrate = () => {
		const base = this.shadowRoot?.querySelector<HTMLElement>(".base")
		const stick = this.shadowRoot?.querySelector<HTMLElement>(".stick")!
		const rect = base?.getBoundingClientRect()!
		const radius = (rect.width / 2) - (stick.getBoundingClientRect().width / 4)
		this.#basis = {rect, radius}
	}

	constructor() {
		super()
		this.shadow.innerHTML = `
			<div class=base>
				<div class=stick></div>
				<div class=understick></div>
			</div>
		`
		const style = document.createElement("style")
		style.textContent = styles

		this.shadowRoot?.append(style)

		const base = this.shadowRoot?.querySelector<HTMLElement>(".base")!
		const stick = this.shadowRoot?.querySelector<HTMLElement>(".stick")!
		const understick = this.shadowRoot?.querySelector<HTMLElement>(".understick")!

		const rect = base?.getBoundingClientRect()
		const radius = 0 as number
		this.#basis = {rect, radius}

		this.recalibrate()

		const withinRadius = (x: number, y: number) => {
			return (x ** 2) + (y ** 2) < (this.#basis.radius ** 2)
		}

		const findClosestPointOnCircle = (x: number, y: number) => {
			const mag = Math.sqrt((x ** 2) + (y ** 2))
			return [
				x / mag * this.#basis.radius,
				y / mag * this.#basis.radius,
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

		let trackingMouse = false
		let trackingTouchId: number | undefined

		base.addEventListener("mousedown", ({clientX, clientY}: MouseEvent) => {
			trackingMouse = true
			moveStick(clientX, clientY)
		})

		window.addEventListener("mouseup", () => {
			trackingMouse = false
			resetStick()
		})

		window.addEventListener("mousemove", ({clientX, clientY}: MouseEvent) => {
			if (trackingMouse)
				moveStick(clientX, clientY)
		})

		base.addEventListener("touchstart", (event: TouchEvent) => {
			const touch = event.targetTouches[0]
			trackingTouchId = touch.identifier
			const {clientX, clientY} = touch
			moveStick(clientX, clientY)
			event.preventDefault()
		}, {passive: false})

		base.addEventListener("touchmove", (event: TouchEvent) => {
			const touch = findTouchAppleFriendly(trackingTouchId!, event.touches)
			if (touch) {
				const {clientX, clientY} = touch
				moveStick(clientX, clientY)
			}
			event.preventDefault()
		}, {passive: false})

		base.addEventListener("touchend", () => {
			trackingTouchId = undefined
			resetStick()
		})

		window.addEventListener("resize", () => {
			this.recalibrate()
		})
		window.addEventListener("scroll", () => {
			this.recalibrate()
		})

		new ResizeObserver(() => {
			this.recalibrate()
		}).observe(this)
	}
}
