document.getElementById("addRider").addEventListener('click', newRider);
document.getElementById("addInstructor").addEventListener('click', newInstructor);
document.getElementById("addHorse").addEventListener('click', newHorse);



// const cloudName = 'orihers6';
// const unsignedUploadPreset = 'Your upload preset';
//
// var fileSelect = document.getElementById("fileSelect"),
//     fileElem = document.getElementById("fileElem");
//
// fileSelect.addEventListener("click", function(e) {
//     if (fileElem) {
//         fileElem.click();
//     }
//     e.preventDefault(); // prevent navigation to "#"
// }, false);
//
// // ************************ Drag and drop ***************** //
// function dragenter(e) {
//     e.stopPropagation();
//     e.preventDefault();
// }
//
// function dragover(e) {
//     e.stopPropagation();
//     e.preventDefault();
// }
//
// dropbox = document.getElementById("dropbox");
// dropbox.addEventListener("dragenter", dragenter, false);
// dropbox.addEventListener("dragover", dragover, false);
// dropbox.addEventListener("drop", drop, false);
//
// function drop(e) {
//     e.stopPropagation();
//     e.preventDefault();
//
//     var dt = e.dataTransfer;
//     var files = dt.files;
//
//     handleFiles(files);
// }
//
// // *********** Upload file to Cloudinary ******************** //
// function uploadFile(file) {
//     var url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
//     var xhr = new XMLHttpRequest();
//     var fd = new FormData();
//     xhr.open('POST', url, true);
//     xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
//
//     // Reset the upload progress bar
//     document.getElementById('progress').style.width = 0;
//
//     // Update progress (can be used to show progress indicator)
//     xhr.upload.addEventListener("progress", function(e) {
//         var progress = Math.round((e.loaded * 100.0) / e.total);
//         document.getElementById('progress').style.width = progress + "%";
//
//         console.log(`fileuploadprogress data.loaded: ${e.loaded},
//   data.total: ${e.total}`);
//     });
//
//     xhr.onreadystatechange = function(e) {
//         if (xhr.readyState == 4 && xhr.status == 200) {
//             // File uploaded successfully
//             var response = JSON.parse(xhr.responseText);
//             // https://res.cloudinary.com/cloudName/image/upload/v1483481128/public_id.jpg
//             var url = response.secure_url;
//             // Create a thumbnail of the uploaded image, with 150px width
//             var tokens = url.split('/');
//             tokens.splice(-2, 0, 'w_150,c_scale');
//             var img = new Image(); // HTML5 Constructor
//             img.src = tokens.join('/');
//             img.alt = response.public_id;
//             document.getElementById('gallery').appendChild(img);
//         }
//     };
//
//     fd.append('upload_preset', unsignedUploadPreset);
//     fd.append('tags', 'browser_upload'); // Optional - add tag for image admin in Cloudinary
//     fd.append('file', file);
//     xhr.send(fd);
// }
//
// // *********** Handle selected files ******************** //
// var handleFiles = function(files) {
//     for (var i = 0; i < files.length; i++) {
//         uploadFile(files[i]); // call the function to upload the file
//     }
// };


function switch_entity(entity) {
    switch(entity) {
        case 0:
            document.getElementById("rider").style.display="block";
            document.getElementById("instructor").style.display="none";
            document.getElementById("horse").style.display="none";
            break;
        case 1:
            document.getElementById("rider").style.display="none";
            document.getElementById("instructor").style.display="block";
            document.getElementById("horse").style.display="none";
            break;
        case 2:
            document.getElementById("rider").style.display="none";
            document.getElementById("instructor").style.display="none";
            document.getElementById("horse").style.display="block";
            break;
        default:
            document.getElementById("rider").style.display="block";
            document.getElementById("instructor").style.display="none";
            document.getElementById("horse").style.display="none";
    }
}


function newRider(e) {
    e.preventDefault();
    let firstName = document.getElementById("fname_rider").value;
    let lastName = document.getElementById("lname_rider").value;
    let age = document.getElementById("age_rider").value;
    let classTime = document.getElementById("class_date_rider").value;

    let rider = JSON.stringify({firstName:firstName, lastName:lastName, age:age, classTime:classTime});
    if (firstName === '' || lastName === '' || age ==='' || classTime === '') {
        alert("Please fill all the fields");
        return;
    }
    fetch("http://localhost:3000/riders", {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-type':'application/json'
        },
        body: rider
    }).then((response) => response.json())
        .then((res) => {
            if (res.status == '200'){
                alert("Rider added successfully");
                let elements = document.getElementsByTagName("input");
                for (let ii=0; ii < elements.length; ii++) {
                    if (elements[ii].type == "text") {
                        elements[ii].value = "";
                    }
                }
            }
            else{
                alert("Error during adding Rider");
            }
        });
}

function newInstructor(e) {
    e.preventDefault();
    let firstName = document.getElementById("fname_instructor").value;
    let lastName = document.getElementById("lname_instructor").value;
    let email = document.getElementById("email_instructor").value;
    let days = [].filter.call(document.getElementsByName('days'), (c) => c.checked).map(c => c.value);

    let instructor = JSON.stringify({firstName:firstName, lastName:lastName, email:email, days:days});
    if (firstName === '' || lastName === '' || email ==='' || days == []) {
        alert("Please fill all the fields");
        return;
    }
    fetch("http://localhost:3000/instructors", {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-type':'application/json'
        },
        body: instructor
    }).then((response) => response.json())
        .then((res) => {
            if (res.status == '200'){
                alert("Instructor added successfully");
                let elements = document.getElementsByTagName("input");
                for (let ii=0; ii < elements.length; ii++) {
                    if (elements[ii].type == "text") {
                        elements[ii].value = "";
                    }
                }
            }
            else{
                alert("Error during adding Instructor");
            }
        });
}


function newHorse(e) {
    e.preventDefault();
    let name = document.getElementById("name_horse").value;
    let breed = document.getElementById("breed_horse").value;
    let age = document.getElementById("age_horse").value;
    let picture = "";

    let horse = JSON.stringify({name:name, breed:breed, age:age, picture:picture, takenDays:[]});
    if (name === '' || breed === '' || age ==='') {
        alert("Please fill all the fields");
        return;
    }
    fetch("http://localhost:3000/horses", {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-type':'application/json'
        },
        body: horse
    }).then((response) => response.json())
        .then((res) => {
            if (res.status == '200'){
                alert("Horse added successfully");
                let elements = document.getElementsByTagName("input");
                for (let ii=0; ii < elements.length; ii++) {
                    if (elements[ii].type == "text") {
                        elements[ii].value = "";
                    }
                }
            }
            else{
                alert("Error during adding Horse");
            }
        });
}