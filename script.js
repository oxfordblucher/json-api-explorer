// so much empty
const postList = document.getElementById("postList");
const fetchBtn = document.getElementById("fetchButton");
const titleInput = document.getElementById("titleInput");
const bodyInput = document.getElementById("bodyInput");
const formBtn = document.querySelector("button[type='submit']");
const successMsg = document.getElementById("formSuccess");
const failMsg = document.getElementById("formError");

async function getPosts() {
    try {
        const res = await fetch("http://jsonplaceholder.typicode.com/posts");
        if (!res.ok) {
            throw new Error(`HTTP error: ${res.status}`);
        }
        const data = await res.json();
        console.log(data);

        let resultList = "";

        for (let i=0; i<data.length; i++) {
            resultList += `<article><header><h2>${data[i].title}</h2></header><p>${data[i].body}</p></article>`;
        }

        postList.innerHTML = resultList;
    } catch (err) {
        console.error(err);
        postList.textContent = "Sorry, no posts found.";  
    }
}

fetchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    postList.textContent = "Loading..."
    setTimeout(getPosts, 1000); 
})

const newPost = async () => {
    const title = titleInput.value;
    const body = bodyInput.value;

    try {
        const res = await fetch("http://jsonplaceholder.typicode.com/posts", {
            method: 'POST',
            body: JSON.stringify({
                title: title,
                body: body,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        });

        if (!res.ok) {
            throw new Error(`HTTP error: ${res.status}`);
        }

        const data = await res.json();
        successMsg.textContent = `Successfully created post. ID: ${data.id}`;
    } catch (err) {
        console.error(err);
    }
}

formBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let msg = "";
    console.log("form submission");
    if (titleInput.value.trim() === "" || bodyInput.value.trim() === "") {
        console.log("form fields empty");
        if (titleInput.value === "") {
            msg += "Please give your post a title.";
        }
        if (bodyInput.value === "") {
            msg += "Posts need body copy.";
        }
        failMsg.textContent = msg;
    } else {
        newPost();
    }
})