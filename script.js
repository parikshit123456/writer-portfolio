// Load posts from localStorage
function getPosts() {
  return JSON.parse(localStorage.getItem("posts")) || [];
}

function renderPosts(filter = "all") {
  const grid = document.getElementById("blogGrid");
  grid.innerHTML = "";

  const posts = getPosts();
  const filtered = filter === "all" ? posts : posts.filter(p => p.category === filter);

  if (filtered.length === 0) {
    grid.innerHTML = "<p>No posts found.</p>";
    return;
  }

  filtered.forEach(post => {
    const card = document.createElement("div");
    card.className = "post-card";
    card.innerHTML = `
  <img src="${post.image || 'images/content.jpg'}" alt="${post.title}">
  <div class="post-category">${post.category.toUpperCase()}</div>
  <h3>${post.title}</h3>
  <p class="post-date">${new Date(post.date).toLocaleDateString()}</p>
  <p>${post.content.substring(0, 150)}${post.content.length > 150 ? '...' : ''}</p>
`;
    card.addEventListener("click", () => openPostOverlay(post));
    grid.appendChild(card);
  });
}

function openPostOverlay(post) {
  // Set title
  document.getElementById('overlayTitle').textContent = post.title;

  // Set image
  const image = document.getElementById('overlayImage');
  if (post.image) {
    image.src = post.image;
    image.style.display = 'block';
  } else {
    image.style.display = 'none';
  }

  // Format and show content
  const formatted = post.content
    .split('\n')
    .map(line => `<p>${line.trim()}</p>`)
    .join('');
  document.getElementById('overlayContent').innerHTML = formatted;

  // Show overlay
  document.getElementById('postOverlay').classList.add('show');
}

function closePostOverlay() {
  document.getElementById('postOverlay').classList.remove('show');
}

document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderPosts(btn.dataset.filter);
  });
});

document.getElementById('menu-toggle').addEventListener('click', () => {
  document.getElementById('nav-links').classList.toggle('active');
});

window.addEventListener('DOMContentLoaded', () => {
  renderPosts();
});

// document.getElementById('contactForm').addEventListener('submit', function(e) {
//   e.preventDefault();
//   alert('Thank you for your message! I will get back to you soon.');
//   this.reset();
// });

// HERO SLIDER FIX
let heroIndex = 0;
function showHeroSlide() {
  const slides = document.querySelectorAll("#heroSlides img");
  slides.forEach((s, i) => s.classList.remove("active"));
  heroIndex = (heroIndex + 1) % slides.length;
  slides[heroIndex].classList.add("active");
}
setInterval(showHeroSlide, 2000); // Change every 3s

// TESTIMONIALS SLIDER FIX
let testiIndex = 0;
function showTestimonial() {
  const slides = document.querySelectorAll("#testimonialSlider .testimonial");
  slides.forEach((s, i) => s.classList.remove("active"));
  testiIndex = (testiIndex + 1) % slides.length;
  slides[testiIndex].classList.add("active");
}
setInterval(showTestimonial, 2000); // Change every 3s

// FIX: Scroll to section on button click
function scrollToSection(id) {
  const section = document.getElementById(id);
  if (section) section.scrollIntoView({ behavior: "smooth" });
}