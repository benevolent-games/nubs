
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
		<div class=dialog>
			<div>
				<p>press desired key combination then press ESCAPE</p>
				<input value=${keysPressed.join(" + ")} />
			</div>
		</div>
	`
})
