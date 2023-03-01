
import {html} from "xiome/x/toolbox/hamster-html/html.js"
import {WebsiteContext} from "xiome/x/toolbox/hamster-html/website/build-website-types.js"

import pageHtml from "../partials/page.html.js"

const urls = {
	github: "https://github.com/benevolent-games/nubs",
	website: "https://benevolent.games/",
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

		<nub-context>
			<nub-keyboard></nub-keyboard>
		</nub-context>
	`,
})
