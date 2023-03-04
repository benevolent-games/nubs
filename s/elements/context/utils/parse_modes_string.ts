
export const parse_modes_string = (modes: string) =>
	modes
		.split(/\s+/gm)
		.filter(s => s.length > 0)
