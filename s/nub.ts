
import {themeElements} from "@chasemoskal/magical/x/theme-elements.js"
import {registerElements} from "@chasemoskal/magical/x/register-elements.js"

import {NubInput} from "./events/nub-input.js"
import {NubStick} from "./components/stick/component.js"
import {NubContext} from "./components/context/component.js"
import {NubGridboard} from "./components/gridboard/component.js"
import {NubRealPointer} from "./components/real-pointer/component.js"

import themeCss from "./framework/theme.css.js"

registerElements(
	themeElements(themeCss, {
		NubStick,
		NubContext,
		NubGridboard,
		NubRealPointer,
	})
)

document.addEventListener(NubInput.eventName, e => {
	const event = <NubInput>e
	console.log(NubInput.eventName, event.detail)
})
