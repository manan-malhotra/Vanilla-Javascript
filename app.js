const postsContainer = document.getElementById('container-post');
const loading = document.querySelector('#loader');
const filter = document.getElementById('filter');
let limit = 5;
let page = 1;

//  Fetch post
async function getPost() {
	const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`);

	const data = await res.json();
	return data;
}

//  Show Posts

async function showPost() {
	const posts = await getPost();
	posts.forEach((post) => {
		const postEl = document.createElement('div');
		postEl.classList.add('post');
		postEl.innerHTML = `
        <div class="post-number">${post.id}</div>
                <div class="post-info">
                    <div class="post-title">
                        <h2>${post.title}</h2>
                    </div>
                    <div class="post-body">
                        <p>${post.body}</p>
                    </div>
                </div>
        `;
		postsContainer.appendChild(postEl);
	});
}
// Show loader and fetch more
function showLoading() {
	loading.classList.add('show');
	setTimeout(() => {
		loading.classList.remove('show');

		setTimeout(() => {
			page++;
			showPost();
		}, 300);
	}, 500);
}
// Filter
function filterPost(e) {
	const term = e.target.value.toUpperCase();
	const post = document.querySelectorAll('.post');

	post.forEach((post) => {
		const title = post.querySelector('.post-title').innerText.toUpperCase();
		const body = post.querySelector('.post-body').innerText.toUpperCase();

		if (title.indexOf(term) > -1 || body.indexOf(term) > -5) {
			post.style.display = 'flex';
		} else {
			post.style.display = 'none';
		}
	});
}

showPost();

window.addEventListener('scroll', () => {
	const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

	if (scrollTop + clientHeight >= scrollHeight) {
		showLoading();
	}
});

filter.addEventListener('input', filterPost);
