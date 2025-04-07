const API_URL = "http://localhost:5000/students";

async function fetchStudents() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Failed to fetch students");
        const students = await response.json();

        const studentList = document.getElementById("studentList");
        studentList.innerHTML = "";

        students.forEach(student => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${student.name}</td>
                <td>${student.age}</td>
                <td>${student.grade}</td>
                <td>${student.marks}</td>
                <td>
                    <button class="btn btn-danger btn-sm" onclick="deleteStudent('${student._id}')">❌ Delete</button>
                    <button class="btn btn-warning btn-sm" onclick="openEditModal('${student._id}', '${student.name}', ${student.age}, '${student.grade}', ${student.marks})">✏️ Edit</button>
                </td>
            `;
            studentList.appendChild(row);
        });
    } catch (error) {
        console.error("Error fetching students:", error);
        alert("Failed to load students. Please check your server.");
    }
}

document.getElementById("studentForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const student = {
        name: document.getElementById("name").value.trim(),
        age: parseInt(document.getElementById("age").value.trim()),
        grade: document.getElementById("grade").value.trim(),
        marks: parseFloat(document.getElementById("marks").value.trim()),
    };

    try {
        const response = await fetch(API_URL + "/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(student),
        });

        if (!response.ok) throw new Error("Failed to add student");

        alert("Student Added Successfully!");
        document.getElementById("studentForm").reset();
        fetchStudents();
    } catch (error) {
        console.error("Error adding student:", error);
        alert("An error occurred while adding the student.");
    }
});

async function deleteStudent(id) {
    if (confirm("Are you sure you want to delete this student?")) {
        try {
            const response = await fetch(`${API_URL}/delete/${id}`, { method: "DELETE" });

            if (!response.ok) throw new Error("Failed to delete student");

            alert("Student Deleted!");
            fetchStudents();
        } catch (error) {
            console.error("Error deleting student:", error);
            alert("An error occurred while deleting the student.");
        }
    }
}

function openEditModal(id, name, age, grade, marks) {
    document.getElementById("editId").value = id;
    document.getElementById("editName").value = name;
    document.getElementById("editAge").value = age;
    document.getElementById("editGrade").value = grade;
    document.getElementById("editMarks").value = marks;

    const editModal = new bootstrap.Modal(document.getElementById("editModal"));
    editModal.show();
}

document.getElementById("editForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const id = document.getElementById("editId").value;
    const updatedStudent = {
        name: document.getElementById("editName").value.trim(),
        age: parseInt(document.getElementById("editAge").value.trim()),
        grade: document.getElementById("editGrade").value.trim(),
        marks: parseFloat(document.getElementById("editMarks").value.trim()),
    };

    try {
        const response = await fetch(`${API_URL}/update/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedStudent),
        });

        if (!response.ok) throw new Error("Failed to update student");

        alert("Student Updated Successfully!");
        
        const editModal = bootstrap.Modal.getInstance(document.getElementById("editModal"));
        editModal.hide();

        fetchStudents();
    } catch (error) {
        console.error("Error updating student:", error);
        alert("An error occurred while updating the student.");
    }
});

document.getElementById("search").addEventListener("keyup", function () {
    const filter = this.value.toLowerCase().trim();
    const rows = document.querySelectorAll("#studentList tr");

    rows.forEach(row => {
        const name = row.cells[0].textContent.toLowerCase();
        row.style.display = name.includes(filter) ? "" : "none";
    });
});

fetchStudents();
