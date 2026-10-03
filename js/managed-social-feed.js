(() => {
    const section = document.getElementById('managed-social-feed');
    const container = document.getElementById('managed-social-posts');
    if (!section || !container || !window.PelanoContentApi?.isConfigured) return;

    window.PelanoContentApi.getApprovedSocialPosts()
        .then(posts => {
            if (!Array.isArray(posts) || posts.length === 0) return;
            posts.forEach(post => {
                const article = document.createElement('article');
                article.className = 'feature-card';
                const heading = document.createElement('h3');
                heading.textContent = post.platform;
                const caption = document.createElement('p');
                caption.textContent = post.caption;
                article.append(heading, caption);
                if (post.image_url) {
                    const image = document.createElement('img');
                    image.src = post.image_url;
                    image.alt = '';
                    image.loading = 'lazy';
                    image.decoding = 'async';
                    article.append(image);
                }
                const link = document.createElement('a');
                link.href = post.post_url;
                link.target = '_blank';
                link.rel = 'noopener noreferrer';
                link.textContent = 'View post';
                article.append(link);
                container.append(article);
            });
            section.hidden = false;
        })
        .catch(error => console.error('Approved social posts could not be loaded.', error));
})();
