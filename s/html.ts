
import {getElements, themeElements, registerElements, themeCss, NubAction, NubInput} from "./main.js"

registerElements(
	themeElements(themeCss, getElements())
)

document.addEventListener(NubAction.eventName, e => {
	const event = <NubAction>e
	console.log(NubAction.eventName, event.detail)
})

// document.addEventListener(NubInput.eventName, e => {
// 	const event = <NubInput>e
// 	console.log(NubInput.eventName, event.detail)
// })
