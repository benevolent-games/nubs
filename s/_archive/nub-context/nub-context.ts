import {styles} from "./style.css.js"
import {keys} from "../nub-keyboard/utils/keys.js"
import {noop as html} from "../tools/template-noop.js"
import {dispatchCustomEvent} from "../nub-keyboard/utils/dispatchCustomEvent.js"

export class NubContext extends HTMLElement {
	shadow = this.attachShadow({
		mode: "open",
		delegatesFocus: false,
	})

	constructor() {
		super()
		let editable = false
		this.shadow.innerHTML = html`
		<div>
		<button class="flip">flip mode</button>
		<slot>
		</slot>
		</div>
		`
		const style = document.createElement("style")
		style.textContent = styles
		this.shadowRoot?.append(style)
		const flipButton = this.shadowRoot?.querySelector<HTMLElement>(".flip")
		const nubContext = document.querySelector("nub-context")
		nubContext?.addEventListener("nub-input", (e: any) => {
			const detail = e.detail
			if (detail?.actionName) {
			dispatchCustomEvent(this, detail.actionName)
			}
		})
		nubContext?.addEventListener("nub-action", (e: any) => {
			console.log(e.detail)
		})
		// this.prepare({
		// 	storage: window.localStorage,
		// 	actions: {
		// 		forward: "Button"
		// 	},
		// 	defaultBinds: {
		// 		forward: ["W", "e"]
		// 	}
		// })
		flipButton?.addEventListener("pointerdown", () => {
			if (this.hasAttribute('edit-mode')) {
				this.removeAttribute("edit-mode")
			} else {
				this.setAttribute("edit-mode", "")
			}
		})
	}
	prepare({storage, actions, defaultBinds}: {
		storage: Storage,
		actions: {
			[key: string]: string
		},
		defaultBinds: {
			[key: string]: string[]
		}
	}) {
		console.log(actions, defaultBinds)
		for (const [actionName, defaultKey] of Object.entries(defaultBinds)) {
			defaultKey.map(key => {
				if (keys[key.toUpperCase()]) {
					keys[key.toUpperCase()].actionName = actionName
				}
			})
		}
	}
}
