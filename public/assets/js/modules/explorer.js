document.addEventListener('DOMContentLoaded', function() {
    const filterSelect = document.getElementById('filter');
  
    filterSelect.addEventListener('change', function() {
      this.form.submit();
    });

    const posts = document.querySelectorAll('.post-content');
    posts.forEach(post => {
      post.addEventListener('click', () => {
        const postId = post.id;
        window.location.href = `/recipes?post=${postId}`;
      });
    });
  });
  
