
import {Suite, expect} from "cynic"

import {Binds} from "./types.js"
import {emojis} from "./emojis.js"
import {parseBindings} from "./parse.js"

export default <Suite>{

	"action binds": async() => {
		const testChannel = (channel: keyof typeof emojis) => ({

			"bind with no content": async() => {
				const emoji = emojis[channel]
				const binds = <Binds>parseBindings(`
					${emoji} Benevolent ::
				`)[channel]
				expect(Object.keys(binds).length).equals(1)
			},

			"single bind": async() => {
				const emoji = emojis[channel]
				const binds = <Binds>parseBindings(`
					${emoji} Benevolent :: Alpha
				`)[channel]
				expect(Object.keys(binds).length).equals(1)
				const [a] = binds["Benevolent"] ?? []
				expect(a).equals("Alpha")
			},

			"two binds": async() => {
				const emoji = emojis[channel]
				const binds = <Binds>parseBindings(`
					${emoji} Benevolent :: Alpha Bravo
				`)[channel]
				const [a, b] = binds["Benevolent"] ?? []
				expect(a).equals("Alpha")
				expect(b).equals("Bravo")
			},

			"two binds with weird whitespace": async() => {
				const emoji = emojis[channel]
				const binds = <Binds>parseBindings(`
					${emoji}
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
			key: testChannel("key"),
			mouse: testChannel("mouse"),
			vector2: testChannel("vector2"),
		}
	},

	"action names are channel-scoped": async() => {
		const bindings = parseBindings(`
			🖱 benevolent :: alpha
			🕹️ benevolent :: bravo
		`)
		expect(bindings.mouse["benevolent"][0]).equals("alpha")
		expect(bindings.vector2["benevolent"][0]).equals("bravo")
	},

	"comments": {
		"simple one-liner": async() => {
			const comments = parseBindings(`👼 Cool Default Bindings`).comment

			expect(comments.length).equals(1)
			const [comment] = comments

			expect(typeof comment).equals("string")
			expect(comment).equals(" Cool Default Bindings")
		},

		"multi-line with spacing (whitespace is kept)": async() => {
			const rawComment = `
				Cool
					Default Bindings
			`
			const comments = parseBindings(`👼${rawComment}`).comment
			expect(comments.length).equals(1)
			const [comment] = comments
			expect(comment).equals(rawComment)
		},

		"two comments": async() => {
			const comments = parseBindings(`
				👼 alpha
				👼 bravo
			`).comment
			expect(comments.length).equals(2)
			const [a, b] = comments
			expect(a.trim()).equals("alpha")
			expect(b.trim()).equals("bravo")
		},
	},

	"throws errors when": {
		"text is empty": async() => {
			expect(() => parseBindings("")).throws()
		},

		"text has no emojis": async() => {
			expect(() => parseBindings(`benevolent :: alpha bravo`)).throws()
		},

		"bind action is missing": async() => {
			expect(() => parseBindings(`🕹️ :: alpha`)).throws()
			expect(() => parseBindings(`🕹️`)).throws()
		},

		"duplicate action in channel": async() => {
			expect(() => parseBindings(`
				🕹️ benevolent :: alpha
				🕹️ benevolent :: bravo
			`)).throws()
		},
	},
}
