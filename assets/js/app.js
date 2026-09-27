const cl = console.log

const courseForm = document.getElementById('courseForm')
const name1 = document.getElementById('name')
const duration = document.getElementById('duration')
const fees = document.getElementById('fees')
const mode = document.getElementById('mode')
const addCourseBtn = document.getElementById('addCourseBtn')
const updateCourseBtn = document.getElementById('updateCourseBtn')
const coursesList = document.getElementById('coursesList')


let courses = [
    { id: 'cor1', name: "JavaScript", duration: "3 Months", fees: 15000, mode: "Online" },
    { id: 'cor2', name: "React JS", duration: "2 Months", fees: 12000, mode: "Offline" },
    { id: 'cor3', name: "Angular", duration: "3 Months", fees: 18000, mode: "Online" },
    { id: 'cor4', name: "Python", duration: "4 Months", fees: 20000, mode: "Offline" },
    { id: 'cor5', name: "Node JS", duration: "2 Months", fees: 14000, mode: "Online" }
];

// localStorage.setItem('course', JSON.stringify(courses))

let getData = localStorage.getItem('course')

let course;

if (getData) {
    course = JSON.parse(getData)
} else {
    course = courses
    localStorage.setItem('course', JSON.stringify(course))
}

//SNACKBAR FUNCTION 

function snackbar(msg, icon){
    Swal.fire({
        title : msg,
        icon : icon,
        timer : 3000
    })
}

// cl(course)
function onCreateCourseList(arr) {
    let res = '';

    arr.forEach((ele, i) => {
        res += `
            <tr id="${ele.id}">
                <td>${i + 1}</td>
                <td>${ele.name}</td>
                <td>${ele.duration}</td>
                <td>${ele.fees}</td>
                <td>
                    <span class="badge ${ele.mode === "Offline" ? "badge-warning" : "badge-success"} p-2 forbadge text-white">
                        ${ele.mode}
                    </span>
                </td>
                <td>
                    <i onclick="onEdit(this)" 
                       class="fa-regular fa-2x fa-pen-to-square text-success">
                    </i>
                </td>
                <td>
                    <i onclick="onDelete(this)" 
                       class="fa-regular fa-2x fa-trash-can text-danger">
                    </i>
                </td>
            </tr>`;
    });

    coursesList.innerHTML = res;
}

onCreateCourseList(course)

function onSubmit(eve) {
    eve.preventDefault();

    let courseObj = {
        name: name1.value,
        duration: duration.value,
        fees: fees.value,
        mode: mode.value,
        id: Date.now().toString()
    }

    courseForm.reset();
    course.push(courseObj)
    localStorage.setItem('course', JSON.stringify(course))

    let newCr = document.createElement('tr')
    newCr.id = courseObj.id
    newCr.innerHTML = `<td>${course.length}</td>
                                    <td>${courseObj.name}</td>
                                    <td>${courseObj.duration}</td>
                                    <td>${courseObj.fees}</td>
                                    <td><span class="badge ${courseObj.mode === "Offline" ? "badge-warning" : "badge-success"} p-2 forbadge text-white">${courseObj.mode === "Offline" ? "Offline" : "Online"}</span></td>
                                    <td><i onclick="onEdit(this)" class="fa-regular fa-2x fa-pen-to-square text-success"></i></td>
                                     <td><i onclick="onDelete(this)" class="fa-regular fa-2x fa-trash-can text-danger"></i></td>`
    coursesList.append(newCr)
    snackbar(`New course with name ${courseObj.name} added successfully`, 'success')
}

function onEdit(ele) {
    let editId = ele.closest('tr').id;
    // cl(editId)

    localStorage.setItem('updateid', editId)

    let editObj = course.find(e => e.id === editId)
    // cl(editObj)

    name1.value = editObj.name
    duration.value = editObj.duration
    fees.value = editObj.fees
    mode.value = editObj.mode

    addCourseBtn.classList.add('d-none')
    updateCourseBtn.classList.remove('d-none')
}


function onUpdate() {
    let updateId = localStorage.getItem('updateid')
    // cl(updateId)

    let updateObj = {
        name: name1.value,
        duration: duration.value,
        fees: fees.value,
        mode: mode.value,
        id: updateId
    }

    courseForm.reset()
    let Index = course.findIndex(e => e.id === updateId)
    course[Index] = updateObj

    // let trs = document.getElementById(updateId).children
    // trs[1].innerHTML = updateObj.name
    // trs[2].innerHTML = updateObj.duration
    // trs[3].innerHTML = updateObj.fees
    // trs[4].innerHTML = updateObj.mode

    let tr = document.getElementById(updateId)
    tr.innerHTML = `  <td>${course.length}</td> 
                 <td>${updateObj.name}</td>
                                    <td>${updateObj.duration}</td>
                                    <td>${updateObj.fees}</td>
                                    <td><span class="badge ${updateObj.mode === "Offline" ? "badge-warning" : "badge-success"} p-2 forbadge text-white">${updateObj.mode === "Offline" ? "Offline" : "Online"}</span></td>
                                    <td><i onclick="onEdit(this)" class="fa-regular fa-2x fa-pen-to-square text-success"></i></td>
                                     <td><i onclick="onDelete(this)" class="fa-regular fa-2x fa-trash-can text-danger"></i></td>`

    snackbar(`Course with name ${updateObj.name} updated successfully`, 'success')

    addCourseBtn.classList.remove('d-none')
    updateCourseBtn.classList.add('d-none')
}

function onDelete(ele) {
    let deleteId = ele.closest('tr').id;
    // cl(deleteId)


    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed){
            let getIndex = course.findIndex(e => e.id === deleteId)
        course.splice(getIndex, 1)
        ele.closest('tr').remove()

        snackbar(`Course with id ${deleteId} deleted successfully`, 'success')

        // let ids = document.getElementById(coursesList)
        let trs = document.querySelectorAll('#coursesList tr td:first-child')
        // cl(trs)
        trs.forEach((e, i) => e.innerText = i + 1)
        };

    });   
}

courseForm.addEventListener("submit", onSubmit)
updateCourseBtn.addEventListener('click', onUpdate)