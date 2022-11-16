
import {themeElements} from "@chasemoskal/magical/x/theme-elements.js"
import {registerElements} from "@chasemoskal/magical/x/register-elements.js"

import {getElements} from "./main.js"
import {NubInput} from "./events/nub-input.js"

import themeCss from "./framework/theme.css.js"

registerElements(
	themeElements(themeCss, getElements())
)

document.addEventListener(NubInput.eventName, e => {
	const event = <NubInput>e
	console.log(NubInput.eventName, event.detail)
})
