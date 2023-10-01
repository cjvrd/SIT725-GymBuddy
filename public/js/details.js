// function to get first week after the last week that's labeled 'done=true' last
    // store week number
// function to get first day after the last day that's labeled 'done=true' last

$(document).ready(function () {
    
    // code for the tab buttons
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // deactivate all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));

            // activate clicked button and its corresponding pane
            button.classList.add('active');
            const targetPaneId = button.getAttribute('data-for');
            document.getElementById(targetPaneId).classList.add('active');
        });
    });

    // calculating status in for dynamic values in tab1 content
    var program = JSON.parse(localStorage.getItem('program'));
    var currentWeek = parseInt(localStorage.getItem('currentWeek'));
    var currentDay = parseInt(localStorage.getItem('currentDay'));

    var {totalDays} = calculateTotalDays(program);
    var {completedDays} = calculateCompletedDays(program);
    // replacing html element with the number of completed days
    var daysCompletedElement = document.querySelector(".progress-details > p:nth-child(2)");
    daysCompletedElement.textContent = `${completedDays} out of 12 days completed`;
    // replacing week number in status
    var weekElement = document.querySelector(".progress-details > p:nth-child(3)");
    weekElement.textContent = `Week: ${currentWeek}`;
    // replacing day number in status
    var dayElement = document.querySelector(".progress-details > p:nth-child(4)");
    dayElement.textContent = `Day: ${currentDay}`;

    // code for the progress bar
    // say we want to show a 50% progress.
    let progressPercentage = 100*(completedDays/totalDays);

    // set the height of the progress-bar
    let progressBar = document.querySelector('.progress-bar');
    progressBar.style.height = progressPercentage + "%";

    // update text (assuming it's a simple percentage, adjust as needed)
    let progressText = document.querySelector('.progress-text');
    progressText.innerHTML = "&nbsp;"+progressPercentage.toFixed(2) + " %";

    // redirecting to week page
    // target the the element with ID "tab1"
    const tab1 = document.getElementById('tab1');

    // add a click event listener to the #tab1 element
    tab1.addEventListener('click', function() {
        // Redirect to the desired page
        window.location.href = 'week1.html';
    });
});

function calculateTotalDays(program){
    let totalDays = 0;
    // calculating total days of workout
    program.weeks.map(week =>{
        totalDays += week.days.length;
    });
    return ({totalDays});
}

function calculateCompletedDays(program){
    let completedDays = 0;

    program.weeks.map(week =>{
        week.days.map(day => {
            if(day.done){
                completedDays++;
            }
        })
    })
    return {completedDays};
}


