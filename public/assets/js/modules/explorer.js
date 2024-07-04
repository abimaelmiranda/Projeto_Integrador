document.addEventListener('DOMContentLoaded', function() {
    const filterSelect = document.getElementById('filter');
  
    filterSelect.addEventListener('change', function() {
      this.form.submit();
    });
  });
  