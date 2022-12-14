
import {html} from "lit"
import {MagicElement, mixinCss} from "@chasemoskal/magical"

import styles from "./styles.css.js"
import {property} from "lit/decorators.js"
import {printVector2} from "./parts/printing.js"
import {RecentKeyStats, Stats} from "./parts/types.js"
import {setupListeningToActionsAndRecordingStats} from "./parts/setup-listening-to-actions-and-recording-stats.js"

@mixinCss(styles)
export class NubVisualizer extends MagicElement {

	@property({type: String, reflect: true})
	name: string = "1"

	realize() {
		const {use} = this

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
	}
}
