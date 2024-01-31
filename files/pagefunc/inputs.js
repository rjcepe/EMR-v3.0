///////////// checkbox / texbox 
// onchange="toggleTextbox(this, 'Id of Textbox')" 
// also add disable in textbox

// enable textbox
function toggleTextbox(checkbox, textboxID) {
    var textbox = document.getElementById(textboxID);
    textbox.disabled = !checkbox.checked;
  }

// disable textbox
function toggleTextbox1(checkbox, textboxID) {
    var textbox = document.getElementById(textboxID);
    textbox.disabled = checkbox.checked;
  }


//////////////////course n section 

//cons rec
function updateCourses() {
    var collegeSelect = document.getElementById('college');
    var courseSelect = document.getElementById('course');
    var collegeSelect1 = document.getElementById('college1');
    var courseSelect1 = document.getElementById('course1');
    var selectedCollege = collegeSelect.value;
    var selectedCollege1 = collegeSelect1.value;

    // Object containing courses for each college
    var courses = {
        'cbaa': [
            'BOM',
            'BSA',
            'BSM',
            'ECO',
            'ENR',
            'HRD',
            'MKA',
        ],
        'ccje': ['CRI', 'BFS',],
        'coe': [
            'BEC',
            'BSE',
            'SNE',
            'BPE',
        ],
        'ceat': [
            'ARC',
            'CEE',
            'CPE',
            'EEE',
            'ECE',
            'ESE',
            'IEE',
            'MEE',
            'MMA',
        ],
        'clac': [
            'BSY',
            'CDM',
            'COM',
            'DMJ',
            'IDS',
            'PHI',
            'PSC',
            'PSY',
        ],
        'cscs': [
            'APM',
            'BCS',
            'BIO',
            'BIT',
            'MEB',
        ],
        'cthm': ['BHM', 'BTM',],
        'shs': ['STEM', 'ABM', 'HUMMS', 'ICT'],
    };

    // Clear previous options
    courseSelect.options.length = 0;
    courseSelect1.options.length = 0;

    
    // Add a placeholder
    courseSelect.options.add(new Option("--Select a Course--", ""));
    courseSelect1.options.add(new Option("--Select a Course--", ""));


    // Append new options
    if (selectedCollege && courses[selectedCollege]) {
        courses[selectedCollege].forEach(function(course) {
            courseSelect.options.add(new Option(course, course));
        });
    }
    if (selectedCollege1 && courses[selectedCollege1]) {
        courses[selectedCollege1].forEach(function(course) {
            courseSelect1.options.add(new Option(course, course));
        });
    }
    
}

//med rec
function updateCourses1() {
    var collegeSelect = document.getElementById('college2');
    var courseSelect = document.getElementById('course2');
    var selectedCollege = collegeSelect.value;

    var collegeSelect1 = document.getElementById('college3');
    var courseSelect1 = document.getElementById('course3');
    var selectedCollege1 = collegeSelect1.value;

    // Object containing courses for each college
    var courses = {
        'cbaa': [
            'BOM',
            'BSA',
            'BSM',
            'ECO',
            'ENR',
            'HRD',
            'MKA',
        ],
        'ccje': ['CRI', 'BFS',],
        'coe': [
            'BEC',
            'BSE',
            'SNE',
            'BPE',
        ],
        'ceat': [
            'ARC',
            'CEE',
            'CPE',
            'EEE',
            'ECE',
            'ESE',
            'IEE',
            'MEE',
            'MMA',
        ],
        'clac': [
            'BSY',
            'CDM',
            'COM',
            'DMJ',
            'IDS',
            'PHI',
            'PSC',
            'PSY',
        ],
        'cscs': [
            'APM',
            'BCS',
            'BIO',
            'BIT',
            'MEB',
        ],
        'cthm': ['BHM', 'BTM',],
        'shs': ['STEM', 'ABM', 'HUMMS', 'ICT'],
    };

    // Clear previous options
    courseSelect.options.length = 0;
    
    // Add a placeholder
    courseSelect.options.add(new Option("--Select a Course--", ""));

    // Append new options
    if (selectedCollege && courses[selectedCollege]) {
        courses[selectedCollege].forEach(function(course) {
            courseSelect.options.add(new Option(course, course));
        });
    }


    // Clear previous options
    courseSelect1.options.length = 0;
    
    // Add a placeholder
    courseSelect1.options.add(new Option("--Select a Course--", ""));

    // Append new options
    if (selectedCollege1 && courses[selectedCollege1]) {
        courses[selectedCollege1].forEach(function(course) {
            courseSelect1.options.add(new Option(course, course));
        });
    }
    
}