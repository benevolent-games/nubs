
import {html} from "lit"
import {property} from "lit/decorators.js"
import {MagicElement, mixinCss} from "@chasemoskal/magical"

import {styles} from "./style.css.js"
import {setBindings} from "./parts/set-bindings.js"
import {bindingsStore} from "./parts/bindings-store.js"
import {makeActionsMemory} from "./parts/actions-memory.js"
import {fallbackBindings} from "./parts/fallback-bindings.js"
import {Bindings, BindingsStore} from "../../bindings/types.js"
import {getDefaultBindings} from "./parts/get-default-bindings.js"
import {translateInputEventsToActionEvents} from "./parts/translate-input-events-to-action-events.js"

@mixinCss(styles)
export class NubContext extends MagicElement {

	get #defaultBindings() { return getDefaultBindings(this) }

	#actions = makeActionsMemory()
	#bindings: Bindings = fallbackBindings
	#store: BindingsStore | undefined

	@property()
	name: string = ""

	@property()
	defaultBindingsJson: Bindings | undefined

	@property()
	["default-bindings"] = ""

	get actions() { return this.#actions.readable }

	@property({attribute: false})
	get bindings(): Bindings { return this.#bindings }
	set bindings(newBindings) {
		const oldBindings = this.#bindings
		this.#bindings = newBindings
		setBindings({
			newBindings,
			oldBindings,
			element: this,
			store: this.#store,
		})
	}

	restoreBindingsToDefaults = () => {
		this.bindings = this.#defaultBindings
	}

	firstUpdated() {
		super.firstUpdated()
		this.#store = bindingsStore(localStorage, this.name)
		this.bindings = this.#store.load() ?? this.#defaultBindings
	}

	realize() {
		const {bindings} = this
		const handleInput = bindings
			? translateInputEventsToActionEvents({
				bindings,
				element: this,
				actions: this.#actions.writable,
			})
			: () => console.warn("nub_input before bindings are set")

		return html`<slot @nub_input=${handleInput}></slot>`
	}
}
