
import {html} from "lit"
import {StateSetter, view} from "@chasemoskal/magical"

export const BindingsDialogView = view({}, use => ({
		keysPressed, setKeysPressed
	}: {
		keysPressed: string[]
		setKeysPressed: StateSetter<string[]>
	}) => {

	use.setup(() => () => {
		if (!keysPressed.length)
			setKeysPressed([])
	})

	return html`
		<div>
			<p>press desired key combination then press escape</p>
			<input value=${keysPressed.join(" ")} />
		</div>
	`
})
