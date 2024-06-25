document.addEventListener("DOMContentLoaded", function() {
    const students = ["Ali Hassan", "Hafiz Zohaib", "Jawwad", "Arsalan", "Faisal", "Adeel", "Fahad", "Abdullah"];
    const currentDate = new Date().getDate();
    const studentsContainer = document.querySelector(".students");

    students.forEach(student => {
        const studentDiv = document.createElement("div");
        studentDiv.className = "student";
        studentDiv.id = `student${student.replace(' ', '')}`;

        const studentName = document.createElement("h2");
        studentName.textContent = student;
        studentDiv.appendChild(studentName);

        const datesDiv = document.createElement("div");
        datesDiv.className = "dates";

        const dateDiv = document.createElement("div");
        dateDiv.className = "date";
        dateDiv.innerHTML = `
            <label for="${student}-${currentDate}">${currentDate}:</label>
            <input type="radio" name="${student}-${currentDate}" value="present"> Present
            <input type="radio" name="${student}-${currentDate}" value="absent"> Absent
        `;
        datesDiv.appendChild(dateDiv);

        studentDiv.appendChild(datesDiv);
        studentsContainer.appendChild(studentDiv);
    });
});

function generateReport() {
    const students = ["Ali Hassan", "Hafiz Zohaib", "Jawwad", "Arsalan", "Faisal", "Adeel", "Fahad", "Abdullah"];
    const currentDate = new Date().getDate();
    let presentStudents = [];
    let absentStudents = [];

    students.forEach(student => {
        const presentRadio = document.querySelector(`input[name="${student}-${currentDate}"][value="present"]`);
        const absentRadio = document.querySelector(`input[name="${student}-${currentDate}"][value="absent"]`);

        if (presentRadio && presentRadio.checked) {
            presentStudents.push(student);
        } else if (absentRadio && absentRadio.checked) {
            absentStudents.push(student);
        }
    });

    const reportDiv = document.getElementById("report");
    reportDiv.innerHTML = `
        <h2>Attendance Report for July ${currentDate}</h2>
        <p>Total Students: ${students.length}</p>
        <p>Present Today: ${presentStudents.length}</p>
        <p>Absent Today: ${absentStudents.length}</p>
        <h3>Present Students:</h3>
        <ul>${presentStudents.map(student => `<li>${student}</li>`).join('')}</ul>
        <h3>Absent Students:</h3>
        <ul>${absentStudents.map(student => `<li>${student}</li>`).join('')}</ul>
    `;

    document.getElementById("copyButton").style.display = "block";

    // Save the attendance to localStorage
    localStorage.setItem(`attendance-${currentDate}`, JSON.stringify({ present: presentStudents, absent: absentStudents }));
}

function copyReport() {
    const report = document.getElementById("report").innerText;
    const textarea = document.createElement("textarea");
    textarea.value = report;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    alert("Report copied to clipboard!");
}
