import {component2 as element} from "@chasemoskal/magical/x/component.js"
import {html} from "lit"
import {Nub, NubInput} from "../../main.js"
import {Bindings} from "../../types.js"
import { styles } from "./style.css.js"
import {loadBindings} from "./utils/loadBindings.js"

export const NubBindingEditor = element<{bindingsJson: Bindings | void}>({
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
		e.preventDefault()
		const action = keybindsEntries[index][0]
		const {target} = <any>e
		setIsListeningForKey(true)
		setSelectedKeyBindIndex(indexOfKeyBind)
		setAction(action)
		target.setAttribute("selected", "")
	}
	const addNewKeyBind = (e: PointerEvent, index: number) => {
		e.preventDefault()
		const {target} = <any>e
		const action = keybindsEntries[index][0]
		const indexOfAddBindButton = use.element.shadowRoot?.querySelectorAll('.binds-row')[index].childElementCount! - 1
		setIsListeningForKey(true)
		setSelectedKeyBindIndex(indexOfAddBindButton)
		setAction(action)
		target.setAttribute("selected", "")
	}
	const listenForKey = () => {
		document.addEventListener("nub_input", (e) => {
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
			setIsListeningForKey(false)
		}})
	}

	if (isListeningForKey) {
		listenForKey()
	}

	return html`
	<div class="column">
		<h1>Binding editor</h1>
		<div class="row">
			<div class="actions">
				${keybindsEntries.map(value => html`<div>${value[0]}</div>`)}
			</div>
			<div class="binds-column">
				${keybindsEntries.map((value, i) => html`
				<div class="binds-row">
					${value[1].map(keyBinds => keyBinds.map((keyBind, indexOfKeyBind) => html`
					<div @pointerdown=${(e: PointerEvent) => handleKeyChange(e, i, indexOfKeyBind)} class="bind">
						<span class="key">${keyBind == '' ? html`-` : keyBind}</span>
						<span class="info-key">press key</span>
					</div>`))}
					<div @pointerdown=${(e: PointerEvent) => addNewKeyBind(e, i)} class="add-bind">
						<span class="add-key">+</span>
						<span  class="info-key">press key</span>
					</div>
				</div>`)}
			</div>
		</div>
	</div>
	`
})
