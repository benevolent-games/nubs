
import {Bindings} from "./bindings.js"
import {WritableSet} from "../../tools/regulated-set/types/writable-set.js"

export type ActionController = {
	bindings: Bindings
	readonly modes: WritableSet<string>
}
