
import {html, LitElement} from "lit"
import {property} from "lit/decorators.js"

import {Bindings} from "../../actions/types/bindings.js"
import {NubInputEvent} from "../../events/input.js"
import {BindingsStore} from "../../actions/bindings-store.js"
import {setupActionDomWiring} from "../../actions/dom-wiring.js"
import {fallbackBindings} from "../../actions/parts/fallback-bindings.js"
import {ActionController} from "../../actions/types/action-controller.js"
import {parseBindings} from "../../actions/parse-bindings.js"

export class NubContext extends LitElement {
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

		const initialModes: string[] = this["initial-modes"]
			.split(/\s+/gm)
			.filter(s => s.length > 0)

		controller.bindings = (
			store.bindings
				?? parseBindings(this["default-bindings"])
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
