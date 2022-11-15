
import {themeElements} from "@chasemoskal/magical/x/theme-elements.js"
import {registerElements} from "@chasemoskal/magical/x/register-elements.js"

import {NubInput} from "./events/nub-input.js"
import {NubStick} from "./components/stick/component.js"

import themeCss from "./framework/theme.css.js"

registerElements(
	themeElements(themeCss, {
		NubStick,
	})
)

document.addEventListener("nub_input", e => {
	const event = <NubInput>e
	console.log("NUB INPUT", event.detail)
})
