
import {themeElements} from "@chasemoskal/magical/x/theme-elements.js"
import {registerElements} from "@chasemoskal/magical/x/register-elements.js"

import themeCss from "./framework/theme.css.js"
import {NubStick} from "./components/stick/component.js"

console.log("hello!")

registerElements(
	themeElements(themeCss, {
		NubStick,
	})
)

console.log("hello 2")
