const courseCards = Array.from(document.querySelectorAll('.course-card'));
const searchInput = document.getElementById('courseSearch');
const filterButtons = Array.from(document.querySelectorAll('[data-filter]'));
const courseCount = document.getElementById('courseCount');
const emptyMessage = document.getElementById('courseEmpty');
let activeFilter = 'all';

function updateCourses() {
  const searchTerm = searchInput.value.trim().toLowerCase();
  let visibleCount = 0;

  courseCards.forEach(card => {
    const matchesFilter = activeFilter === 'all' || card.dataset.category === activeFilter;
    const matchesSearch = card.textContent.toLowerCase().includes(searchTerm);
    const isVisible = matchesFilter && matchesSearch;

    card.hidden = !isVisible;
    if (isVisible) visibleCount += 1;
  });

  courseCount.textContent = `${visibleCount} ${visibleCount === 1 ? 'course' : 'courses'}`;
  emptyMessage.hidden = visibleCount > 0;
}

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    activeFilter = button.dataset.filter;
    filterButtons.forEach(filter => {
      filter.setAttribute('aria-pressed', String(filter === button));
    });
    updateCourses();
  });
});

searchInput.addEventListener('input', updateCourses);
