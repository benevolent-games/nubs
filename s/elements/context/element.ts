
import {html} from "lit"
import {property} from "lit/decorators.js"
import {MagicElement, mixinCss} from "@chasemoskal/magical"

import {styles} from "./style.css.js"
import {NubBindingsEvent} from "../../main.js"
import {parseBindings} from "../../bindings/parse.js"
import {defaultBindings} from "./parts/default-bindings.js"
import {makeActionsMemory} from "./parts/actions-memory.js"
import {Bindings, BindingsStore} from "../../bindings/types.js"
import {stateForBindingsStore} from "./parts/state-for-bindings-store.js"
import {translateInputEventsToActionEvents} from "./parts/translate-input-events-to-action-events.js"

@mixinCss(styles)
export class NubContextAlpha extends MagicElement {
	
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
	#bindings: Bindings | undefined
	#store: BindingsStore | undefined

	get actions() { return this.#actions.readable }

	@property({attribute: false})
	get bindings(): Bindings | undefined { return this.#bindings }
	set bindings(newBindings) {
		const oldBindings = this.#bindings
		this.#bindings = newBindings

		if (this.#store)
			this.#store.save(newBindings)
		else
			console.warn("bindings set before store ready")

		this.requestUpdate("bindings", oldBindings)

		NubBindingsEvent
			.target(this)
			.dispatch({bindings: newBindings})
	}

	firstUpdated() {
		super.firstUpdated()
		this.#store = stateForBindingsStore(localStorage, this.name)()
		this.#bindings = this.#store.load() ?? this.defaultBindings
	}

	restoreBindingsToDefaults() {
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

// export type NubContext = InstanceType<typeof NubContext>

// export const NubContext = element<NubContextProperties>({
// 		styles,
// 		shadow: true,
// 		properties: {
// 			name: {type: String, reflect: true},
// 			defaultBindingsJson: {attribute: false},
// 			"default-bindings": {type: String},

// 			actions: {attribute: false},
// 			getBindings: {attribute: false},
// 			updateBindings: {attribute: false},
// 			restoreBindingsToDefaults: {attribute: false},
// 		},
// 	}).render(use => {

// 	const [actions] =
// 		use.state(stateForActions)

// 	const [{save, load}] =
// 		use.state(
// 			stateForBindingsStore(localStorage, use.element.name)
// 		)

// 	const [bindings, setBindings, getBindings] =
// 		use.state<Bindings>(
// 			element => load()
// 				?? element.defaultBindingsJson
// 				?? (element["default-bindings"]
// 					? parseBindings(element["default-bindings"])
// 					: null)
// 				?? defaultBindings
// 		)

// 	use.setup(
// 		setupContextElementFunctions({
// 			save,
// 			getBindings,
// 			setBindings,
// 		})
// 	)

// 	const handleInput = translateInputEventsToActionEvents({
// 		actions,
// 		bindings,
// 		element: use.element,
// 	})

// 	return html`<slot @nub_input=${handleInput}></slot>`
// })
