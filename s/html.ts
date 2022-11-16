
import {getElements, themeElements, registerElements, themeCss, NubInput} from "./main.js"

registerElements(
	themeElements(themeCss, getElements())
)

document.addEventListener(NubInput.eventName, e => {
	const event = <NubInput>e
	console.log(NubInput.eventName, event.detail)
})
