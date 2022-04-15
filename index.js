// I used a previously made template/layout (created by me!) https://github.com/jamesonarnett/odinAdminDashboard
// Usually I would use modules/webpack/sass and/or React these days.
// However for the task at hand, and the Vanilla JS requirement, this was simplest.

//Globals
const userSection = document.getElementById("userSection");

//API Calls
const fetchUsers = () => {
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => response.json())
    .then((data) => {
      createUserCard(data);
    })
    .catch((err) => {
      throw new Error(
        `Something went wrong fetching user data (${err}) Try Again`
      );
    });
};

const fetchPosts = (id) => {
  fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`)
    .then((response) => response.json())
    .then((data) => {
      createPostCard(data);
    })
    .catch((err) => {
      throw new Error(
        `Something went wrong fetching post data (${err}) Try Again`
      );
    });
};
//END API CALLS

//Global Utility functions
const goToUserPosts = (id) => {
  clearDOM();
  fetchPosts(id);
};

const clearDOM = () => {
  userSection.classList.add("bounce-in-top");
  userSection.innerHTML = "";
};
//END Utility functions

//createCards
const createUserCard = (data) => {
  data.forEach((el) => {
    const html = `
    <div id=${el.id} class="main-item" >
     <div class="inside-grid-item"> 
          <h2>${el.username}</h2>
          <p>Email: ${el.email}
          <br />
          Workplace: ${el.company.name}
          <br />
          Website: ${el.website}
          </p>
          <button id=${el.id} class="button3 btn-forty-center"  onClick={goToUserPosts(${el.id})}>Go To User Posts</button>
        </div>
    </div>
    `;
    userSection.insertAdjacentHTML("beforeend", html);
  });
};

const createPostCard = (data) => {
  data.forEach((el) => {
    const html = `
    <div id=${el.id} class="main-item" >
      <div class="inside-grid-item"> 
        <h2>${el.title}  <i>${el.id}</i></h2>
        <p>${el.body}</p>
      </div>
     </div>
    `;
    userSection.insertAdjacentHTML("beforeend", html);
  });
};
//End cards

fetchUsers();
