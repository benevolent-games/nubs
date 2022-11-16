
import {html} from "lit"
import {view} from "@chasemoskal/magical/x/view/view.js"

import {GridboardStarters} from "../types.js"
import {prepDraggableContainerEvents} from "../setups/prep-draggable-container-events.js"

export const DraggableContainerView = view(use => (starters: GridboardStarters) => {
	const events = prepDraggableContainerEvents(starters)
	return html`
		<div class=draggable-container>
			<div class=draggable-item
				@mousedown=${events.mousedown}
				@mouseup=${events.mouseup}
				@mousemove=${events.mousemove}
				@touchstart=${events.touchstart}
				@touchend=${events.touchend}
				@touchmove=${events.touchmove}
			></div>
			<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" preserveAspectRatio="none" viewBox="0 0 24 24" fill="currentColor" stroke-width="2" class="ai ai-DragHorizontalFill"><path fill-rule="evenodd" clip-rule="evenodd" d="M22 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"/><path fill-rule="evenodd" clip-rule="evenodd" d="M22 16a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"/><path fill-rule="evenodd" clip-rule="evenodd" d="M14 16a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"/><path fill-rule="evenodd" clip-rule="evenodd" d="M6 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"/><path fill-rule="evenodd" clip-rule="evenodd" d="M6 16a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"/><path fill-rule="evenodd" clip-rule="evenodd" d="M14 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"/></svg>
			<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" preserveAspectRatio="none" viewBox="0 0 24 24" fill="currentColor" stroke-width="2" class="ai ai-DragHorizontalFill"><path fill-rule="evenodd" clip-rule="evenodd" d="M22 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"/><path fill-rule="evenodd" clip-rule="evenodd" d="M22 16a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"/><path fill-rule="evenodd" clip-rule="evenodd" d="M14 16a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"/><path fill-rule="evenodd" clip-rule="evenodd" d="M6 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"/><path fill-rule="evenodd" clip-rule="evenodd" d="M6 16a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"/><path fill-rule="evenodd" clip-rule="evenodd" d="M14 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"/></svg>
			<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" preserveAspectRatio="none" viewBox="0 0 24 24" fill="currentColor" stroke-width="2" class="ai ai-DragHorizontalFill"><path fill-rule="evenodd" clip-rule="evenodd" d="M22 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"/><path fill-rule="evenodd" clip-rule="evenodd" d="M22 16a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"/><path fill-rule="evenodd" clip-rule="evenodd" d="M14 16a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"/><path fill-rule="evenodd" clip-rule="evenodd" d="M6 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"/><path fill-rule="evenodd" clip-rule="evenodd" d="M6 16a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"/><path fill-rule="evenodd" clip-rule="evenodd" d="M14 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"/></svg>
		</div>
	`
})

DraggableContainerView.shadow = false
