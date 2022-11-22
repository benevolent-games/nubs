import {component2 as element} from "@chasemoskal/magical/x/component.js"
import {html} from "lit"
import {Nub, NubInput} from "../../main.js"
import {Bindings} from "../../types.js"
import { styles } from "./style.css.js"
import {loadBindings} from "./utils/loadBindings.js"
import {ActionsView} from "./views/actions.js"
import {ButtonsView} from "./views/buttons.js"
import {KeybindsView} from "./views/keybinds.js"

export const NubBindingsEditor = element<{bindingsJson: Bindings | void}>({
	styles,
	shadow: true,
	properties: {
		bindingsJson: {type: Object, reflect: false},
	},
}).render(use => {

	const [isListeningForKey, setIsListeningForKey] = use.state(false)
	const [action, setAction] = use.state('')
	const [selectedKeyBindIndex, setSelectedKeyBindIndex] = use.state(0)
	const [keybinds, setKeybinds] = use.state<Bindings>(loadBindings())
	const keybindsEntries = Object.entries(keybinds['*️⃣'])

	const handleKeyChange = (e: PointerEvent, index: number, indexOfKeyBind: number) => {
		if(isListeningForKey) return 
		e.preventDefault()
		const action = keybindsEntries[index][0]
		const {target} = <any>e
		setIsListeningForKey(true)
		setSelectedKeyBindIndex(indexOfKeyBind)
		setAction(action)
		target.setAttribute("selected", "")
	}
	const addNewKeyBind = (e: PointerEvent, index: number) => {
		if(isListeningForKey) return 
		e.preventDefault()
		const {target} = <any>e
		const action = keybindsEntries[index][0]
		const indexOfAddBindButton = use.element.shadowRoot?.querySelectorAll('.keybinds')[index].childElementCount! - 1
		setIsListeningForKey(true)
		setSelectedKeyBindIndex(indexOfAddBindButton)
		setAction(action)
		target.setAttribute("selected", "")
	}

	const listenForKey = (e: any) => {
		const event = <NubInput<Nub.Detail.Key>>e
		if (event.detail.type == 0) {
			const selectedKey = use.element.shadowRoot?.querySelector('[selected]')
			const replacedKey = [...keybinds['*️⃣'][action][0]]
			replacedKey[selectedKeyBindIndex] = event.detail.code
			setKeybinds({
				...keybinds,
				'*️⃣': {
					...keybinds["*️⃣"],
					[action]: [replacedKey]
				}
			})
			selectedKey?.removeAttribute('selected')
			setIsListeningForKey(false) // this setter not working 
			document.removeEventListener("nub_input", listenForKey)
		}
	}

	if (isListeningForKey) {
		document.addEventListener("nub_input", listenForKey)
	}

	return html`
		<div class="column">
			<h1>Binding editor</h1>
			<div class="row">
				${keybindsEntries.map((value, i) => html`
				<div class="container">
					${ActionsView(value)}
					${KeybindsView(value, i, handleKeyChange, addNewKeyBind)}
				</div>`)}
			</div>
			${ButtonsView(keybinds, setKeybinds)}
		</div>
	`
})
