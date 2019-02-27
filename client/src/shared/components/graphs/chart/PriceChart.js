import React from "react";
import { VictoryChart, VictoryTheme, VictoryLine } from "victory";

const PriceChart = ({ data }) =>
    <VictoryChart
        theme={VictoryTheme.material}
        animate={{duration: 600}}>
        <VictoryLine data={data}/>
    </VictoryChart>

export { PriceChart }