// Function to fetch posts for a specific user
function getPosts(userId) {
  return new Promise((resolve, reject) => {
    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
      .then(response => {
        if (!response.ok) {
          reject(new Error(`Error: ${response.status}`));
        }
        return response.json();
      })
      .then(posts => {
        document.getElementById("posts").innerHTML = "";
        posts.forEach(post => {
          let content = `
            <div id="post">
              <h3>${post.title}</h3>
              <h4>${post.body}</h4>
            </div>
          `;
          document.getElementById("posts").innerHTML += content;
        });
        resolve(posts);
      })
      .catch(error => reject(error));
  });
}

// Function to fetch users
function getUsers() {
  return new Promise((resolve, reject) => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        if (!response.ok) {
          reject(new Error(`Error: ${response.status}`));
        }
        return response.json();
      })
      .then(users => {
        document.getElementById("users").innerHTML = "";
        users.forEach(user => {
          let content = `
            <div id="user" onclick="userClicked(${user.id}, this)">
              <h3>${user.name}</h3>
              <h4>${user.email}</h4>
            </div>
          `;
          document.getElementById("users").innerHTML += content;
        });
        resolve(users);
      })
      .catch(error => reject(error));
  });
}

// Function to handle user click
function userClicked(id, el) {
  getPosts(id).then(() => {
    let selectedElements = document.querySelectorAll(".selected");
    selectedElements.forEach(element => element.classList.remove("selected"));
    el.classList.add("selected");
  }).catch(error => alert(error));
}

// Initialize fetching users
getUsers().catch(error => alert(error));