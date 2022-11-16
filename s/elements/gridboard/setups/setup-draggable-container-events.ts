function setTranslate(xPos: string | number, yPos: string | number, el: HTMLElement) {
	el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)"
}

export function setupDraggableContainerEvents({query}: any) {
	const root = query().root

	let active = false
	let currentX: number
	let currentY: number
	let initialX: number
	let initialY: number
	let xOffset = 0
	let yOffset = 0

	return {
		touchstart: (e: TouchEvent) => {
			const draggableItem = query().draggableItem
			initialX = e.touches[0].clientX - xOffset
			initialY = e.touches[0].clientY - yOffset
			if (e.target === draggableItem) {
				active = true
			}
		},
		touchend: () => {
			initialX = currentX
			initialY = currentY
			active = false
		},
		touchmove: (e: TouchEvent) => {
			if (active) {
				e.preventDefault()

				currentX = e.touches[0].clientX - initialX
				currentY = e.touches[0].clientY - initialY

				xOffset = currentX
				yOffset = currentY

				setTranslate(currentX, currentY, root)
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
		mouseup: () => {
			initialX = currentX
			initialY = currentY
			active = false
		},
		mousemove: (e: MouseEvent) => {
			if (active) {
				e.preventDefault()

				currentX = e.clientX - initialX
				currentY = e.clientY - initialY

				xOffset = currentX
				yOffset = currentY

				setTranslate(currentX, currentY, root)
			}
		}
	}
}

