document.addEventListener("DOMContentLoaded", function() {

    const rsvpForm = document.getElementById("rsvpForm");
    const rsvpTable = document
                        .getElementById("rsvpTable")
                        .getElementsByTagName("tbody")[0];

    // load existing rsvp from local storage
    const rsvps = JSON.parse(localStorage.getItem("rsvps")) || [];
    rsvps.forEach((rsvp, index) => addRsvpToTable(rsvp, index));

    function submitHandler(e) {
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
    }

    rsvpForm.addEventListener("submit", submitHandler);

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

        // add btn edit
        const editCell = row.insertCell(6);
        const editButton = document.createElement("button");

        editButton.innerText = "edit";
        editButton.addEventListener("click", function() {
            editRsvp(index);
        });
        editCell.appendChild(editButton);
    }

    function deleteRsvp(index) {
        rsvps.splice(index, 1);
        localStorage.setItem("rsvps", JSON.stringify(rsvps));
        loadRsvpTable();
    }

    function editRsvp(index) {
        const rsvp = rsvps[index];

        document.getElementById("name").value = rsvp.name;
        document.getElementById("email").value = rsvp.email;
        document.getElementById("attendance").value = rsvp.attendance;
        document.getElementById("guest").value = rsvp.guest;
        document.getElementById("message").value = rsvp.message;

        rsvpForm.removeEventListener("submit", submitHandler);
        rsvpForm.addEventListener("submit", function updateHandler(e) {
            e.preventDefault();

            rsvp.name = document.getElementById("name").value;
            rsvp.email = document.getElementById("email").value;
            rsvp.attendance = document.getElementById("attendance").value;
            rsvp.guest = document.getElementById("guest").value;
            rsvp.message = document.getElementById("message").value;

            rsvps[index] = rsvp;
            localStorage.setItem("rsvps", JSON.stringify(rsvps));

            loadRsvpTable();
            rsvpForm.reset();

            rsvpForm.removeEventListener("submit", updateHandler);
            rsvpForm.addEventListener("submit", submitHandler);
        });
    }

    function loadRsvpTable() {
        rsvpTable.innerHTML = '';
        rsvps.forEach((rsvp, index) => addRsvpToTable(rsvp, index));
    }

});