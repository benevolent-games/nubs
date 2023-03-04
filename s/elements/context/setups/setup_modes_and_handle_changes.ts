
import {RegulatedSet} from "../../../tools/regulated-set/regulated-set.js"
import {OnSetChange} from "../../../tools/regulated-set/types/on-set-change.js"

export const setup_modes_and_handle_changes =
	(onChange: OnSetChange<string>) =>
		new RegulatedSet(new Set<string>(), onChange)
