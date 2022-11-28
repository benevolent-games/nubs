
import {html} from "lit"
import {component2 as element} from "@chasemoskal/magical/x/component.js"

import {styles} from "./style.css.js"
import {NubInput} from "../../main.js"
import {Bindings, Nub} from "../../types.js"
import {ButtonsView} from "./views/buttons.js"
import {KeybindsView} from "./views/keybinds.js"
import {loadBindings} from "./utils/loadBindings.js"
import {stateForClosestContext} from "./utils/state-for-closest-context.js"

export const NubBindingsEditor = element<{bindingsJson: Bindings | void}>({
		styles,
		shadow: true,
		properties: {
			bindingsJson: {type: Object, reflect: false},
		},
	}).render(use => {

	const [context] = use.state(
		stateForClosestContext(use.element)
	)

	const [bindings] = use.state<Bindings>(() => {
		return context.getBindings()
	})

	const [waitingForAssignment, setWaitingForAssignment] = use.state(() => ({
		action: "forward"
	}))

	const [action, setAction] = use.state("")
	const [isListeningForKey, setIsListeningForKey] = use.state(false)
	const [keybinds, setKeybinds] = use.state<Bindings>(loadBindings())
	const [selectedKeyBindIndex, setSelectedKeyBindIndex] = use.state(0)

	const keybindsEntries = Object.entries(keybinds["*️⃣"])

	const handleKeyChange = (
			e: PointerEvent,
			index: number,
			indexOfKeyBind: number
		) => {
		if (isListeningForKey)
			return
		e.preventDefault()
		const action = keybindsEntries[index][0]
		const {target} = <any>e
		setIsListeningForKey(true)
		setSelectedKeyBindIndex(indexOfKeyBind)
		setAction(action)
		target.setAttribute("selected", "")
	}

	const addNewKeyBind = (e: PointerEvent, index: number) => {
		if (isListeningForKey)
			return
		e.preventDefault()
		const {target} = <any>e
		const action = keybindsEntries[index][0]
		const indexOfAddBindButton = (
			use.element
				.shadowRoot
				?.querySelectorAll(".keybinds")[index]
				.childElementCount!
		) - 1
		setIsListeningForKey(true)
		setSelectedKeyBindIndex(indexOfAddBindButton)
		setAction(action)
		target.setAttribute("selected", "")
	}

	const listenForKey = (e: any) => {
		const event = <NubInput<Nub.Detail.Key>>e
		if (event.detail.type == Nub.Type.Key) {
			const selectedKey = use.element.shadowRoot?.querySelector("[selected]")
			const codes = [...keybinds["*️⃣"][action]]
			codes[selectedKeyBindIndex] = event.detail.code
			setKeybinds({
				...keybinds,
				"*️⃣": {
					...keybinds["*️⃣"],
					[action]: codes,
				}
			})
			selectedKey?.removeAttribute("selected")
			setIsListeningForKey(false)
			document.removeEventListener("nub_input", listenForKey)
		}
	}

	if (isListeningForKey) {
		document.addEventListener("nub_input", listenForKey)
	}

	return html`
		<div class=column>
			<h1>Binding editor</h1>
			<div class=row>
				${keybindsEntries.map((value, i) => html`
					<div class=container>
						<div class=action>${value[0]}</div>
						${KeybindsView(
							value,
							i,
							handleKeyChange,
							addNewKeyBind,
						)}
					</div>
				`)}
			</div>
			${ButtonsView(keybinds, setKeybinds, use.element)}
		</div>
	`
})
