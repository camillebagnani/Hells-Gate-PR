document.addEventListener("DOMContentLoaded", async function () {
   const response = await fetch("/api/lift/userLifts", {
      method: "GET",
      headers: {
         "Content-Type": "application/json",
      },
   });

   if (response.ok) {
      const liftData = await response.json();

      updateChart(liftData);
   } else {
      console.error(response.statusText);
   }
});

const formattedDate = (date) => {
   return new Date(date).toLocaleDateString();
};

function updateChart(liftData) {
   const filteredSquatData = liftData.filter((lift) => lift.title === "Squat" && lift.description.unit === "lbs");
   const squatXAxis = filteredSquatData.map((lift) => formattedDate(lift.createdAt));
   const squatYAxis = filteredSquatData.map((lift) => lift.description.weight);

   const ctxSquat = document.getElementById("squat-chart").getContext("2d");
   const squatChart = new Chart(ctxSquat, {
      type: "line",
      data: {
         labels: squatXAxis,
         datasets: [
            {
               label: "Squat",
               data: squatYAxis,
               backgroundColor: "rgb(141, 134, 225)",
               borderColor: "rgb(141, 134, 225)",
               borderWidth: 1,
            },
         ],
      },
      options: {
         scales: {
            y: {
               beginAtZero: true,
               title: {
                  display: true,
                  text: "Weight (lbs)", // Label for the y-axis
                  color: "rgb(84, 78, 163)",
               },
            },
            x: {
               title: {
                  display: true,
                  text: "Date Added", // Label for the x-axis
                  color: "rgb(84, 78, 163)",
               },
            },
         },
      },
   });

   const filteredBenchData = liftData.filter((lift) => lift.title === "Bench" && lift.description.unit === "lbs");
   const benchXAxis = filteredBenchData.map((lift) => formattedDate(lift.createdAt));
   const benchYAxis = filteredBenchData.map((lift) => lift.description.weight);

   const ctxBench = document.getElementById("bench-chart").getContext("2d");
   const benchChart = new Chart(ctxBench, {
      type: "line",
      data: {
         labels: benchXAxis,
         datasets: [
            {
               label: "Bench",
               data: benchYAxis,
               backgroundColor: "rgb(46, 156, 208)",
               borderColor: "rgb(46, 156, 208)",
               borderWidth: 1,
            },
         ],
      },
      options: {
         scales: {
            y: {
               beginAtZero: true,
               title: {
                  display: true,
                  text: "Weight (lbs)", // Label for the y-axis
                  color: "rgb(46, 156, 208)",
               },
            },
            x: {
               title: {
                  display: true,
                  text: "Date Added", // Label for the x-axis
                  color: "rgb(46, 156, 208)",
               },
            },
         },
      },
   });

   const filteredDeadliftData = liftData.filter((lift) => lift.title === "Deadlift" && lift.description.unit === "lbs");
   const deadliftXAxis = filteredDeadliftData.map((lift) => formattedDate(lift.createdAt));
   const deadliftYAxis = filteredDeadliftData.map((lift) => lift.description.weight);

   const ctxDeadlift = document.getElementById("deadlift-chart").getContext("2d");
   const deadliftChart = new Chart(ctxDeadlift, {
      type: "line",
      data: {
         labels: deadliftXAxis,
         datasets: [
            {
               label: "Deadlift",
               data: deadliftYAxis,
               backgroundColor: "rgba(255, 99, 132)",
               borderColor: "rgb(255, 99, 132)",
               borderWidth: 1,
            },
         ],
      },
      options: {
         scales: {
            y: {
               beginAtZero: true,
               title: {
                  display: true,
                  text: "Weight (lbs)", // Label for the y-axis
                  color: "rgb(230, 40, 58)",
               },
            },
            x: {
               title: {
                  display: true,
                  text: "Date Added", // Label for the x-axis
                  color: "rgb(230, 40, 58)",
               },
            },
         },
      },
   });
}
