import {actions} from "./utils/actions.js"
import {draggable} from "./utils/draggable.js"
import { styles } from "./style.css.js"
export class NubKeyboard extends HTMLElement {

	shadow = this.attachShadow({
		mode: "open",
		delegatesFocus: false,
	})

	constructor() {
		const keys = [
			"1", "2", "3", "4", "5",
			"Q", "W", "E", "R", "T", "A", "S",
			"D", "F", "G", "Z", "X", "C", "V", "B"
		]

		super()
		
		this.shadow.innerHTML = `
			<div class=flex-box>
				<div class="editor">
					<div class="actions">
						${keys.slice(0, 10).map((key, i) => `
						<select class="action">
							${Object.keys(actions).map((key) => 
							`<option>${key}</option>`)}
						</select>`).join("")}
					</div>
					<div class="edit-keys">
						${keys.slice(0, 10).map(key => `
						<span class="edit-key">${key}</span>
						`).join("")}
					</div>
				</div>
				<div class="grid-box">
					<div class="toggle-editor">editor</div>
					<div class="draggable"></div>
				 	${keys.map(key => `<button class="key">${key}</button>`).join("")}
				</div>
			</div>
		`
		const style = document.createElement("style")
		style.textContent = styles
		this.shadowRoot?.append(style)

		const toggleEditor = this.shadowRoot?.querySelector<HTMLElement>(".toggle-editor")
		const keysButtons = this.shadowRoot?.querySelectorAll<HTMLButtonElement>(".key")
		const draggableContainer: HTMLElement = this.shadowRoot?.querySelector(".draggable")!;
		const editor = this.shadowRoot?.querySelector<HTMLElement>(".editor")!
		const actionsElements = this.shadowRoot?.querySelectorAll<HTMLSelectElement>(".action")!
		const itemToDrag:HTMLElement = document?.querySelector("nub-keyboard")!;

		draggable(draggableContainer, itemToDrag)

		const fireAction = (index: number) => {
			const selectedAction = actionsElements[index].selectedOptions[0].label
			actions[selectedAction]()
		}

		toggleEditor?.addEventListener("pointerdown", () => {
			if (editor.style.display == 'flex') {
				editor.style.display = 'none'
			} else {editor.style.display = 'flex'}
		})
		document.addEventListener('keydown', (e) => {
			const index = keys.indexOf(e.key.toUpperCase())
			if (index > -1) {
				fireAction(index)
			}
		})
		keysButtons?.forEach(key => key.addEventListener('pointerdown', (event) => {
			const index = keys.indexOf(key.textContent!.toUpperCase())
			if (index > -1) {
				fireAction(index)
			}
		}))
	}
}
