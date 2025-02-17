document.addEventListener("DOMContentLoaded", function () {
    let contacts = [];
    let isViewing = false; 

    document.getElementById("addContact").addEventListener("click", function () {
        let name = document.getElementById("name").value.trim();
        let email = document.getElementById("email").value.trim();
        let phone = document.getElementById("phone").value.trim();

        if (name === "" || email === "" || phone === "") {
            alert("Please fill all fields!");
            return;
        }

        contacts.push({ name, email, phone });
        alert("Contact added successfully!");
        resetForm();

        if (isViewing) {
            displayContacts(); 
        }
    });

    document.getElementById("viewContacts").addEventListener("click", function () {
        isViewing = true; 
        displayContacts();
        document.getElementById("contactListContainer").style.display = "block";
    });

    function displayContacts() {
        if (!isViewing) return; 

        let contactList = document.getElementById("contactList");
        contactList.innerHTML = "";

        contacts.forEach((contact, index) => {
            let div = document.createElement("div");
            div.classList.add("contact");
            div.innerHTML = `
                <span>${contact.name} - ${contact.email} - ${contact.phone}</span>
                <div class="buttons">
                    <button class="edit" onclick="editContact(${index})">Edit</button>
                    <button class="delete" onclick="deleteContact(${index})">Delete</button>
                </div>
            `;
            contactList.appendChild(div);
        });
    }

    window.editContact = function (index) {
        document.getElementById("name").value = contacts[index].name;
        document.getElementById("email").value = contacts[index].email;
        document.getElementById("phone").value = contacts[index].phone;
        document.getElementById("editIndex").value = index;

        document.getElementById("addContact").style.display = "none";
        document.getElementById("updateContact").style.display = "inline-block";

        document.getElementById("formTitle").innerText = "Edit Contact";
    };

    document.getElementById("updateContact").addEventListener("click", function () {
        let index = document.getElementById("editIndex").value;
        let updatedName = document.getElementById("name").value.trim();
        let updatedEmail = document.getElementById("email").value.trim();
        let updatedPhone = document.getElementById("phone").value.trim();

        if (updatedName === "" || updatedEmail === "" || updatedPhone === "") {
            alert("Please fill all fields!");
            return;
        }

        contacts[index] = { name: updatedName, email: updatedEmail, phone: updatedPhone };
        alert("Contact updated successfully!");
        resetForm();
        displayContacts();
    });

    window.deleteContact = function (index) {
        if (confirm("Are you sure you want to delete this contact?")) {
            contacts.splice(index, 1);
            displayContacts();
        }
    };

    document.getElementById("search").addEventListener("input", function () {
        let searchQuery = this.value.toLowerCase();
        let filteredContacts = contacts.filter(contact =>
            contact.name.toLowerCase().includes(searchQuery)
        );

        let contactList = document.getElementById("contactList");
        contactList.innerHTML = "";

        filteredContacts.forEach((contact, index) => {
            let div = document.createElement("div");
            div.classList.add("contact");
            div.innerHTML = `
                <span>${contact.name} - ${contact.email} - ${contact.phone}</span>
                <div class="buttons">
                    <button class="edit" onclick="editContact(${index})">Edit</button>
                    <button class="delete" onclick="deleteContact(${index})">Delete</button>
                </div>
            `;
            contactList.appendChild(div);
        });
    });

    function resetForm() {
        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("phone").value = "";
        document.getElementById("editIndex").value = "";

        document.getElementById("addContact").style.display = "inline-block";
        document.getElementById("updateContact").style.display = "none";
        document.getElementById("formTitle").innerText = "Add Contact";
    }
});
