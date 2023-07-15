
import {Suite, expect} from "cynic"
import {migrate_versions} from "./elements/context/bindings/utils/migrate_versions.js"

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
}
