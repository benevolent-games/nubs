
import {html, LitElement} from "lit"
import {property} from "lit/decorators.js"

import {Bindings} from "./bindings/types/bindings.js"
import {set_initial_modes} from "./utils/set_initial_modes.js"
import {Bindings_Controller} from "./bindings/bindings_controller.js"

import {NubModesEvent} from "../../events/modes.js"
import {NubEffectEvent} from "../../events/effect.js"
import {NubBindingsEvent} from "../../events/bindings.js"

import {BindingsSchema} from "./bindings/types/bindings-schema.js"
import {setup_modes_and_handle_changes} from "./setups/setup_modes_and_handle_changes.js"
import {setup_effects_and_readable_proxy} from "./setups/setup_effects_and_readable_proxy.js"
import {setup_cause_and_effect_translation} from "./setups/setup_cause_and_effect_translation.js"

export class NubContext extends LitElement {

	@property({type: String})
	["name"]: string = "default"

	@property({type: String})
	["initial-modes"]: string = "humanoid"

	@property({type: String, reflect: true})
	modes: string = ""

	get effects() {
		return this.#effects.readable
	}

	get schema() {
		return this.#bindings_controller.schema
	}

	set schema(schema: BindingsSchema) {
		this.#bindings_controller.schema = schema
	}

	get bindings() {
		return this.#bindings_controller.bindings
	}

	set bindings(b: Bindings) {
		this.#bindings_controller.bindings = b
	}

	reset_bindings_to_defaults() {
		this.#bindings_controller.bindings = this.#bindings_controller.defaults
	}

	modes_set = setup_modes_and_handle_changes(modes => {
		this.modes = modes.array().join(" ")
		NubModesEvent
			.target(this)
			.dispatch({modes})
	})

	#bindings_controller = new Bindings_Controller({
		storage: localStorage,
		on_bindings_change: bindings =>
			NubBindingsEvent
				.target(this)
				.dispatch({bindings}),
	})

	#effects = setup_effects_and_readable_proxy()

	#translate = setup_cause_and_effect_translation({
		modes: this.modes_set.readable,
		effects: this.#effects.writable,
		get_current_bindings: () => this.#bindings_controller.bindings,
		dispatch_effect: detail =>
			NubEffectEvent
				.target(this)
				.dispatch(detail),
	})

	firstUpdated() {
		set_initial_modes(this.modes_set, this["initial-modes"])
		this.#bindings_controller.storage_key = "nub_bindings_" + this["name"]
		this.#bindings_controller.load_from_storage()
	}

	render() {
		return html`
			<slot @nub_cause=${this.#translate}></slot>
		`
	}
}
