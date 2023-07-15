
import {Setter} from "../../../../framework/types/setter.js"
import {Bindings} from "../../../context/bindings/types/bindings.js"

export type TextOptions = {
	bindingsDraft: Bindings
	setBindingsDraft: Setter<Bindings>
}
