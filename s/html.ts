
import {registerElements, themeElements} from "@chasemoskal/magical"

import {getElements} from "./get-elements.js"
import {themeCss} from "./framework/theme.css.js"

registerElements(themeElements(themeCss, getElements()))
