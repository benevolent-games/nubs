
import {Getter} from "../../../../../framework/types/getter.js"
import {Setter} from "../../../../../framework/types/setter.js"
import {Bindings} from "../../../../context/bindings/types/bindings.js"

export type GuiOptions = {
	bindingsDraft: Bindings
	setBindingsDraft: Setter<Bindings>
	getBindingsDraft: Getter<Bindings>

	availableModes: string[]
	getMode: () => string
	setMode: (mode: string) => void

	listenForCauseEventsOn: EventTarget
}
