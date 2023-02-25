
import {html, LitElement} from "lit"
import {property} from "lit/decorators.js"

import {Bindings} from "./types/bindings.js"
import {setupActionDomWiring} from "./dom-wiring.js"

export class NubContext2 extends LitElement {
	#dispose = () => {}
	#wiring: ReturnType<typeof setupActionDomWiring> | undefined

	#startListening() {
		if (this.#wiring)
			this.#dispose = this.#wiring.startListening()
	}

	get controller() { return this.#wiring?.controller }

	@property({type: Boolean})
	["events-on-window"]: boolean = false

	@property({type: String})
	["default-bindings"]: string = ""

	@property({type: String})
	["initial-modes"]: string = "default"

	connectedCallback() {
		super.connectedCallback()
		this.#startListening()
	}

	disconnectedCallback() {
		super.disconnectedCallback()
		this.#dispose()
		this.#dispose = () => {}
	}

	firstUpdated() {
		const defaultBindings: Bindings = JSON.parse(this["default-bindings"])
		const initialModes: string[] = this["initial-modes"]
			.split(/\s+/gm)
			.filter(s => s.length > 0)

		const eventTarget = this["events-on-window"]
			? window
			: this

		this.#wiring = setupActionDomWiring({
			initialModes,
			defaultBindings,
			eventDispatchingTarget: eventTarget,
			inputEventListeningTarget: eventTarget,
		})

		this.#startListening()
	}

	render() {
		return html`<slot></slot>`
	}
}
