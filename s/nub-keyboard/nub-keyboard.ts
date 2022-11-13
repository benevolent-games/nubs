import {draggable} from "./utils/draggable.js"
import { styles } from "./style.css.js"
import { KeyData, keys } from "./utils/keys.js"
import {dispatchCustomEvent} from "./utils/dispatchCustomEvent.js"
export class NubKeyboard extends HTMLElement {

	shadow = this.attachShadow({
		mode: "open",
		delegatesFocus: false,
	})

	constructor() {
		super()
		// this crap below not working have fun :DDDDDDDDDDDDDDD
		Object.values(keys).map((key: any, i: number) => console.log(key))
		for (const value of Object.values(keys)) {
			console.log(value)
		}
		console.log(Object.values(keys))
		console.log(Object.values(keys).map(({key}) => key))
		this.shadow.innerHTML = `
			<div class=flex-box>
				<div class="editor">
					<div class="actions">
						${Object.values(keys).slice(0, 10).map(({key, actionName}: KeyData, i: number) => `
						<span class="action">
							${actionName ? actionName : ''}
						</span>`).join("")}
					</div>
					<div class="edit-keys">
						${Object.values(keys).slice(0, 10).map(({key}: KeyData) => `
						<span class="edit-key">${key}</span>
						`).join("")}
					</div>
				</div>
				<div class="grid-box">
					<div class="toggle-editor">
					<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ai ai-Edit"><path d="M16.474 5.408l2.118 2.117m-.756-3.982L12.109 9.27a2.118 2.118 0 0 0-.58 1.082L11 13l2.648-.53c.41-.082.786-.283 1.082-.579l5.727-5.727a1.853 1.853 0 1 0-2.621-2.621z"/><path d="M19 15v3a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h3"/></svg>
					</div>
					<div class="draggable-container">
						<div class="draggable-item"></div>
						<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" preserveAspectRatio="none" viewBox="0 0 24 24" fill="currentColor" stroke-width="2" class="ai ai-DragHorizontalFill"><path fill-rule="evenodd" clip-rule="evenodd" d="M22 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"/><path fill-rule="evenodd" clip-rule="evenodd" d="M22 16a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"/><path fill-rule="evenodd" clip-rule="evenodd" d="M14 16a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"/><path fill-rule="evenodd" clip-rule="evenodd" d="M6 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"/><path fill-rule="evenodd" clip-rule="evenodd" d="M6 16a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"/><path fill-rule="evenodd" clip-rule="evenodd" d="M14 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"/></svg>
						<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" preserveAspectRatio="none" viewBox="0 0 24 24" fill="currentColor" stroke-width="2" class="ai ai-DragHorizontalFill"><path fill-rule="evenodd" clip-rule="evenodd" d="M22 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"/><path fill-rule="evenodd" clip-rule="evenodd" d="M22 16a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"/><path fill-rule="evenodd" clip-rule="evenodd" d="M14 16a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"/><path fill-rule="evenodd" clip-rule="evenodd" d="M6 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"/><path fill-rule="evenodd" clip-rule="evenodd" d="M6 16a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"/><path fill-rule="evenodd" clip-rule="evenodd" d="M14 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"/></svg>
						<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" preserveAspectRatio="none" viewBox="0 0 24 24" fill="currentColor" stroke-width="2" class="ai ai-DragHorizontalFill"><path fill-rule="evenodd" clip-rule="evenodd" d="M22 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"/><path fill-rule="evenodd" clip-rule="evenodd" d="M22 16a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"/><path fill-rule="evenodd" clip-rule="evenodd" d="M14 16a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"/><path fill-rule="evenodd" clip-rule="evenodd" d="M6 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"/><path fill-rule="evenodd" clip-rule="evenodd" d="M6 16a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"/><path fill-rule="evenodd" clip-rule="evenodd" d="M14 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"/></svg>
					</div>
				 	${Object.keys(keys).map((key: any, i) => `<button data-key="${key}" class="key">${key}</button>`).join("")}
				</div>
			</div>
		`
		const style = document.createElement("style")
		style.textContent = styles
		this.shadowRoot?.append(style)

		const toggleEditor = this.shadowRoot?.querySelector<HTMLElement>(".toggle-editor")
		const keysButtons = this.shadowRoot?.querySelectorAll<HTMLButtonElement>(".key")!
		const draggableContainer: HTMLElement = this.shadowRoot?.querySelector(".draggable-item")!;
		const editor = this.shadowRoot?.querySelector<HTMLElement>(".editor")!
		const actionsElements = this.shadowRoot?.querySelectorAll<HTMLSelectElement>(".action")!
		const itemToDrag:HTMLElement = document?.querySelector("nub-keyboard")!;

		draggable(draggableContainer, itemToDrag)

		toggleEditor?.addEventListener("pointerdown", () => {
			if (editor.style.display == 'flex') {
				editor.style.display = 'none'
			} else {editor.style.display = 'flex'}
		})
		document.addEventListener('keydown', (e) => {
			const key = e.key.toUpperCase()
			const keyData = keys[key]
			const index = Object.keys(keys).indexOf(keyData.key)
			if (keyData) {
				dispatchCustomEvent(this, keyData)
				keysButtons[index].setAttribute("pressed", "")
		}
		})
		document.addEventListener('keyup', (e) => {
			const key = e.key.toUpperCase()
			const keyData = keys[key]
			const index = Object.keys(keys).indexOf(keyData.key)
			if (keyData) {
				keysButtons[index].removeAttribute("pressed")
			}
		})
		keysButtons?.forEach((keyEl, index) => keyEl.addEventListener('pointerdown', (e: PointerEvent) => {
			const key = keyEl.getAttribute("data-key")?.toUpperCase()!
			const data = keys[key]
			dispatchCustomEvent(this, data)
			keyEl.setAttribute("pressed", "")
		}))
		keysButtons?.forEach((key, index) => key.addEventListener('pointerup', (e: PointerEvent) => {
			keysButtons[index].removeAttribute("pressed")
		}))
	}
	
}
