
import {getElements, themeElements, registerElements, themeCss} from "./main.js"

registerElements(
	themeElements(themeCss, getElements())
)
