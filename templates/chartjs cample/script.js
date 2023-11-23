// Select the canvas element from the DOM
const ctx = document.getElementById('myChart').getContext('2d');

// Create the chart
const myChart = new Chart(ctx, {
    type: 'line', // You can change this to 'bar', 'pie', etc.
    data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [{
            label: 'Number of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: 'rgba(255, 206, 86, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)', // Line color
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    color: 'green' // Y-axis label colors
                }
            },
            x: {
                ticks: {
                    color: 'blue' // X-axis label colors
                }
            }
        },
        plugins: {
            legend: {
                labels: {
                    color: 'purple' // Legend label colors
                }
            },
            title: {
                display: true,
                text: 'Custom Chart.js Example',
                color: 'blue', // Title text color
                font: {
                    size: 18
                }
            }
        }
    }
});
