function formFunction() {
    var fullName = document.getElementById('fullName').value;
    var gender = document.querySelector('input[name="gender"]:checked').value;
    var dob = document.getElementById('dob').value;
    var birthTime = document.getElementById('birthTime').value;
    var email = document.getElementById('email').value;
    var phoneNumber = document.getElementById('phoneNumber').value;
    var category = document.getElementById('category').value;
    var favoriteWebsite = document.getElementById('url').value;
    var languages = [];
    var checkboxes = document.querySelectorAll('input[name="check"]');
    checkboxes.forEach(function(checkbox) {
        if (checkbox.checked) {
            languages.push(checkbox.value);
        }
    });
    var language = languages.join(', ');
    // var photo = document.getElementById('photoUpload').files[0];

    
    if (fullName && gender && dob && birthTime && email && phoneNumber && category && language && favoriteWebsite) {
        var message = "Full Name: " + fullName + "\n" +
            "Gender: " + gender + "\n" +
            "Date of Birth: " + dob + "\n" +
            "Birth Time: " + birthTime + "\n" +
            "Email: " + email + "\n" +
            "Phone Number: " + phoneNumber + "\n" +
            "Category: " + category + "\n" +
            "Favorite Programming Languages: " + language + "\n" +
            "Favorite Website URL: " + favoriteWebsite;

        alert(message);

        const detailsObject = {
            FullName: fullName,
            Gender: gender,
            DateofBirth: dob,
            BirthTime: birthTime,
            Email: email,
            PhoneNumber: phoneNumber,
            Category: category,
            Languages: language,
            // Photo: URL.createObjectURL(photo),
            URL: favoriteWebsite
        };

        var formDetails = JSON.parse(localStorage.getItem("data")) || [];
        formDetails.push(detailsObject);
        localStorage.setItem("data", JSON.stringify(formDetails));

        displayUserData();

    } else {

        alert("Please fill in all fields.");
    }
}
function displayUserData() {
    const userDetails = JSON.parse(localStorage.getItem("data"));
    const tableBo = document.getElementById("tableBo");

    tableBo.innerHTML = "";

    if (userDetails) {
        userDetails.forEach(function (user, index) {
            const newRow = document.createElement("tr");
            newRow.innerHTML = `
                <td>${user.FullName}</td>
                <td>${user.Gender}</td>
                <td>${user.DateofBirth}</td>
                <td>${user.BirthTime}</td>
                <td>${user.Email}</td>
                <td>${user.PhoneNumber}</td>
                <td>${user.Category}</td>
                <td>${user.Languages}</td>
                <td>${user.URL}</td>
                <td><button onclick="editUserData(${index})">Edit</button></td>
                <td><button onclick="deleteUserData(${index})">Delete</button></td>
               
            `;
            tableBo.appendChild(newRow);
           
        });
    }
}

function editUserData(index) {
    var userDetails = JSON.parse(localStorage.getItem("data"));
    var userData = userDetails[index];
    document.getElementById('fullName').value = userData.FullName;
    document.getElementById('dob').value = userData.DateofBirth;
    document.getElementById('birthTime').value = userData.BirthTime;
    document.getElementById('email').value = userData.Email;
    document.getElementById('phoneNumber').value = userData.PhoneNumber;
    document.getElementById('category').value = userData.Category;
    document.getElementById('url').value = userData.URL;
    // // Update the line below to correctly set the photo value
    // document.getElementById('photoUpload').value = userData.Photo;

    var submitBtn = document.querySelector('button[type="button"]');
    submitBtn.textContent = 'Update';
    submitBtn.onclick = function() {
        updateUserData(index);
    };
    
}


function updateUserData(index) {
    var userDetails = JSON.parse(localStorage.getItem("data"));

    userDetails[index].FullName = document.getElementById('fullName').value;
    userDetails[index].Gender = document.querySelector('input[name="gender"]:checked').value;
    userDetails[index].DateofBirth = document.getElementById('dob').value;
    userDetails[index].BirthTime = document.getElementById('birthTime').value;
    userDetails[index].Email = document.getElementById('email').value;
    userDetails[index].PhoneNumber = document.getElementById('phoneNumber').value;
    userDetails[index].Category = document.getElementById('category').value;
    // userDetails[index].Photo = document.getElementById('photo').value;
    userDetails[index].URL = document.getElementById('url').value;

    localStorage.setItem("data", JSON.stringify(userDetails));

    displayUserData();
}
function deleteUserData(index) {
   
    var confirmDelete = confirm("Are you sure you want to delete this user data?");
    
    
    if (confirmDelete) {
       
        var userDetails = JSON.parse(localStorage.getItem("data"));
        userDetails.splice(index, 1);
        localStorage.setItem("data", JSON.stringify(userDetails));
        displayUserData();
    }
}
window.onload = function() {
    displayUserData();
};