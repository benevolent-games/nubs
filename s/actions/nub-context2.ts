
import {html, LitElement} from "lit"
import {property} from "lit/decorators.js"

import {Bindings} from "./types/bindings.js"
import {NubInputEvent} from "../events/input.js"
import {BindingsStore} from "./bindings-store.js"
import {setupActionDomWiring} from "./dom-wiring.js"
import {fallbackBindings} from "./parts/fallback-bindings.js"
import {ActionController} from "./types/action-controller.js"

export class NubContext2 extends LitElement {
	#controller: ActionController
	#store = new BindingsStore(localStorage)
	#handleInput: (event: NubInputEvent) => void

	get controller() { return this.#controller }

	constructor() {
		super()
		const wiring = setupActionDomWiring(this)
		this.#controller = wiring.controller
		this.#handleInput = wiring.handleInputEventAndEmitActions
	}

	@property({type: String, reflect: true})
	["name"]: string = "default"

	@property({type: String})
	["default-bindings"]: string | undefined

	@property({type: String})
	["initial-modes"]: string = "default"

	firstUpdated() {
		const store = this.#store
		const controller = this.#controller

		store.name = this["name"]

		const defaultBindings: Bindings = this["default-bindings"]
			? JSON.parse(this["default-bindings"])
			: undefined

		const initialModes: string[] = this["initial-modes"]
			.split(/\s+/gm)
			.filter(s => s.length > 0)

		controller.bindings = (
			store.bindings
				?? defaultBindings
				?? fallbackBindings
		)

		controller.modes.assign(initialModes)
	}

	setBindings(b: Bindings) {
		this.#store.bindings = b
		this.#controller.bindings = b
	}

	render() {
		return html`
			<slot @nub_input=${this.#handleInput}></slot>
		`
	}
}
