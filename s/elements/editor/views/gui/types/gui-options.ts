
import {Getter} from "../../../../../framework/types/getter.js"
import {Setter} from "../../../../../framework/types/setter.js"
import {Bindings2} from "../../../../context/bindings/types/bindings.js"

export type GuiOptions = {
	bindingsDraft: Bindings2
	setBindingsDraft: Setter<Bindings2>
	getBindingsDraft: Getter<Bindings2>

	availableModes: string[]
	getMode: () => string
	setMode: (mode: string) => void

	listenForCauseEventsOn: EventTarget
}
