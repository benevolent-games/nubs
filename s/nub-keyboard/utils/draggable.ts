export function draggable(draggableContainer: HTMLElement, itemToDrag: HTMLElement) {

	let active = false
	let currentX: number
	let currentY: number
	let initialX: number
	let initialY: number
	let xOffset = 0
	let yOffset = 0

	draggableContainer.addEventListener("touchstart", dragStart, false)
	draggableContainer.addEventListener("touchend", dragEnd, false)
	draggableContainer.addEventListener("touchmove", drag, false)

	draggableContainer.addEventListener("mousedown", dragStart, false)
	draggableContainer.addEventListener("mouseup", dragEnd, false)
	draggableContainer.addEventListener("mousemove", drag, false)

	function dragStart(e: any) {
		
		if (e.type === "touchstart") {
			initialX = e.touches[0].clientX - xOffset
			initialY = e.touches[0].clientY - yOffset
		} else {
			initialX = e.clientX - xOffset
			initialY = e.clientY - yOffset
		}

		if (e.target === draggableContainer) {
			active = true
		}
	}

	function dragEnd(e: any) {
		initialX = currentX
		initialY = currentY

		active = false
	}

	function drag(e: any) {
		if (active) {
			e.preventDefault()
      
			if (e.type === "touchmove") {
				currentX = e.touches[0].clientX - initialX
				currentY = e.touches[0].clientY - initialY
			} else {
				currentX = e.clientX - initialX
				currentY = e.clientY - initialY
			}

			xOffset = currentX
			yOffset = currentY

			setTranslate(currentX, currentY, itemToDrag)
		}
	}

	function setTranslate(xPos: string | number, yPos: string | number, el: HTMLElement) {
		el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)"
	}
}
