
import {parse_modes_string} from "./parse_modes_string.js"
import {WritableSet} from "../../../tools/regulated-set/types/writable-set.js"

export function set_initial_modes(
		modes: WritableSet<string>,
		initial_modes: string,
	) {

	modes.add(...parse_modes_string(initial_modes))
}
