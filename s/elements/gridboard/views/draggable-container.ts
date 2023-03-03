
import {html} from "lit"
import {view} from "@chasemoskal/magical"

import {Query} from "../types.js"
import {prepDraggableContainerEvents} from "../setups/prep-draggable-container-events.js"
import dragHorizontalFillSvg from "../../../framework/icons/akar/drag-horizontal-fill.svg.js"

export const DraggableContainerView = view({}, use => ({query}: {
		query: Query
	}) => {

	const events = prepDraggableContainerEvents(query)

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
