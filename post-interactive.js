// FAQ accordion
document.querySelectorAll('.faq-question').forEach(function(q) {
    q.addEventListener('click', function() {
        var item = q.closest('.faq-item');
        var wasOpen = item.classList.contains('open');
        document.querySelectorAll('.faq-item.open').forEach(function(i) { i.classList.remove('open'); });
        if (!wasOpen) item.classList.add('open');
    });
});

// Ingredient checkboxes
document.querySelectorAll('.ingredients-list li').forEach(function(li) {
    li.addEventListener('click', function() { li.classList.toggle('checked'); });
});

// Download image button (post-image-container / content-image-container)
function downloadPostImage(imageUrl, fileName) {
    fileName = fileName || 'post';
    fetch(imageUrl)
        .then(function(response) { return response.blob(); })
        .then(function(blob) {
            var ext = (imageUrl.split('.').pop() || 'jpg').split('?')[0];
            var slug = fileName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'post';
            var blobUrl = URL.createObjectURL(blob);
            var link = document.createElement('a');
            link.href = blobUrl;
            link.download = slug + '.' + ext;
            document.body.appendChild(link);
            link.click();
            link.remove();
            URL.revokeObjectURL(blobUrl);
        })
        .catch(function() { window.open(imageUrl, '_blank'); });
}
