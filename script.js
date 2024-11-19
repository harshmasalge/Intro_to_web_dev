// document.getElementById('create-blog').addEventListener('click', () => {
//     const blogContainer = document.getElementById('blog-container');

//     // Create new blog list item
//     const newBlog = document.createElement('li');
//     newBlog.innerHTML = `
//         <h2><a href="#">New Blog Post</a></h2>
//         <p>This is a simulated blog created dynamically using JavaScript.</p>
//     `;

//     // Add new blog to the container
//     blogContainer.appendChild(newBlog);

//     alert('New blog has been created and added to the list!');
// });



document.getElementById('form').addEventListener('submit', (e) => {
    e.preventDefault()
    storeBlog()
})

// function storeBlog() {

    
//     let inputBlogUsername = document.getElementById('name');
//     let inputBlogTitle = document.getElementById('title');
//     let inputBlogText = document.getElementById('blog');
//     let inputBlogId = 0;
//     let blogImage = document.getElementById('file');
    
//     for (let i = 0; i < localStorage.length; i++) {
//         let key = localStorage.key(i);
//         if (key.startsWith('blog-')) {
//             inputBlogId++;
//         }
//     }
    



//     const newBlog = {
//         username: inputBlogUsername.value,
//         title: inputBlogTitle.value,
//         blog: inputBlogText.value,
//         image: blogImage.files[0]
        
//     };
    
//     if (newBlog.username && newBlog.title && newBlog.blog) {
//         localStorage.setItem(`blog-${inputBlogId}`, JSON.stringify(newBlog));
//         console.log('Blog saved successfully');
//     } else {
//         console.error('All fields must be filled out.');
//     }
    
// }

// function getBlog(blogId) {
//     let blog = JSON.parse(localStorage.getItem(`blog-${blogId}`))
//     return blog
// }


// function showBlogs() {
//     let blogs = document.getElementById('blogs')
//     let blogId = 0

//     for (let i = 0; i < localStorage.length; i++) {
//         let key = localStorage.key(i);
//         if (key.startsWith('blog-')) {
//             let blogObj = getBlog(blogId)
//             let blogItem = document.createElement('div')
//             blogItem.innerHTML  = `<h3 class="blog-title">${blogObj.title}</h3><p class="blog-text">${blogObj.blog}</p>`
//             blogs.appendChild(blogItem)

//             // let blogObj = getBlog(blogId)
//             // let blogItem = document.createElement('div')
//             // blogItem.innerHTML  = `<h3>${blogObj.title}</h3><p>${blogObj.blog}</p>`
//             // blogs.appendChild(blogItem)
//             blogId++
//         }
//     }






//     // for (let blog of localStorage) {
//     //     if (blog.startsWith('blog-')) {
//     //         let blogObj = getBlog(blogId)
//     //         let blogItem = document.createElement('div')
//     //         blogItem.innerHTML  = `<h3>${blogObj.title}</h3><p>${blogObj.blog}</p>`
//     //         blogs.appendChild(blogItem)
//     //         blogId++
//     //     }
//     // }
// }

// Function to store the blog data in localStorage
function storeBlog() {
    let inputBlogUsername = document.getElementById('name');
    let inputBlogTitle = document.getElementById('title');
    let inputBlogText = document.getElementById('blog');
    let inputBlogImage = document.getElementById('file');
    let inputBlogId = 0;

    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        if (key.startsWith('blog-')) {
            inputBlogId++;
        }
    }


    let blogImageBase64 = '';
    if (inputBlogImage.files.length > 0) {
        let reader = new FileReader();
        reader.onloadend = function () {
            blogImageBase64 = reader.result;
            saveBlogData(blogImageBase64, inputBlogId);
        };
        reader.readAsDataURL(inputBlogImage.files[0]);
    } else {
        saveBlogData('', inputBlogId);
    }
}


function saveBlogData(blogImageBase64, inputBlogId) {
    let inputBlogUsername = document.getElementById('name');
    let inputBlogTitle = document.getElementById('title');
    let inputBlogText = document.getElementById('blog');

    const newBlog = {
        username: inputBlogUsername.value,
        title: inputBlogTitle.value,
        blog: inputBlogText.value,
        image: blogImageBase64
    };

    if (newBlog.username && newBlog.title && newBlog.blog) {
        localStorage.setItem(`blog-${inputBlogId}`, JSON.stringify(newBlog));
        console.log('Blog saved successfully');
        alert('Blog saved successfully');
    } else {
        console.error('All fields must be filled out.');
        alert('All fields must be filled out.');
    }
}

function getBlog(blogId) {
    return JSON.parse(localStorage.getItem(`blog-${blogId}`));
}

function showBlogs() {
    let blogsContainer = document.getElementById('blogs');
    blogsContainer.innerHTML = ''; 

    let blogId = 0;

    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        if (key.startsWith('blog-')) {
            let blogObj = getBlog(blogId);
            let blogItem = document.createElement('div');
            blogItem.classList.add('blog-item');

            blogItem.innerHTML = `
                <h3 class="blog-title">${blogObj.title}</h3>
                <p class="blog-text">${blogObj.blog}</p>
                <p class="blog-username">By ${blogObj.username}</p>
                ${blogObj.image ? `<img src="${blogObj.image}" alt="Blog Image" class="blog-image"/>` : ''}
            `;

            blogsContainer.appendChild(blogItem);

            blogId++;
        }
    }

    if(blogsContainer.childElementCount === 0) {
        blogsContainer.innerHTML = `<h2>No Blogs Found</h2><p>Try creating one!</p>`
    }
}

 