import {StateSetter} from "@chasemoskal/magical/x/view/types.js"
import {Bindings} from "../../../types.js"
import { defaultBindings } from "../../context/parts/default-bindings.js";

export function listenForLocalStorageBindings(setBindings: StateSetter<Bindings>) {
	window.addEventListener('storage', () => {
		const savedBindings = localStorage?.getItem('bindings')!;
		const savedBindingsJSON:Bindings = JSON.parse(savedBindings)
		setBindings(savedBindingsJSON)
	})
}

export function loadLocalStorageBindings() {
	const savedBindings = localStorage?.getItem('bindings')!;
	const savedBindingsJSON:Bindings = JSON.parse(savedBindings)
	return savedBindingsJSON
}

export function loadDefaultBindings() {
	const bindings: Bindings = defaultBindings
	return bindings
}

export function loadBindings() {
	if (loadLocalStorageBindings()) {
		return loadLocalStorageBindings()
	}	else return loadDefaultBindings()
}
