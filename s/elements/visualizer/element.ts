
import {html} from "lit"
import {component2 as element} from "@chasemoskal/magical/x/component.js"

import styles from "./styles.css.js"
import {printVector2} from "./parts/printing.js"
import {RecentKeyStats, Stats} from "./parts/types.js"
import {setupListeningToActionsAndRecordingStats} from "./parts/setup-listening-to-actions-and-recording-stats.js"

export const NubVisualizer = element<{
		name: string
	}>({
		styles,
		shadow: true,
		properties: {
			name: {type: String, reflect: true},
		},
	}).render(use => {

	const [recentKeyStats, setRecentKeyStats, getRecentKeyStats] = (
		use.state<RecentKeyStats>({})
	)

	const [statsForMouse, setStatsForMouse] = (
		use.state<Stats.Mouse>(() => ({
			movement: [0, 0],
			position: [0, 0],
		}))
	)

	const [statsForVector2, setStatsForVector2] = (
		use.state<Stats.Vector2>(() => ({
			vector: [0, 0],
		}))
	)

	use.setup(setupListeningToActionsAndRecordingStats({
		eventTarget: window,
		getRecentKeyStats,
		setRecentKeyStats,
		setStatsForMouse,
		setStatsForVector2,
	}))

	return html`
		<div class=coordinatesbar>
			<p>
				<strong>mouse  </strong>
				<span>${printVector2(statsForMouse.movement)}</span>
				<span>${printVector2(statsForMouse.position)}</span>
			</p>
			<p>
				<strong>vector2</strong>
				<span>${printVector2(statsForVector2.vector)}</span>
			</p>
		</div>
		<ul class=keystats>
			${Object
				.entries(recentKeyStats)
				.filter(([,stats]) => stats.detail.pressed)
				.map(([action, stats]) => html`
					<li data-action="${action}">
						<strong>${action}</strong>
						<span>${stats.detail.code}</span>
					</li>
				`)}
		</ul>
	`
})
