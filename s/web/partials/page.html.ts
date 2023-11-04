
import {html, HtmlTemplate} from "xiome/x/toolbox/hamster-html/html.js"
import {WebsiteContext} from "xiome/x/toolbox/hamster-html/website/build-website-types.js"

import headBasicsHtml from "./head-basics.html.js"

export default ({
	v, mainContent,
	headContent,
	htmlClass = "",
	...options
}: WebsiteContext & {
	htmlClass?: string
	headContent?: HtmlTemplate
	mainContent?: HtmlTemplate
}) => html`

<!doctype html>
<html class="${htmlClass}">
<head>
	${headBasicsHtml({...options, v, title: "nubs"})}
	${html`
			<script
				type=importmap-shim
				src="${v("/importmap.json")}"
			></script>
			<script
				type=module-shim
				async
				src="${v("/html.js")}"
			></script>
			<script
				async
				src="/node_modules/es-module-shims/dist/es-module-shims.wasm.js"
			></script>
		`}
	${headContent}
</head>
<body>
	${mainContent}
</body>
`
