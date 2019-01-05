import React, { Component } from "react";
import { VictoryChart, VictoryTheme, VictoryStack } from "victory";

export class PriceChart extends Component {
    render() {
        const formattedData = this.props.data
            .map((price) => {
                return {
                    x: new Date(price.timestamp),
                    y: ( parseFloat(price.low) + parseFloat(price.high)) / 2
                }
            })
        return (
            <VictoryChart
                theme={VictoryTheme.material}
                animate={{duration: 1000}}
            >
                <VictoryStack>

                </VictoryStack>
            </VictoryChart>
        )
    }
}