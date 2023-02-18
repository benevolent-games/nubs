
import {parseControls} from "./parse.js"

const example = `

      PROFESSIONAL KEYBIND ENSEMBLE
     for true archlinux vim hackers
           ~~~~~~~~~~~~~~~~
             ~ by chase ~
                  ~

----------------------------------------

==>humanoid<==
	=mouse=
		:look mouse
	=joystick=
		:look left-stick
		:move right-stick
	=keyboard=
		:menu KeyQ Tab
		:forth KeyE ArrowUp
		:back KeyD ArrowDown
		:left KeyS ArrowLeft
		:right KeyF ArrowRight
		:jump Space
		:use KeyG Mouse3
		:primary Mouse1
		:secondary Mouse2

==>main-menu<==
	=keyboard=
		:back KeyQ
		:settings KeyW
		:keybinds KeyE
		:profiling KeyR
`

const result = parseControls(example)
console.log("result", result)
