document.addEventListener("DOMContentLoaded", function() {

    const rsvpForm = document.getElementById("rsvpForm");
    const rsvpTable = document
                        .getElementById("rsvpTable")
                        .getElementsByTagName("tbody")[0];

    // load existing rsvp from local storage
    const rsvps = JSON.parse(localStorage.getItem("rsvps")) || [];
    rsvps.forEach((rsvp, index) => addRsvpToTable(rsvp, index));

    rsvpForm.addEventListener("submit", function(e) {
        e.preventDefault();

        const name       = document.getElementById("name").value;
        const email      = document.getElementById("email").value;
        const attendance = document.getElementById("attendance").value;
        const guest      = document.getElementById("guest").value;
        const message    = document.getElementById("message").value;

        const rsvp = { name, email, attendance, guest, message };
        rsvps.push(rsvp);
        localStorage.setItem("rsvps", JSON.stringify(rsvps));

        addRsvpToTable(rsvp, rsvps.length - 1);
        rsvpForm.reset();

    });

    function addRsvpToTable(rsvp, index) {
        const row = rsvpTable.insertRow();

        row.insertCell(0).innerText = rsvp.name;
        row.insertCell(1).innerText = rsvp.email;
        row.insertCell(2).innerText = rsvp.attendance;
        row.insertCell(3).innerText = rsvp.guest;
        row.insertCell(4).innerText = rsvp.message;

        // add btn delete
        const deleteCell = row.insertCell(5);
        const deleteButton = document.createElement("button");

        deleteButton.innerText = "hapus";
        deleteButton.addEventListener("click", function() {
            deleteRsvp(index);
        });
        deleteCell.appendChild(deleteButton);
    }

    function deleteRsvp(index) {
        rsvps.splice(index, 1);
        localStorage.setItem("rsvps", JSON.stringify(rsvps));
        loadRsvpTable();
    }

    function loadRsvpTable() {
        rsvpTable.innerHTML = '';
        rsvps.forEach((rsvp, index) => addRsvpToTable(rsvp, index));
    }

    function deleteRsvp(index) {
        rsvps.splice(index, 1); // Remove the entry at the specified index
        localStorage.setItem("rsvps", JSON.stringify(rsvps)); // Update local storage
        loadRsvpTable(); // Reload the table
    }

    function loadRsvpTable() {
        rsvpTable.innerHTML = ''; // Clear existing rows
        rsvps.forEach((rsvp, index) => addRsvpToTable(rsvp, index));
    }

});