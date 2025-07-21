function getPosts() {
  return JSON.parse(localStorage.getItem("posts")) || [];
}

function savePost() {
  const title = document.getElementById("title").value.trim();
  const category = document.getElementById("category").value.trim();
  const content = document.getElementById("content").value.trim();
  const imageInput = document.getElementById("image");

  if (!title || !category || !content) {
    alert("Please fill in all fields.");
    return;
  }

  const file = imageInput.files[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = function () {
      const imageData = reader.result; // Base64
      saveToLocal(title, category, content, imageData);
    };
    reader.readAsDataURL(file);
  } else {
    saveToLocal(title, category, content, null); // No image
  }
}

function saveToLocal(title, category, content, image) {
  const newPost = {
    title,
    category,
    content,
    image,
    date: new Date().toISOString().split("T")[0]
  };

  const posts = getPosts();
  posts.unshift(newPost);
  localStorage.setItem("posts", JSON.stringify(posts));

  alert("Post added successfully!");
  document.getElementById("title").value = "";
  document.getElementById("category").value = "";
  document.getElementById("content").value = "";
  document.getElementById("image").value = "";

  renderAdminPosts();
}

function renderAdminPosts() {
  const postList = document.getElementById("postList");
  if (!postList) return;

  const posts = getPosts();
  postList.innerHTML = "";
  posts.forEach((p, i) => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${p.title}</strong> (${p.category}) - ${p.date}`;
    postList.appendChild(li);
  });
}

function checkLogin() {
  const password = document.getElementById("adminPassword").value;
  if (password === "Sneha@1996!") {
    document.getElementById("loginSection").classList.add("hidden");
    document.getElementById("adminSection").classList.remove("hidden");
    renderAdminPosts();
  } else {
    alert("Incorrect password");
    window.location.href = "index.html"; // 👈 sends them away
  }
}
