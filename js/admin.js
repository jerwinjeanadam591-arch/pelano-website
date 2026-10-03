(() => {
    const loginPanel = document.getElementById('admin-login');
    const dashboard = document.getElementById('admin-dashboard');
    const loginForm = document.getElementById('admin-login-form');
    const loginStatus = document.getElementById('admin-login-status');
    const tableBody = document.getElementById('quote-table-body');
    const dashboardStatus = document.getElementById('admin-dashboard-status');
    const logoutButton = document.getElementById('admin-logout');
    const cmsForm = document.getElementById('cms-post-form');
    const cmsStatus = document.getElementById('cms-status');
    const cmsPostsBody = document.getElementById('cms-posts-body');
    const socialStatus = document.getElementById('social-moderation-status');
    const socialPostsBody = document.getElementById('social-posts-body');
    const socialPostForm = document.getElementById('social-post-form');

    const showStatus = (element, message, isError = false) => {
        element.textContent = message;
        element.classList.toggle('status-error', isError);
    };

    const renderQuotes = quotes => {
        tableBody.replaceChildren();
        if (!quotes.length) {
            const row = document.createElement('tr');
            row.innerHTML = '<td colspan="6">No quote requests found.</td>';
            tableBody.append(row);
            return;
        }
        quotes.forEach(quote => {
            const row = document.createElement('tr');
            const values = [quote.reference_code, quote.name, quote.company || '—', quote.email, quote.status, new Date(quote.created_at).toLocaleString()];
            values.forEach(value => {
                const cell = document.createElement('td');
                cell.textContent = value;
                row.append(cell);
            });
            const actionCell = document.createElement('td');
            const select = document.createElement('select');
            select.setAttribute('aria-label', `Update status for ${quote.reference_code}`);
            ['new', 'reviewing', 'quoted', 'approved', 'fulfilled', 'closed'].forEach(status => {
                const option = new Option(status, status, status === quote.status, status === quote.status);
                select.append(option);
            });
            select.addEventListener('change', async () => {
                select.disabled = true;
                try {
                    await window.PelanoAdminApi.updateQuoteStatus(quote.id, select.value);
                    showStatus(dashboardStatus, `Updated ${quote.reference_code}.`);
                } catch (error) {
                    select.value = quote.status;
                    showStatus(dashboardStatus, error.message, true);
                } finally {
                    select.disabled = false;
                }
            });
            actionCell.append(select);
            row.append(actionCell);
            tableBody.append(row);
        });
    };

    const renderPosts = posts => {
        cmsPostsBody.replaceChildren();
        posts.forEach(post => {
            const row = document.createElement('tr');
            for (const value of [post.title, post.category, post.status]) {
                const cell = document.createElement('td');
                cell.textContent = value;
                row.append(cell);
            }
            const action = document.createElement('td');
            const select = document.createElement('select');
            select.setAttribute('aria-label', `Change article status for ${post.title}`);
            ['draft', 'published', 'archived'].forEach(status => select.add(new Option(status, status, status === post.status, status === post.status)));
            select.addEventListener('change', async () => {
                select.disabled = true;
                try {
                    await window.PelanoAdminApi.updatePostStatus(post.id, select.value);
                    post.status = select.value;
                    showStatus(cmsStatus, `Updated "${post.title}".`);
                } catch (error) {
                    select.value = post.status;
                    showStatus(cmsStatus, error.message, true);
                } finally {
                    select.disabled = false;
                }
            });
            action.append(select);
            row.append(action);
            cmsPostsBody.append(row);
        });
    };

    const refreshPosts = async () => {
        const posts = await window.PelanoAdminApi.listPosts();
        renderPosts(Array.isArray(posts) ? posts : []);
    };

    const refreshSocialPosts = async () => {
        const posts = await window.PelanoAdminApi.listSocialPosts();
        socialPostsBody.replaceChildren();
        (Array.isArray(posts) ? posts : []).forEach(post => {
            const row = document.createElement('tr');
            for (const value of [post.platform, post.caption]) {
                const cell = document.createElement('td');
                cell.textContent = value;
                row.append(cell);
            }
            const linkCell = document.createElement('td');
            const externalLink = document.createElement('a');
            externalLink.href = post.post_url;
            externalLink.target = '_blank';
            externalLink.rel = 'noopener noreferrer';
            externalLink.textContent = 'Open post';
            linkCell.append(externalLink);
            row.append(linkCell);
            const statusCell = document.createElement('td');
            statusCell.textContent = post.status;
            row.append(statusCell);
            const actionCell = document.createElement('td');
            const select = document.createElement('select');
            select.setAttribute('aria-label', `Moderate ${post.platform} post`);
            ['pending', 'approved', 'rejected'].forEach(status => select.add(new Option(status, status, status === post.status, status === post.status)));
            select.addEventListener('change', async () => {
                select.disabled = true;
                try {
                    await window.PelanoAdminApi.updateSocialStatus(post.id, select.value);
                    post.status = select.value;
                    statusCell.textContent = post.status;
                    showStatus(socialStatus, 'Social post moderation updated.');
                } catch (error) {
                    select.value = post.status;
                    showStatus(socialStatus, error.message, true);
                } finally {
                    select.disabled = false;
                }
            });
            actionCell.append(select);
            row.append(actionCell);
            socialPostsBody.append(row);
        });
    };

    loginForm?.addEventListener('submit', async event => {
        event.preventDefault();
        const submit = loginForm.querySelector('button[type="submit"]');
        submit.disabled = true;
        showStatus(loginStatus, 'Signing in…');
        try {
            await window.PelanoAdminApi.signIn(loginForm.email.value.trim(), loginForm.password.value);
            const quotes = await window.PelanoAdminApi.listQuotes();
            renderQuotes(Array.isArray(quotes) ? quotes : []);
            await refreshPosts();
            await refreshSocialPosts();
            loginPanel.hidden = true;
            dashboard.hidden = false;
            showStatus(dashboardStatus, `${quotes.length} quote request${quotes.length === 1 ? '' : 's'} loaded.`);
        } catch (error) {
            showStatus(loginStatus, error.message, true);
        } finally {
            submit.disabled = false;
        }
    });

    cmsForm?.addEventListener('submit', async event => {
        event.preventDefault();
        const submit = cmsForm.querySelector('[type="submit"]');
        submit.disabled = true;
        const form = new FormData(cmsForm);
        const title = String(form.get('title')).trim();
        const suppliedSlug = String(form.get('slug')).trim().toLowerCase();
        const slug = suppliedSlug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
        const image = String(form.get('image')).trim();
        if (image && !image.startsWith('images/')) {
            try {
                if (new URL(image).protocol !== 'https:') throw new Error();
            } catch {
                showStatus(cmsStatus, 'Use an HTTPS image URL or a local images/ path.', true);
                submit.disabled = false;
                return;
            }
        }
        try {
            await window.PelanoAdminApi.createPost({
                slug,
                title,
                category: String(form.get('category')).trim(),
                excerpt: String(form.get('excerpt')).trim(),
                content: String(form.get('content')).trim(),
                image: image || null,
                tags: String(form.get('tags')).split(',').map(tag => tag.trim()).filter(Boolean),
                author: String(form.get('author')).trim(),
                status: 'draft'
            });

            cmsForm.reset();
            cmsForm.elements.author.value = 'Pelano Resources Ltd';
            showStatus(cmsStatus, 'Draft saved.');
            await refreshPosts();
        } catch (error) {
            showStatus(cmsStatus, error.message, true);
        } finally {
            submit.disabled = false;
        }
    });

    socialPostForm?.addEventListener('submit', async event => {
        event.preventDefault();
        const form = new FormData(socialPostForm);
        const postUrl = String(form.get('post_url')).trim();
        const imageUrl = String(form.get('image_url')).trim();
        const isSecureUrl = value => {
            if (!value) return true;
            try { return new URL(value).protocol === 'https:'; } catch { return false; }
        };
        if (!isSecureUrl(postUrl) || !isSecureUrl(imageUrl)) {
            showStatus(socialStatus, 'Social post and image links must use HTTPS.', true);
            return;
        }
        const submit = socialPostForm.querySelector('[type="submit"]');
        submit.disabled = true;
        try {
            await window.PelanoAdminApi.createSocialPost({
                platform: String(form.get('platform')),
                caption: String(form.get('caption')).trim(),
                image_url: imageUrl || null,
                post_url: postUrl,
                status: 'pending'
            });
            socialPostForm.reset();
            showStatus(socialStatus, 'Post submitted as pending. Approve it after reviewing the content and rights.');
            await refreshSocialPosts();
        } catch (error) {
            showStatus(socialStatus, error.message, true);
        } finally {
            submit.disabled = false;
        }
    });

    logoutButton?.addEventListener('click', () => {
        window.PelanoAdminApi.signOut();
        dashboard.hidden = true;
        loginPanel.hidden = false;
        loginForm.reset();
        showStatus(loginStatus, 'Signed out.');
    });
})();
