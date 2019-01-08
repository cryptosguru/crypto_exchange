import React, { PureComponent } from "react";
import { VictoryChart, VictoryTheme, VictoryLine } from "victory";

export class PriceChart extends PureComponent {
    render() {
        return (
            <VictoryChart
                theme={VictoryTheme.material}
                animate={{duration: 600}}>
                <VictoryLine data={this.props.data}/>
            </VictoryChart>
        )
    }
}