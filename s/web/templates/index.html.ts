
import {html} from "xiome/x/toolbox/hamster-html/html.js"
import {WebsiteContext} from "xiome/x/toolbox/hamster-html/website/build-website-types.js"

import pageHtml from "../partials/page.html.js"

const urls = {
	github: "https://github.com/benevolent-games/nubs",
	website: "https://benevolent.games/"
}

export default (context: WebsiteContext) => pageHtml({
	...context,
	mainContent: html`
		<header>
		<h1><span>🔘</span> nubs</h1>
		<p>user-input system for web games</p>
		<p>
			see on <a href="${urls.github}">github</a>..
			a <a href="${urls.website}">benevolent.games</a> project..
		</p>
		<button onclick="localStorage.clear(); location.reload()">
			reset
		</button>
		</header>

		<nub-context default-bindings="
			👼 Cool Default Bindings
			🖱 look :: lookmouse
			🕹️ look :: lookstick
			🕹️ move :: movestick
			*️⃣ forward :: KeyW ArrowUp
			*️⃣ backward :: KeyS ArrowDown
			*️⃣ leftward :: KeyA ArrowLeft
			*️⃣ rightward :: KeyD ArrowRight
			*️⃣ jump :: Space
			*️⃣ use :: KeyF Mouse3
			*️⃣ primary :: Mouse1
			*️⃣ secondary :: Mouse2
			">

			<nub-real-keyboard></nub-real-keyboard>
			<nub-real-mouse name=lookmouse></nub-real-mouse>

			<nub-grid-menu></nub-grid-menu>
			<nub-gridboard layout=compact></nub-gridboard>

			<div class=side-by-side>
				<nub-stick name=lookstick></nub-stick>
				<nub-visualizer></nub-visualizer>
			</div>

			<nub-editor></nub-editor>
		</nub-context>
	`,
})
