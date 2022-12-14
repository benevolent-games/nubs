
import {html} from "lit"
import {property} from "lit/decorators.js"
import {MagicElement, mixinCss} from "@chasemoskal/magical"

import {styles} from "./style.css.js"
import {parseBindings} from "../../bindings/parse.js"
import {bindingsStore} from "./parts/bindings-store.js"
import {NubBindingsEvent} from "../../events/bindings.js"
import {defaultBindings} from "./parts/default-bindings.js"
import {makeActionsMemory} from "./parts/actions-memory.js"
import {Bindings, BindingsStore} from "../../bindings/types.js"
import {translateInputEventsToActionEvents} from "./parts/translate-input-events-to-action-events.js"

@mixinCss(styles)
export class NubContext extends MagicElement {
	
	@property()
	name: string = ""

	@property()
	defaultBindingsJson: Bindings | undefined

	@property()
	["default-bindings"] = ""

	get defaultBindings() {
		return this.defaultBindingsJson
			?? (this["default-bindings"]
				? parseBindings(this["default-bindings"])
				: null)
			?? defaultBindings
	}

	#actions = makeActionsMemory()
	#bindings: Bindings = defaultBindings
	#store: BindingsStore | undefined

	get actions() { return this.#actions.readable }

	@property({attribute: false})
	get bindings(): Bindings { return this.#bindings }
	set bindings(bindings) {
		const oldBindings = this.#bindings
		this.#bindings = bindings

		if (this.#store)
			this.#store.save(bindings)
		else
			console.warn("bindings set before store ready")

		this.requestUpdate("bindings", oldBindings)

		NubBindingsEvent
			.target(this)
			.dispatch({bindings})
	}

	firstUpdated() {
		super.firstUpdated()
		this.#store = bindingsStore(localStorage, this.name)
		this.bindings = this.#store.load() ?? this.defaultBindings
	}

	restoreBindingsToDefaults = () => {
		this.bindings = this.defaultBindings
	}

	realize() {
		const {actions, bindings} = this

		const handleInput = bindings
			? translateInputEventsToActionEvents({
				actions,
				bindings,
				element: this,
			})
			: () => console.warn("nub_input before bindings are set")

		return html`<slot @nub_input=${handleInput}></slot>`
	}
}
