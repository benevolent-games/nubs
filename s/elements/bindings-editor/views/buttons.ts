import {html} from "lit"
import {view} from "@chasemoskal/magical/x/view/view.js"
import {Bindings} from "../../../types.js"
import {compareKeybindings} from "../utils/compare-keybindings.js"
import {StateSetter} from "@chasemoskal/magical/x/view/types.js"
import {loadBindings} from "../utils/loadBindings.js"

export const ButtonsView = view(use => (keybinds: Bindings, setKeybinds: StateSetter<Bindings>) => {

	const applyBindings = () => {
		localStorage.setItem('bindings', JSON.stringify(keybinds));
		setKeybinds(loadBindings())
		window.dispatchEvent(new Event("storage"));
	}
	const restoreToDefault = () => {
		localStorage.removeItem('bindings')
		setKeybinds(loadBindings())
	}

	const isEqual = compareKeybindings(keybinds)

	return html`
		<div class="buttons-container">
			<button ?disabled=${isEqual} @pointerdown=${applyBindings}>Apply bindings</button>
			<button @pointerdown=${restoreToDefault}>Restore to default</button>
		</div>`

})
