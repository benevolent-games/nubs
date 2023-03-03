
import {Query} from "../types.js"

function setTranslate(xPos: string | number, yPos: string | number, el: HTMLElement) {
	el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)"
}

export function prepDraggableContainerEvents(query: Query) {
	const {element} = query()

	let active = false
	let currentX: number
	let currentY: number
	let initialX: number
	let initialY: number
	let xOffset = 0
	let yOffset = 0

	function pointerup(e: MouseEvent) {
		// boundaries
		const element = query().element
		if (element.getBoundingClientRect().x <= 0) {
			const resetX = currentX += Math.abs(element.getBoundingClientRect().x)
			setTranslate(resetX, currentY, element)
		}
		if (element.getBoundingClientRect().y <= 0) {
			const resetY = currentY += Math.abs(element.getBoundingClientRect().y)
			setTranslate(currentX, resetY, element)
		}
		if (element.getBoundingClientRect().y + element.clientHeight >= window.innerHeight) {
			const calculated = (element.getBoundingClientRect().y + element.clientHeight) - window.innerHeight
			const resetY = currentY -= calculated
			setTranslate(currentX, resetY, element)
		}
		if (element.getBoundingClientRect().x + element.clientWidth >= window.innerWidth) {
			const calculated = (element.getBoundingClientRect().x + element.clientWidth) - window.innerWidth
			const resetX = currentX -= calculated
			setTranslate(resetX, currentY, element)
		}
		//
			initialX = currentX
			initialY = currentY

			currentX = initialX
			currentY = initialY

			xOffset = currentX
			yOffset = currentY
			active = false
	}
	document.addEventListener('pointerup', pointerup)

	return {
		touchstart: (e: TouchEvent) => {
			const draggableItem = query().draggableItem
			initialX = e.touches[0].clientX - xOffset
			initialY = e.touches[0].clientY - yOffset
			if (e.target === draggableItem) {
				active = true
			}
		},
		touchmove: (e: TouchEvent) => {
			if (active) {
				e.preventDefault()

				currentX = e.touches[0].clientX - initialX
				currentY = e.touches[0].clientY - initialY

				xOffset = currentX
				yOffset = currentY

				setTranslate(currentX, currentY, element)
			}
		},
		mousedown: (e: MouseEvent) => {
			const draggableItem = query().draggableItem
			initialX = e.clientX - xOffset
			initialY = e.clientY - yOffset
			if (e.target === draggableItem) {
				active = true
			}
		},
		mousemove: (e: MouseEvent) => {
			if (active) {
				e.preventDefault()

				currentX = e.clientX - initialX
				currentY = e.clientY - initialY

				xOffset = currentX
				yOffset = currentY

				setTranslate(currentX, currentY, element)
			}
		}
	}
}
