const dynamicChartElement = document.getElementsByTagName("dynamic-chart");
const shadow = dynamicChartElement[0].shadowRoot;

function sliceDataFrom(data, startYear) {
  return data.slice(data.findIndex((row) => row[0].endsWith(startYear)));
}

class Drawdown {
  high; // Point
  low; // Point
  constructor(high, low) {
    this.high = high;
    this.low = low;
  }

  getDrawdownInPercent() {
    if (this.high.value && this.low.value) {
      return (this.low.value / this.high.value) - 1;
    }
  }
}

class Point {
  date;
  value;

  constructor(date, value) {
    this.date = date,
      this.value = value;
  }

  setPoint(newDate, newValue) {
    this.date = newDate;
    this.value = newValue;
  }
}

function calculateDrawdowns() {
  let allTimeHigh = new Point("", Number.NEGATIVE_INFINITY);
  let allTimeLow = new Point("", Number.POSITIVE_INFINITY);
  let drawdowns = []; // Drawdown[]

  return {
    write(date, newMoney) {
      // max drawdown
      if (allTimeHigh.value < newMoney) {
        if (allTimeLow.value !== Number.POSITIVE_INFINITY) {
          // there is an existing pair of all-time low and high
          // push exising pair to drawdown and create new all-time high
          drawdowns.push(new Drawdown(allTimeHigh, allTimeLow));
          allTimeHigh = new Point(date, newMoney);
          allTimeLow = new Point("", Number.POSITIVE_INFINITY);
        } else {
          // allTimeLow is still empty
          // allTimeHigh has no corresponding all-time low yet
          allTimeHigh.setPoint(date, newMoney);
        }
      } else if (allTimeLow.value > newMoney) {
        allTimeLow.setPoint(date, newMoney);
      }
    },
    get() {
      return drawdowns;
    }
  }
}


function calculateStrategy(data, startMoney = 10000, startYear = "1998") {
  const basis = sliceDataFrom(data, startYear);
  const output = [];

  let previousMoney = startMoney;
  const drawdowns = calculateDrawdowns()
  for (const [date, change, invested] of basis) {
    if (invested === "X") {
      const newMoney = (previousMoney * (1 + change / 100));
      drawdowns.write(date, newMoney);
      output.push(newMoney);
      previousMoney = newMoney;
    } else {
      output.push(previousMoney);
    }
  }
  return { strategyData: output.map((num) => num.toFixed(0)), drawdowns: drawdowns.get() };
}


function calculateSP(data, startMoney = 10000, startYear = "1998") {
  const basis = sliceDataFrom(data, startYear);
  const output = [];
  let previousMoney = startMoney;
  const drawdowns = calculateDrawdowns();

  for (const [date, change] of basis) {
    const newMoney = (previousMoney * (1 + change / 100));
    output.push(newMoney);
    previousMoney = newMoney;
    drawdowns.write(date, newMoney);
  }
  return { spData: output.map((num) => num.toFixed(0)), drawdowns: drawdowns.get() };
}

function debounce(delay = 500, handler) {
  let timeout;

  return (event) => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => handler(event), delay);
  };
}

function displayHtmlDrawdowns(spDrawdowns, strategyDrawdowns) {
  const spDrawdownElement = shadow.getElementById("sp-drawdown-element");
  const strategyDrawdownElement = shadow.getElementById("strategy-drawdown-element");

  spDrawdownElement.innerText = `${(Math.min(...spDrawdowns.map((dd) => dd.getDrawdownInPercent())) * 100).toFixed(1)} %`;
  strategyDrawdownElement.innerText = `${(Math.min(...strategyDrawdowns.map((dd) => dd.getDrawdownInPercent())) * 100).toFixed(1)} %`;
}

const indexIdNameMap = {
  dax: "DAX",
  nasdaq: "NASDAQ",
  "msci-world": "MSCI World",
  "msci-emerging": "MSCI Emerging",
  dow: "Dow Jones Industrial"
};

function dcIndices(startMoney = 10000, startIndex = 0) {
  return Object.entries(window.dcIndices).map(([indexId, changes]) => {
    if (startIndex)
      changes = changes.slice(startIndex);

    const data = [];
    let previousMoney = startMoney;
    changes.forEach((change) => {
      const newMoney = (previousMoney * (1 + change / 100));
      data.push(newMoney);
      previousMoney = newMoney;
    });
    return {
      name: indexIdNameMap[indexId],
      type: 'line',
      smooth: true,
      data: data.map((num) => num.toFixed(0))
    };
  });
}

// ENTRY POINT
(async function () {
  await import("/scripts/echarts.js");
  const data = await fetch("/data/20221119-data.json").then((res) => res.json());
  const chart = echarts.init(shadow.getElementById("interactive-chart"));

  const dataDescription = data.shift();
  const dates = data.map((row) => row[0]);

  const strategyName = 'inloopo S&P 500 Strategie';
  const buyAndHoldName = 'S&P 500';
  const legendData = [strategyName, buyAndHoldName, ...Object.keys(window.dcIndices).map((id) => indexIdNameMap[id])];
  const { spData, drawdowns: spDrawdowns } = calculateSP(data);
  const { strategyData, drawdowns: strategyDrawdowns } = calculateStrategy(data);

  displayHtmlDrawdowns(spDrawdowns, strategyDrawdowns);

  const options = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    },
    legend: {
      data: legendData
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: "category",
      data: dates,
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: strategyName,
        type: 'line',
        smooth: true,
        lineStyle: { color: '#ff6b35' },
        itemStyle: { color: '#ff6b35' },
        data: strategyData,
      },
      {
        name: buyAndHoldName,
        type: "line",
        smooth: true,
        data: spData,
      },
      ...dcIndices()
    ],
  };
  chart.setOption(options);
  const startMoneyControl = shadow.getElementById("start-money");

  startMoneyControl.addEventListener("change", (event) => {
    const newStartMoney = Number(event.target.value);
    const { spData, drawdowns } = calculateSP(
      data,
      newStartMoney || undefined,
      startYearControl.value || undefined
    );
    const { strategyData, drawdowns: strategyDrawdowns } = calculateStrategy(
      data,
      newStartMoney || undefined,
      startYearControl.value || undefined
    );
    displayHtmlDrawdowns(spDrawdowns, strategyDrawdowns);

    // TODO: check if it is NaN
    const newOptions = {
      ...options,
      xAxis: {
        type: "category",
        data: sliceDataFrom(data, startYearControl.value).map((row) => row[0]),
      },
      series: [
        {
          name: strategyName,
          type: 'line',
          smooth: true,
          lineStyle: { color: '#ff6b35' },
          itemStyle: { color: '#ff6b35' },
          data: strategyData,
        },
        {
          name: buyAndHoldName,
          type: 'line',
          smooth: true,
          data: spData,
        },
        ...dcIndices(newStartMoney)
      ],
    };
    chart.setOption(newOptions);
  });

  const yearPicker = shadow.getElementById("year-picker");
  const startYearControl = shadow.getElementById("start-year");

  yearPicker.addEventListener("click", function (event) {
    startYearControl.value = event.target.dataset.value;
    startYearControl.dispatchEvent(new CustomEvent("change", { detail: event.target.dataset.value }));
  });


  startYearControl.addEventListener(
    "change",
    debounce(600, (event) => {
      // hide year-picker list
      startYearControl.blur();
      const year = event.detail;
      const startIndex = data.findIndex((row) => row[0].endsWith(year)); // picks first trading day of selected year

      if (startIndex > -1) {
        const { spData, drawdowns: spDrawdowns } = calculateSP(
          data,
          Number(startMoneyControl.value) || undefined,
          year
        );
        const { strategyData, drawdowns: strategyDrawdowns } = calculateStrategy(
          data,
          Number(startMoneyControl.value) || undefined,
          year
        );

        displayHtmlDrawdowns(spDrawdowns, strategyDrawdowns);


        const newOptions = {
          ...options,
          xAxis: {
            type: "category",
            data: sliceDataFrom(data, year).map((row) => row[0]),
          },
          series: [
            {
              name: strategyName,
              type: 'line',
              smooth: true,
              lineStyle: { color: '#ff6b35' },
              itemStyle: { color: '#ff6b35' },
              data: strategyData,
            },
            {
              name: buyAndHoldName,
              type: "line",
              smooth: true,
              data: spData,
            },
            ...dcIndices(Number(startMoneyControl.value), startIndex)
          ],
        };
        chart.setOption(newOptions);
      }
    })
  );
})();
