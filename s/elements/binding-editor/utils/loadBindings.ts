import {Bindings} from "../../../types.js"
import { defaultBindings } from "../../context/parts/default-bindings.js";

export function loadBindings() {
	const savedBindings = localStorage?.getItem('bindings')!;
	const savedBindingsJSON: Bindings = JSON.parse(savedBindings)
	const bindings: Bindings = defaultBindings
	if (savedBindings) {
		return savedBindingsJSON
	}	else return bindings
}
