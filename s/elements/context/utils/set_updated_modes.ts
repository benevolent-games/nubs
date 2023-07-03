
import {parse_modes_string} from "./parse_modes_string.js"
import {WritableSet} from "../../../tools/regulated-set/types/writable-set.js"

export function set_updated_modes(
		modes: WritableSet<string>,
		updated_modes: string,
	) {

	modes.assign(parse_modes_string(updated_modes))
}
