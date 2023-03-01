
import {html, LitElement} from "lit"
import {property} from "lit/decorators.js"

import {clone} from "../../tools/clone.js"
import {NubModesEvent} from "../../events/modes.js"
import {Bindings} from "./bindings/types/bindings.js"
import {NubEffectEvent} from "../../events/effect.js"
import {NubBindingsEvent} from "../../events/bindings.js"
import {BindingsStore} from "./bindings/bindings_store.js"
import {set_initial_modes} from "./utils/set_initial_modes.js"
import {initially_load_bindings_from_storage} from "./utils/initially_load_bindings_from_storage.js"

import {setup_effects_and_lookups} from "./setups/setup_effects_and_lookups.js"
import {setup_modes_and_handle_changes} from "./setups/setup_modes_and_handle_changes.js"
import {setup_bindings_and_handle_changes} from "./setups/setup_bindings_and_handle_changes.js"
import {setup_cause_and_effect_translation} from "./setups/setup_cause_and_effect_translation.js"

export class NubContext extends LitElement {

	#effects = setup_effects_and_lookups()

	#modes = setup_modes_and_handle_changes(modes =>
		NubModesEvent
			.target(this)
			.dispatch({modes})
	)

	#bindings = setup_bindings_and_handle_changes(bindings =>
		NubBindingsEvent
			.target(this)
			.dispatch({bindings})
	)

	#bindings_store = new BindingsStore(localStorage)

	#translate = setup_cause_and_effect_translation({
		modes: this.#modes.readable,
		effects: this.#effects.writable,
		get_current_bindings: () => this.#bindings.bindings,
		on_effect: detail =>
			NubEffectEvent
				.target(this)
				.dispatch(detail),
	})

	get effects() {
		return this.#effects.lookups
	}

	get modes() {
		return this.#modes.writable
	}

	get bindings() {
		return clone(this.#bindings.bindings)
	}

	set bindings(b: Bindings) {
		this.#bindings_store.bindings = b
		this.#bindings.bindings = b
	}

	@property({type: String})
	["name"]: string = "default"

	@property({type: String})
	["initial-modes"]: string = "default"

	firstUpdated() {
		set_initial_modes(this.#modes.writable, this["initial-modes"])
		initially_load_bindings_from_storage(
			this.#bindings,
			this.#bindings_store,
			this["name"]
		)
	}

	render() {
		return html`
			<slot @nub_cause=${this.#translate}></slot>
		`
	}
}
