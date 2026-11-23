const API_URL ='http://localhost:4000/api/';

function createReporters(e){
    e.preventDefault();
    const form = document.getElementById('signupForm');
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    fetch(API_URL +'reporters/signup', 
        {method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(data)
        })

    .then(response=>response.json())
    .then(response=>{
        window.alert(`Records Created`)
    })
    .catch(e=>{
        console.log(e)
    })
}

async function loginReporter(event, form){
    event.preventDefault();
    const formData = new FormData(form);
    const button = form.querySelector("button");
    const message = document.getElementById("message");

    try{
        button.disabled = true;
        button.textContent = "Logging in...";
        const response = await fetch(API_URL +'reporters/login', 
        {method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(Object.fromEntries(formData.entries()))
        });

        const result = await response.json();
        if(!response.ok) throw new Error(result.message);
        message.innerHTML = `<p class="text-success">${result.message}</p>`;
        localStorage.setItem("reporter", JSON.stringify(result.reporter));
        window.location.href= "dashboard.html";


    } catch (error){
        message.innerHTML = `<p class="text-danger">${error.message}</p>`;
    }
    finally{
        button.disabled = false;
        button.textContent = "Login";
    }
}

function updateReporters(id){
    fetch(API_URL+'reporters/'+id, 
        {method:'PUT',
            headers:{'Content-Type':'application/json'},
            body:{}
        })

    .then(response=>response.json())
    .then(response=>{
        window.alert(`Records Created`)
    })
    .catch(e=>{
        console.log(e)
    })
}

function deleteReporters(id){
    fetch(API_URL+'reporters/'+id, 
        {method:'DELETE',
            headers:{'Content-Type':'application/json'},
            body:{}
        })

    .then(response=>response.json())
    .then(response=>{
        window.alert(`Records Created`)
    })
    .catch(e=>{
        console.log(e)
    })
}

function getReporters(){
    fetch(API_URL+'reporters', )
    .then(response=>response.json())
    .then(response=>{
        console.log(response)
        const tblist = document.getElementById('tblist')
        tblist.innerHTML = '';
        let newlist = '';
        response.forEach((item, idx)=>{
            newlist += `<tr>
            <td>${idx+1}</td>
            <td>${item.name}</td>
            <td>${item.code}</td>
            <td>${item.phone}</td>
            <td>${item.community}</td>
            <td><buton class="btn btn-danger" onclick="deleteReporter(${item.id})">Delete</button></td>
            </tr>`
        })

    })
    .catch(e=>{
        console.log(e)
    })
}

