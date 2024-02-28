// scripts.js
function getPassword() {
    return prompt('Enter the password:');
}
console.log("hello")

function closeOverlay() {
    var overlay = document.getElementById('overlay');
    overlay.style.display = 'none';
}

// Function to check the entered password
function checkPassword() {
    const correctPassword = '123'; // Replace with your actual password
    const enteredPassword = getPassword();

    return enteredPassword === correctPassword;
}
function toggleOverlay() {
    var overlay = document.getElementById('overlay');
    console.log(overlay.style.display);
    overlay.style.display = "flex";
    // overlay.style.display = (overlay.style.display === 'block') ? 'none' : 'flex';
    console.log(overlay.style.display);
}

function saveBlogsToLocalStorage() {
    const blogsContainer = document.querySelector('.blogs');
    const blogItems = blogsContainer.querySelectorAll('.blog-item');
    const blogs = [];

    // Iterate through blog items in reverse order and store their data
    for (let i = blogItems.length - 1; i >= 0; i--) {
        const blog = blogItems[i];
        const blogData = {
            title: blog.querySelector('h4').textContent,
            content: blog.querySelector('p').textContent,
            date: blog.querySelector('small').textContent,
            fileName: blog.querySelector('a') ? blog.querySelector('a').getAttribute('data-file') : null // Save file name if attached
        };

        blogs.push(blogData);
    }

    localStorage.setItem('blogs', JSON.stringify(blogs));
}

function loadBlogsFromLocalStorage() {
    const blogsContainer = document.querySelector('.blogs');
    const storedBlogs = JSON.parse(localStorage.getItem('blogs'));

    if (storedBlogs) {
        // Iterate through stored blogs in reverse order and create blog elements
        for (let i = storedBlogs.length - 1; i >= 0; i--) {
            const blogData = storedBlogs[i];

            const blogDiv = document.createElement('div');
            blogDiv.classList.add('blog-item');

            const titleElement = document.createElement('h4');
            titleElement.textContent = blogData.title;

            const contentElement = document.createElement('p');
            contentElement.textContent = blogData.content;

            const dateElement = document.createElement('small');
            dateElement.textContent = blogData.date;

            blogDiv.appendChild(titleElement);
            blogDiv.appendChild(contentElement);
            blogDiv.appendChild(dateElement);

            if (blogData.fileName) {
                const fileLink = document.createElement('a');
                fileLink.href = `/uploads/${blogData.fileName}`; // Assuming files are stored in an 'uploads' directory
                fileLink.setAttribute('data-file', blogData.fileName);
                fileLink.download = blogData.fileName;
                fileLink.textContent = 'Download Attached File';
                blogDiv.appendChild(fileLink);
            }

            // Delete button for each blog entry
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.classList.add('button-89');
            deleteButton.onclick = function () {
                blogDiv.remove(); // Remove the blog entry
                saveBlogsToLocalStorage(); // Update local storage after deletion
            };
            blogDiv.appendChild(deleteButton);

            blogsContainer.appendChild(blogDiv);
        }
    }
}

function submitBlog(event) {
    console.log('Submit button clicked');
    event.preventDefault();
    const titleInput = document.getElementById('blogTitle');
    const contentInput = document.getElementById('blogContent');
    const fileInput = document.getElementById('blogFile');

    const title = titleInput.value.trim();
    const content = contentInput.value.trim();
    const file = fileInput.files[0]; // Get the file object

    if (!title || !content) {
        alert('Please enter both title and content for the blog.');
        return;
    }

    const date = new Date().toLocaleDateString();

    // Simulating file upload to the server and storing the file name
    let fileName = null;
    if (file) {
        // Replace this part with actual file upload to your server
        // For demonstration purposes, just use the file name
        fileName = file.name;
    }

    const blogDiv = document.createElement('div');
    blogDiv.classList.add('blog-item');

    const titleElement = document.createElement('h4');
    titleElement.textContent = title;

    const contentElement = document.createElement('p');
    contentElement.textContent = content;

    const dateElement = document.createElement('small');
    dateElement.textContent = date;

    blogDiv.appendChild(titleElement);
    blogDiv.appendChild(contentElement);
    blogDiv.appendChild(dateElement);

    if (fileName) {
        const fileLink = document.createElement('a');
        fileLink.href = `/uploads/${fileName}`;
        fileLink.setAttribute('data-file', fileName);
        fileLink.download = fileName;
        fileLink.textContent = 'Download Attached File';
        blogDiv.appendChild(fileLink);
    }

    // Delete button for the newly added blog entry
    const deleteButton = document.createElement('button');
    console.log(deleteButton);
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('button-89');
    deleteButton.classList.add('hidden');
    deleteButton.onclick = function () {
        blogDiv.remove(); // Remove the blog entry
        saveBlogsToLocalStorage(); // Update local storage after deletion
    };
    blogDiv.appendChild(deleteButton);

    const recentlyUpdatedSection = document.querySelector('.recently-updated');
    const blogsContainer = recentlyUpdatedSection.querySelector('.blogs');
    blogsContainer.prepend(blogDiv); // Reversing the order by prepending the new blog item

    saveBlogsToLocalStorage(); // Save blogs to localStorage

    document.getElementById('overlay').style.display = 'none';
    titleInput.value = '';
    contentInput.value = '';
    fileInput.value = ''; // Clear the file input
}

document.addEventListener('DOMContentLoaded', function () {
    loadBlogsFromLocalStorage(); // Load blogs from localStorage
    // // Sample blog post
    // const blogPost = document.createElement('article');
    // blogPost.innerHTML = `
    //     <h2>Sample Blog Post</h2>
    //     <p>This is a sample blog post content. You can replace it with your own articles.</p>
    //     <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
    // `;

    const form = document.querySelector('.blog-form form');
    // form.addEventListener('submit', submitBlog);
});

//Handling the admin button

let adminBtn = document.querySelector("#admin-button")

adminBtn.addEventListener("click",()=> {
    let pass = prompt("Enter Admin Password!");
    // console.log(deleteButton);
    let delBtn = document.querySelectorAll(".button-89");
    if(pass == 123){
        alert("hi admin");
        for(let i=0;i<delBtn.length;i++){
            delBtn[i].style.display = "block";
        }
    }else{
        alert("You are not the admin.")
    }

});
