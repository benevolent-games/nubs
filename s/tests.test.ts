
import {Suite, expect} from "cynic"

import {converter_1} from "./elements/context/bindings/converters/1.js"
import {Bindings1, Bindings2} from "./elements/context/bindings/types/bindings.js"
import {migrate_versions} from "./elements/context/bindings/utils/migrate_versions.js"
import {detect_bindings_version} from "./elements/context/bindings/utils/detect_bindings_version.js"

export default <Suite>{
	"version migrator": {

		"calls the converter": async() => {
			let called_v1_converter = false

			const converters = new Map()
				.set(1, () => { called_v1_converter = true })

			migrate_versions<any>({converters, version: 1, data: {}})
			
			expect(called_v1_converter).ok()
		},

		"actually converts the data": async() => {
			const converters = new Map()
				.set(1, (a: number) => a += 1)
			const result = migrate_versions<number>({converters, version: 1, data: 100})
			expect(result.data).equals(101)
			expect(result.version).equals(2)
		},

		"calls converters from 2 to 4": async() => {
			const called = new Map()

			const converters = new Map()
				.set(1, () => { called.set(1, true) })
				.set(2, () => { called.set(2, true) })
				.set(3, () => { called.set(3, true) })
				.set(4, () => { called.set(4, true) })

			migrate_versions<any>({converters, version: 2, data: {}})

			expect(called.get(1)).not.ok()
			expect(called.get(2)).ok()
			expect(called.get(3)).ok()
			expect(called.get(4)).ok()
		},

	},
	"detecting bindings versions": {

		"can detect version of bindings1": async () => {
			const test_bindings = {
				humanoid: {
					pointer: {
						look: ["Pointer", "Lookpad"],
					},
					key: {
						open_menu: ["KeyQ", "Backquote"],
					},
				},
				menu: {
					key: {
						close_menu: ["KeyQ", "Backquote"],
					},
				},
			} satisfies Bindings1
			
			const version = detect_bindings_version(test_bindings)
			expect(version).equals(1)
		},

		"can detect version from modern bindings (v2 and up)": async () => {
			const test_bindings = {
				version: 2,
				modes: {
					humanoid: {
						pointer: {
							look: [["Pointer"], ["Lookpad"]],
						},
						key: {
							open_menu: [["KeyQ"], ["Backquote"]],
						},
					},
					menu: {
						key: {
							close_menu: [["KeyQ"], ["Backquote"]],
						},
					},
				}
			} satisfies Bindings2

			const version = detect_bindings_version(test_bindings)
			expect(version).equals(2)
		},

	},
	"bindings converters": {

		"bindings 1 to 2": {

			"can convert empty bindings1 to bindings2": async () => {
				const b1: Bindings1 = {}
				const b2 = converter_1(b1)
				const modes_array = Object.entries(b2.modes)

				expect(modes_array.length).equals(0)
			},

			"can convert ordinary bindings1 to bindings2": async () => {
				const test_bindings = {
					humanoid: {
						pointer: {
							look: ["Pointer", "Lookpad"],
						},
						key: {
							open_menu: ["KeyQ", "Backquote"],
						},
					},
					menu: {
						key: {
							close_menu: ["KeyQ", "Backquote"],
						},
					},
				} satisfies Bindings1

				const b2 = converter_1(test_bindings)
				expect(b2.version).equals(2)
			},

		},

	},
}
