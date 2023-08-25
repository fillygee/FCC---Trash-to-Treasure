let selectedID = -1;

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#edit-btn').addEventListener('click', async (e) => {
        e.preventDefault();

        const name = document.querySelector('#inputItemName4').value;
        const category = document.querySelector('#inputItemCategory4').value;
        const description = document.querySelector('#itemDescription').value;
        const address = document.querySelector('#inputAddress').value;
        const postcode = document.querySelector('#inputPostcode').value;

        const options = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                post_id: selectedID,
                item_name: name,
                item_category: category,
                item_description: description,
                address: address,
                postcode: postcode,
            }),
        };
        await fetch('http://localhost:3000/posts/update', options)
            .then((response) => response.json())
            .then((data) => {
                const postsSection = document.getElementById('posts-section');
                postsSection.textContent = '';
                loadPosts();
            })
            .catch((error) => console.log(error));
    });
});

document.querySelector('#logout').addEventListener('click', async (e) => {
    e.preventDefault();

    await fetch('http://localhost:3000/users/logout', {
        method: 'POST',
    });

    window.location.assign('/');
});

async function loadPosts() {
    const postsSection = document.getElementById('posts-section');
    const posts = await fetch('http://localhost:3000/posts')
        .then((data) => data.json())
        .catch((error) => console.log(error));

    posts.forEach((post) => {
        const template = document.getElementById('post-template');

        const postCard = template.content.cloneNode(true);
        const postId = postCard.querySelector('#post-card');
        postId.id = post.post_id;
        postId.classList.add('post-container');

        postCard.querySelector('.comment').addEventListener('click', async (e) => {
            selectedID = e.target.closest('.post-container').id;
            await loadComments(selectedID);
        });

        postCard.querySelector('.post-edit-button').addEventListener('click', (e) => {
            selectedID = e.target.closest('.post-container').id;
        });

        postCard.querySelector('.delete').addEventListener('click', async (e) => {
            selectedID = e.target.closest('.post-container').id;
            const options = {
                method: 'DELETE',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            };
            await fetch(`http://localhost:3000/posts/${selectedID}`, options)
                .then((response) => response.json())
                .then((data) => {
                    const postsSection = document.getElementById('posts-section');
                    postsSection.textContent = '';
                    loadPosts();
                })
                .catch((error) => console.log(error));
        });

        const titleArea = postCard.querySelector('#title-area');
        titleArea.textContent = post.item_name;
        const categoryArea = postCard.querySelector('#category-area');
        categoryArea.textContent = post.item_category;
        const addressArea = postCard.querySelector('#address-area');
        addressArea.textContent = post.address;
        const postcodeArea = postCard.querySelector('#postcode-area');
        postcodeArea.textContent = post.postcode;
        const timestampArea = postCard.querySelector('#timestamp-area');
        timestampArea.textContent = post.timestamp;
        const descriptionArea = postCard.querySelector('#description-area');
        descriptionArea.textContent = post.item_description;
        postsSection.append(postCard);
    });
}

async function loadComments(postId) {
    const commentSection = document.getElementById('comments-area');
    const comments = await fetch(`http://localhost:3000/comments/${postId}`)
        .then((data) => data.json())
        .catch((error) => console.log(error));
    const template = document.getElementById('comment-template');

    comments.forEach((comment) => {
        const commentCard = template.content.cloneNode(true);
        const userArea = commentCard.getElementById('user-area');
        userArea.textContent = comment.username;
        const contentArea = commentCard.getElementById('content-area');
        contentArea.textContent = comment.content;
        const timestampArea = commentCard.getElementById('timestamp-area');
        timestampArea.textContent = comment.timestamp;
        commentSection.appendChild(commentCard);
        console.log(comment);
    });
}

loadPosts();
