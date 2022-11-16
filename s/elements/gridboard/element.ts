
import {html} from "lit"
import {component2 as element} from "@chasemoskal/magical/x/component.js"

import {Nub} from "../../types.js"
import {styles} from "./style.css.js"
import {GridboardStarters} from "./types.js"
import {KeyData, keys} from "./setups/utils/keys.js"
import {dispatchNubEvent} from "../../framework/dispatch.js"
import {setupWindowEvents} from "./setups/setup-window-events.js"
import {setupGridboardEvents} from "./setups/setup-gridboard-events.js"
import {setupDraggableContainerEvents} from "./setups/setup-draggable-container-events.js"

export const NubGridboard = element<{
		channels: string
	}>({
		styles,
		shadow: true,
		properties: {
			channels: {type: String, reflect: true},
		},
	}).render(use => {

	const starters: GridboardStarters = {
		query: () => ({
			root: use.element,
			draggableItem: use.element.shadowRoot!.querySelector(".draggable-item")!,
			keysButtons: use.element.shadowRoot!.querySelectorAll(".key")!
		}),
		triggerInput(data: Nub.Data.Key) {
			dispatchNubEvent()
				.atTarget(use.element)
				.input()
				.parseChannels(use.element.channels)
				.key(data)
				.fire()
		},
	}

	const gridboardEvents = setupGridboardEvents({...starters})
	const draggableContainerEvents = setupDraggableContainerEvents({...starters})
	const actionsElements = use.element.shadowRoot?.querySelectorAll<HTMLSelectElement>(".action")!

	const toggleEdtior = () => {
		const editor = use.element.shadowRoot?.querySelector<HTMLElement>(".editor")!
		editor.toggleAttribute('opened')
	}

	use.setup(setupWindowEvents({...starters}))
	
	return html`
		<div class=flex-box>
			<div class="editor">
				<div class="actions">
					${Object.values(keys).slice(0, 10).map(({key, actionName}: KeyData, i: number) => html`
					<span class="action">
						${actionName ? actionName : ''}
					</span>`)}
				</div>
				<div class="edit-keys">
					${Object.values(keys).slice(0, 10).map(({key}: KeyData) => html`
					<span class="edit-key">${key}</span>
					`)}
				</div>
			</div>
			<div class="grid-box">
				<div @pointerdown=${toggleEdtior} class="toggle-editor">
				<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ai ai-Edit"><path d="M16.474 5.408l2.118 2.117m-.756-3.982L12.109 9.27a2.118 2.118 0 0 0-.58 1.082L11 13l2.648-.53c.41-.082.786-.283 1.082-.579l5.727-5.727a1.853 1.853 0 1 0-2.621-2.621z"/><path d="M19 15v3a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h3"/></svg>
				</div>
				<div class="draggable-container">
					<div
					@mousedown=${draggableContainerEvents.mousedown} 
					@mouseup=${draggableContainerEvents.mouseup}
					@mousemove=${draggableContainerEvents.mousemove}
					@touchstart=${draggableContainerEvents.touchstart}
					@touchend=${draggableContainerEvents.touchend}
					@touchmove=${draggableContainerEvents.touchmove}
					class="draggable-item"></div>
					<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" preserveAspectRatio="none" viewBox="0 0 24 24" fill="currentColor" stroke-width="2" class="ai ai-DragHorizontalFill"><path fill-rule="evenodd" clip-rule="evenodd" d="M22 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"/><path fill-rule="evenodd" clip-rule="evenodd" d="M22 16a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"/><path fill-rule="evenodd" clip-rule="evenodd" d="M14 16a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"/><path fill-rule="evenodd" clip-rule="evenodd" d="M6 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"/><path fill-rule="evenodd" clip-rule="evenodd" d="M6 16a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"/><path fill-rule="evenodd" clip-rule="evenodd" d="M14 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"/></svg>
					<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" preserveAspectRatio="none" viewBox="0 0 24 24" fill="currentColor" stroke-width="2" class="ai ai-DragHorizontalFill"><path fill-rule="evenodd" clip-rule="evenodd" d="M22 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"/><path fill-rule="evenodd" clip-rule="evenodd" d="M22 16a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"/><path fill-rule="evenodd" clip-rule="evenodd" d="M14 16a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"/><path fill-rule="evenodd" clip-rule="evenodd" d="M6 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"/><path fill-rule="evenodd" clip-rule="evenodd" d="M6 16a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"/><path fill-rule="evenodd" clip-rule="evenodd" d="M14 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"/></svg>
					<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" preserveAspectRatio="none" viewBox="0 0 24 24" fill="currentColor" stroke-width="2" class="ai ai-DragHorizontalFill"><path fill-rule="evenodd" clip-rule="evenodd" d="M22 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"/><path fill-rule="evenodd" clip-rule="evenodd" d="M22 16a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"/><path fill-rule="evenodd" clip-rule="evenodd" d="M14 16a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"/><path fill-rule="evenodd" clip-rule="evenodd" d="M6 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"/><path fill-rule="evenodd" clip-rule="evenodd" d="M6 16a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"/><path fill-rule="evenodd" clip-rule="evenodd" d="M14 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"/></svg>
				</div>
				${Object.keys(keys).map((key: any, i) =>
					html`
					<button
					@pointerdown=${gridboardEvents.pointerdown}
					@pointerup=${gridboardEvents.pointerup}
					data-key=${key}
					itemid=${key}
					class="key">
						${key}
					</button>`)}
			</div>
		</div>
	`
})
