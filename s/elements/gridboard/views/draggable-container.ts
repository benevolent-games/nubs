
import {html} from "lit"
import {view} from "@chasemoskal/magical/x/view/view.js"

import {GridboardStarters} from "../types.js"
import {prepDraggableContainerEvents} from "../setups/prep-draggable-container-events.js"
import dragHorizontalFillSvg from "../../../framework/icons/akar/drag-horizontal-fill.svg.js"

export const DraggableContainerView = view(use => (starters: GridboardStarters) => {
	const events = prepDraggableContainerEvents(starters)
	return html`
		<div class=draggable-container>
			<div class=draggable-item
				@mousedown=${events.mousedown}
				@mousemove=${events.mousemove}
				@touchstart=${events.touchstart}
				@touchmove=${events.touchmove}
			></div>
			${dragHorizontalFillSvg}
			${dragHorizontalFillSvg}
			${dragHorizontalFillSvg}
		</div>
	`
})

DraggableContainerView.shadow = false
