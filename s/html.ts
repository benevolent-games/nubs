
import {registerElements, themeElements} from "@chasemoskal/magical"

import {getElements} from "./get-elements.js"
import {NubModesEvent} from "./events/modes.js"
import {NubCauseEvent} from "./events/cause.js"
import {themeCss} from "./framework/theme.css.js"
import {NubEffectEvent} from "./events/effect.js"
import {NubBindingsEvent} from "./events/bindings.js"

registerElements(themeElements(themeCss, getElements()))

function log(event: CustomEvent) {
	console.log(event.type, event.detail)
}

NubCauseEvent
	.target(window)
	.listen(log)

NubEffectEvent
	.target(window)
	.listen(log)

NubModesEvent
	.target(window)
	.listen(log)

NubBindingsEvent
	.target(window)
	.listen(log)
