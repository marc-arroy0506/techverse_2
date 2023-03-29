let qChart = null;
let sChart = null;
let bChart = null;

const qualityChart = (data = "29/70") => {
  //extracting the data from the string
  let [numerator, denominator] = data.split("/");
  numerator = parseInt(numerator);
  denominator = parseInt(denominator);

  if (qChart) qChart.destroy();

  qChart = new Chart(document.getElementById("quality-chart"), {
    type: "doughnut",
    data: {
      datasets: [
        {
          backgroundColor: ["#3e95cd", "white"],
          data: [
            (numerator / denominator) * 100,
            100 - (numerator / denominator) * 100,
          ],
        },
      ],
    },
    options: {
      elements: {
        arc: {
          borderWidth: 0,
        },
      },
    },
  });
};

qualityChart();

const strengthChart = (data = -50) => {
  if (sChart) sChart.destroy();
  sChart = new Chart(document.getElementById("strength-chart"), {
    type: "doughnut",
    data: {
      datasets: [
        {
          backgroundColor: ["red", "green"],
          data: [-data, 100 + data],
        },
      ],
    },
    options: {
      elements: {
        arc: {
          borderWidth: 0,
        },
      },
    },
  });
};
strengthChart();

const bitrateChart = (data) => {
  let datastr = [];
  for (let i = 0; i < data.length; i++) {
    datastr.push(data[i].split(" ")[0]);
  }
  let labels = [];

  let dataint = [];
  for (let i = 0; i < datastr.length; i++) {
    dataint.push(parseInt(datastr[i]));
    labels.push(i);
  }
  if (bChart) bChart.destroy();

  bChart = new Chart(document.getElementById("bitrate-chart"), {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "MB/s",
          backgroundColor: [
            "#3e95cd",
            "#8e5ea2",
            "#3cba9f",
            "#e8c3b9",
            "#c45850",
          ],
          data: dataint,
        },
      ],
    },
    options: {
      indexAxis: "y",
      legend: {
        display: false,
        labels: {
          fontSize: 0,
        },
      },
      title: {
        display: false,
        text: "",
      },
    },
  });
};
bitrateChart([
  "1 Mb/s",
  "2 Mb/s",
  "5.5 Mb/s",
  "11 Mb/s",
  "9 Mb/s",
  "18 Mb/s",
  "36 Mb/s",
  "54 Mb/s",
  "6 Mb/s",
  "12 Mb/s",
  "24 Mb/s",
  "48 Mb/s",
]);
