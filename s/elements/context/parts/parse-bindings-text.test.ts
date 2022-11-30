
import {Suite, expect} from "cynic"
import {ActionBinds, Bindings} from "../../../types.js"
import {parseBindingsText} from "./parse-bindings-text.js"

// channels: 👼 🖱 🕹️ *️⃣

export default <Suite>{

	"can process nothing": async() => {
		const bindings = parseBindingsText("")
		expect(bindings)
			.ok()
	},

	"action binds": async() => {
		const testChannel = (channel: keyof Bindings) => ({

			"bind with no content": async() => {
				const binds = <ActionBinds>parseBindingsText(`
					${channel} Benevolent ::
				`)[channel]
				expect(Object.keys(binds).length).equals(1)
			},

			"single bind": async() => {
				const binds = <ActionBinds>parseBindingsText(`
					${channel} Benevolent :: Alpha
				`)[channel]
				expect(Object.keys(binds).length).equals(1)
				const [a] = binds["Benevolent"] ?? []
				expect(a).equals("Alpha")
			},

			"two binds": async() => {
				const binds = <ActionBinds>parseBindingsText(`
					${channel} Benevolent :: Alpha Bravo
				`)[channel]
				const [a, b] = binds["Benevolent"] ?? []
				expect(a).equals("Alpha")
				expect(b).equals("Bravo")
			},

			"two binds with weird whitespace": async() => {
				const binds = <ActionBinds>parseBindingsText(`
					${channel}
						Benevolent
							::
							Alpha  Bravo  
				`)[channel]
				const [a, b] = binds["Benevolent"] ?? []
				expect(a).equals("Alpha")
				expect(b).equals("Bravo")
			},
		})

		return {
			"*️⃣": testChannel("*️⃣"),
			"🖱": testChannel("🖱"),
			"🕹️": testChannel("🕹️"),
		}
	},

	"action names are channel-scoped": async() => {
		const bindings = parseBindingsText(`
			🖱 benevolent :: alpha
			🕹️ benevolent :: bravo
		`)
		expect(bindings["🖱"]["benevolent"][0]).equals("alpha")
		expect(bindings["🕹️"]["benevolent"][0]).equals("bravo")
	},

	"👼 comments": async() => {
		function parseComments(text: string) {
			return parseBindingsText(text)["👼"]
		}

		return {
			"simple one-liner": async() => {
				const comments = parseComments(`👼 Cool Default Bindings`)
				expect(comments.length).equals(1)
				const [comment] = comments
				expect(typeof comment).equals("string")
				expect(comment).equals(" Cool Default Bindings")
			},

			"one-liner with spacing (whitespace is kept)": async() => {
				const rawComment = `
					Cool
						Default Bindings
				`
				const comments = parseComments(`👼${rawComment}`)
				expect(comments.length).equals(1)
				const [comment] = comments
				expect(comment).equals(rawComment)
			},

			"two comments": async() => {
				const comments = parseComments(`
					👼 alpha
					👼 bravo
				`)
				expect(comments.length).equals(1)
				const [a, b] = comments
				expect(a.trim()).equals("alpha")
				expect(b.trim()).equals("bravo")
			},
		}
	},

	"fails gracefully when": {
		"text has no emojis": async() => {
			expect(() => parseBindingsText(`benevolent :: alpha bravo`)).throws()
		},

		"bind action is missing": async() => {
			expect(() => parseBindingsText(`🕹️ :: alpha`)).throws()
			expect(() => parseBindingsText(`🕹️`)).throws()
		},

		"duplicate action in channel": async() => {
			expect(() => parseBindingsText(`
				🕹️ benevolent :: alpha
				🕹️ benevolent :: bravo
			`)).throws()
		},
	},
}
