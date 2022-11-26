import {StateSetter} from "@chasemoskal/magical/x/view/types.js"
import {Bindings} from "../../../types.js"
import { defaultBindings } from "../../context/parts/default-bindings.js";

export function listenForStorageEventsToUpdateBindings(window: Window, setBindings: StateSetter<Bindings>) {
	const listener = () => {
		const savedBindings = localStorage?.getItem('bindings')!;
		const savedBindingsJSON:Bindings = JSON.parse(savedBindings)
		setBindings(savedBindingsJSON)
	}
	window.addEventListener('nub_bindings', listener)
	return () => window.removeEventListener("storage", listener)
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
