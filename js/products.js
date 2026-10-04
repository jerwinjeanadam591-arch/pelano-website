// ===== PRODUCT FILTERING =====
const filterBtns = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');

function getEnglishText(element) {
    if (!element) return '';
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
    const text = [];
    while (walker.nextNode()) {
        const node = walker.currentNode;
        text.push(node.__pelanoEnglishText ?? node.nodeValue);
    }
    return text.join('').trim();
}

if (filterBtns.length > 0 && productCards.length > 0) {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-btn');
    const resultsStatus = document.getElementById('product-results-status');
    let activeCategory = 'all';

    const filterProducts = () => {
        const searchTerm = searchInput?.value.trim().toLocaleLowerCase() || '';
        let visibleCount = 0;
        productCards.forEach(card => {
            const title = getEnglishText(card.querySelector('.product-info h3')).toLocaleLowerCase();
            const description = getEnglishText(card.querySelector('.product-description')).toLocaleLowerCase();
            const matchesCategory = activeCategory === 'all' || card.dataset.category === activeCategory;
            const matchesSearch = !searchTerm || `${title} ${description}`.includes(searchTerm);
            const visible = matchesCategory && matchesSearch;
            card.classList.toggle('hidden', !visible);
            card.setAttribute('aria-hidden', String(!visible));
            if (visible) visibleCount += 1;
        });
        if (resultsStatus) {
            resultsStatus.textContent = visibleCount === 0
                ? 'No products match your search.'
                : `${visibleCount} product${visibleCount === 1 ? '' : 's'} shown`;
        }
    };

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(filter => filter.classList.remove('active'));
            btn.classList.add('active');
            activeCategory = btn.dataset.category || 'all';
            filterProducts();
        });
    });

    const industryCategories = {
        construction: 'timber',
        telecom: 'telecom',
        utilities: 'utility',
        railways: 'sleepers',
        agriculture: 'timber',
        logistics: 'pallets'
    };
    const requestedIndustry = new URLSearchParams(window.location.search).get('industry')?.toLowerCase();
    const requestedCategory = industryCategories[requestedIndustry];
    const requestedFilter = [...filterBtns].find(button => button.dataset.category === requestedCategory);
    if (requestedFilter) {
        filterBtns.forEach(filter => filter.classList.remove('active'));
        requestedFilter.classList.add('active');
        activeCategory = requestedCategory;
    }

    searchInput?.addEventListener('input', filterProducts);
    searchButton?.addEventListener('click', () => {
        filterProducts();
        searchInput?.focus();
    });
    filterProducts();
}

// ===== PRODUCT MODAL/LIGHTBOX =====
const modal = document.getElementById('product-modal');
const closeBtn = document.querySelector('.close');
const detailsBtns = document.querySelectorAll('.btn-details');
let activeProductCard = null;

// Open modal
if (detailsBtns.length > 0 && modal) {
    const procurementPrompts = {
        timber: [
            'Intended use and exposure conditions',
            'Required dimensions, grade or project specification',
            'Treatment requirements defined by your project team',
            'Estimated quantity and delivery destination'
        ],
        utility: [
            'Intended network application',
            'Required length, class or project specification',
            'Treatment and documentation requirements',
            'Estimated quantity, destination and timeframe'
        ],
        telecom: [
            'Network application and project standard',
            'Required length, class or technical specification',
            'Treatment and inspection documentation',
            'Estimated quantity and delivery destination'
        ],
        pallets: [
            'Required dimensions and handling equipment',
            'Load requirements and intended use',
            'Any packaging or transport requirements',
            'Estimated quantity and delivery destination'
        ],
        sleepers: [
            'Intended railway or industrial application',
            'Required dimensions and applicable project standard',
            'Treatment and inspection requirements',
            'Estimated quantity and delivery destination'
        ]
    };

    detailsBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const productCard = btn.closest('.product-card');
            activeProductCard = productCard;
            const title = getEnglishText(productCard?.querySelector('.product-info h3'));
            const description = getEnglishText(productCard?.querySelector('.product-description'));
            const image = productCard?.querySelector('.product-image');

            if (!title || !description || !image) {
                console.error('Unable to open product details: product card is incomplete.', btn);
                return;
            }

            document.getElementById('modal-title').textContent = title;
            const modalImage = document.getElementById('modal-image');
            modalImage.src = image.currentSrc || image.src;
            modalImage.alt = image.dataset.pelanoEnglishAlt || image.alt || title;
            document.getElementById('modal-description').textContent = description;

            const promptList = document.getElementById('modal-procurement-prompts');
            if (promptList) {
                promptList.replaceChildren();
                (procurementPrompts[productCard.dataset.category] || procurementPrompts.timber).forEach(prompt => {
                    const item = document.createElement('li');
                    item.textContent = window.SiteTools?.translate(prompt) || prompt;
                    promptList.append(item);
                });
            }
            const productSheetLink = document.getElementById('modal-product-sheet');
            if (productSheetLink) {
                productSheetLink.href = `downloads/product-catalogue.html#${productCard.dataset.category}`;
            }
            modal.hidden = false;
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            document.querySelector('.close')?.focus();
        });
    });
}

// Close modal
if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => {
        modal.hidden = true;
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        activeProductCard?.querySelector('.btn-details')?.focus();
    });
}

if (modal) {
    modal.addEventListener('keydown', event => {
        if (event.key === 'Escape') {
            modal.hidden = true;
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            activeProductCard?.querySelector('.btn-details')?.focus();
            return;
        }
        if (event.key !== 'Tab') return;
        const focusable = [...modal.querySelectorAll('button, a[href], [tabindex]:not([tabindex="-1"])')]
            .filter(element => !element.hasAttribute('disabled') && !element.hidden);
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
        }
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.hidden = true;
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            activeProductCard?.querySelector('.btn-details')?.focus();
        }
    });
}

// ===== QUOTE BUILDER & PRODUCT COMPARISON =====
function initializeQuoteWizard(form, selectedProductsContainer, status) {
    if (!form || !selectedProductsContainer || !status) return null;

    const fieldGrid = form.querySelector('.rfq-field-grid');
    const productFieldset = form.querySelector('.rfq-products');
    const consent = form.querySelector('.rfq-consent');
    const privacy = form.querySelector('.rfq-privacy-note');
    const actions = form.querySelector('.rfq-actions');
    if (!fieldGrid || !productFieldset || !consent || !privacy || !actions) {
        console.error('The quote wizard could not initialize because required form sections are missing.', form);
        return null;
    }

    const fields = [...fieldGrid.querySelectorAll('.form-group')];
    const fieldNames = group => group.querySelector('input, select, textarea')?.name || '';
    const panels = [];
    const formHeading = form.closest('.rfq-section')?.querySelector('h2');
    const progress = document.createElement('div');
    progress.className = 'rfq-wizard-progress';
    progress.setAttribute('role', 'progressbar');
    progress.setAttribute('aria-valuemin', '1');
    progress.setAttribute('aria-valuemax', '4');
    progress.setAttribute('aria-live', 'polite');
    progress.setAttribute('aria-valuenow', '1');

    const createPanel = (step, title, description, content) => {
        const panel = document.createElement('section');
        panel.className = 'rfq-wizard-step';
        panel.dataset.wizardStep = String(step);
        panel.setAttribute('aria-labelledby', `rfq-step-${step}-title`);
        const heading = document.createElement('h3');
        heading.id = `rfq-step-${step}-title`;
        heading.tabIndex = -1;
        heading.textContent = title;
        const help = document.createElement('p');
        help.className = 'rfq-wizard-help';
        help.textContent = description;
        panel.append(heading, help, ...content);
        panels.push(panel);
        return panel;
    };

    const projectGrid = document.createElement('div');
    projectGrid.className = 'rfq-field-grid';
    const contactGrid = document.createElement('div');
    contactGrid.className = 'rfq-field-grid';
    fields.forEach(group => {
        const name = fieldNames(group);
        (['quantity', 'location', 'timeline', 'specifications'].includes(name) ? projectGrid : contactGrid).append(group);
    });

    const productPanel = createPanel(1, 'Choose products', 'Select one or more catalogue products before continuing.', [productFieldset]);
    const projectPanel = createPanel(2, 'Project requirements', 'Share what you know. The team can confirm missing specifications with you.', [projectGrid]);
    const contactPanel = createPanel(3, 'Your contact details', 'Provide details so the team can respond to your enquiry.', [contactGrid, consent, privacy]);
    const review = document.createElement('dl');
    review.className = 'rfq-review';
    const reviewPanel = createPanel(4, 'Review your enquiry', 'Check the details before choosing how to send your request.', [review, actions]);
    const navigation = document.createElement('div');
    navigation.className = 'rfq-wizard-navigation';
    const back = document.createElement('button');
    back.type = 'button';
    back.className = 'btn btn-secondary';
    back.textContent = 'Back';
    back.dataset.wizardBack = '';
    const next = document.createElement('button');
    next.type = 'button';
    next.className = 'btn btn-primary';
    next.textContent = 'Continue';
    next.dataset.wizardNext = '';
    navigation.append(back, next);

    form.replaceChildren(
        progress,
        productPanel,
        projectPanel,
        contactPanel,
        reviewPanel,
        navigation,
        status
    );
    form.classList.add('rfq-wizard');

    let currentStep = 1;
    let complete = false;
    const updateReview = () => {
        review.replaceChildren();
        const productNames = [...selectedProductsContainer.querySelectorAll('.rfq-product-chip > span:first-child')]
            .map(item => item.textContent.trim())
            .filter(Boolean);
        const entries = [
            ['Products', productNames.length ? productNames.join(', ') : 'No products selected'],
            ...fields.map(group => {
                const input = group.querySelector('input[name="phone"]')
                    || group.querySelector('input, select, textarea');
                const label = group.querySelector('label')?.textContent.trim() || input?.name || '';
                let value = input?.value.trim();
                if (input?.name === 'phone') value = PelanoPhone.getFullNumber(form);
                if (input?.name === 'quantity' && value) {
                    value = `${value} ${group.querySelector('[name="quantity_unit"]')?.value || 'pieces'}`;
                }
                return [label, value || 'Not provided'];
            })
        ];
        entries.forEach(([label, value]) => {
            const term = document.createElement('dt');
            const detail = document.createElement('dd');
            term.textContent = label;
            detail.textContent = value;
            review.append(term, detail);
        });
    };

    const showStep = (step, moveFocus = true) => {
        currentStep = step;
        complete = step === 4;
        panels.forEach((panel, index) => {
            panel.hidden = index + 1 !== step;
            panel.querySelectorAll('input, select, textarea').forEach(input => {
                if (input.dataset.wizardRequired === undefined) {
                    input.dataset.wizardRequired = String(input.required);
                }
                input.required = index + 1 === step && input.dataset.wizardRequired === 'true';
            });
        });
        progress.setAttribute('aria-valuenow', String(step));
        progress.textContent = `Step ${step} of 4: ${panels[step - 1].querySelector('h3').textContent}`;
        back.disabled = step === 1;
        next.hidden = step === 4;
        if (step === 4) {
            updateReview();
        }
        if (moveFocus) panels[step - 1].querySelector('h3').focus();
    };

    back.addEventListener('click', () => {
        if (currentStep > 1) showStep(currentStep - 1);
    });
    next.addEventListener('click', () => {
        if (currentStep === 1 && !selectedProductsContainer.querySelector('.rfq-product-chip')) {
            status.textContent = 'Add at least one product to continue.';
            selectedProductsContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }
        if (currentStep === 3) {
            const invalid = [...panels[2].querySelectorAll('input, select, textarea')].find(input => !input.checkValidity());
            if (invalid) {
                invalid.reportValidity();
                return;
            }
        }
        status.textContent = '';
        showStep(Math.min(4, currentStep + 1));
    });
    form.addEventListener('input', () => {
        if (currentStep === 4) updateReview();
        if (currentStep === 3) complete = false;
    });
    showStep(1, false);

    return {
        isComplete: () => currentStep === 4 && complete,
        reset() {
            showStep(1, false);
        }
    };
}

if (productCards.length > 0) {
            const selectedProducts = new Map();
            const comparisonProducts = new Set();
            const selectedProductsContainer = document.getElementById('rfq-selected-products');
            const quoteForm = document.getElementById('rfq-form');
            const quoteStatus = document.getElementById('rfq-status');
            const quoteWizard = initializeQuoteWizard(quoteForm, selectedProductsContainer, quoteStatus);
            const pdfButton = document.getElementById('download-quote-pdf');
            let latestQuote = null;
            const language = () => window.SiteTools?.currentLanguage() === 'sw';
            const categoryNames = {
                timber: { en: 'Treated timber', sw: 'Mbao zilizotibiwa' },
                utility: { en: 'Utility poles', sw: 'Nguzo za umeme' },
                telecom: { en: 'Telecom poles', sw: 'Nguzo za mawasiliano' },
                pallets: { en: 'Pallets', sw: 'Paleti' },
                sleepers: { en: 'Railway sleepers', sw: 'Vishikio vya reli' }
            };

            const renderQuoteProducts = () => {
                if (!selectedProductsContainer) return;
                selectedProductsContainer.replaceChildren();
                if (selectedProducts.size === 0) {
                    const empty = document.createElement('p');
                    empty.textContent = language()
                        ? 'Bado hujachagua bidhaa. Ongeza bidhaa kutoka kwenye orodha hapo juu.'
                        : 'No products selected yet. Add products from the catalogue above.';
                    selectedProductsContainer.append(empty);
                    return;
                }
                selectedProducts.forEach((product, id) => {
                    const chip = document.createElement('span');
                    chip.className = 'rfq-product-chip';
                    const label = document.createElement('span');
                    label.textContent = window.SiteTools?.translate(product.title) || product.title;
                    const remove = document.createElement('button');
                    remove.type = 'button';
                    remove.textContent = '×';
                    remove.setAttribute('aria-label', `${language() ? 'Ondoa' : 'Remove'} ${window.SiteTools?.translate(product.title) || product.title}`);
                    remove.addEventListener('click', () => {
                        selectedProducts.delete(id);
                        document.querySelector(`.rfq-add-button[data-product-id="${CSS.escape(id)}"]`)?.setAttribute('aria-pressed', 'false');
                        renderQuoteProducts();
                    });
                    chip.append(label, remove);
                    selectedProductsContainer.append(chip);
                });
            };

            const addProductToQuote = card => {
                const id = card.dataset.product || '';
                const title = getEnglishText(card.querySelector('.product-info h3'));
                const description = getEnglishText(card.querySelector('.product-description'));
                if (!id || !title || !description) {
                    console.error('Cannot add an incomplete product card to the quote request.', card);
                    return;
                }
                selectedProducts.set(id, { id, title, description, category: card.dataset.category || '' });
                const addButton = card.querySelector('.rfq-add-button');
                addButton?.setAttribute('aria-pressed', 'true');
                renderQuoteProducts();
                quoteStatus && (quoteStatus.textContent = '');
                if (quoteForm) quoteForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
            };

            productCards.forEach(card => {
                const id = card.dataset.product || card.querySelector('.btn-details')?.dataset.product;
                if (!id) {
                    console.error('Product card is missing its product identifier and cannot be added to quote or comparison.', card);
                    return;
                }
                card.dataset.product = id;
                const productInfo = card.querySelector('.product-info');
                if (!productInfo) {
                    console.error('Product card is missing its information section.', card);
                    return;
                }
                const productTitle = getEnglishText(productInfo.querySelector('h3'));

                const actions = document.createElement('div');
                actions.className = 'product-business-actions';
                const addButton = document.createElement('button');
                addButton.type = 'button';
                addButton.className = 'rfq-add-button';
                addButton.dataset.productId = id;
                addButton.textContent = language() ? 'Ongeza kwenye ombi la bei' : 'Add to quote';
                addButton.setAttribute('aria-pressed', 'false');
                addButton.addEventListener('click', () => addProductToQuote(card));

                const compareLabel = document.createElement('label');
                compareLabel.className = 'compare-select';
                const compareInput = document.createElement('input');
                compareInput.type = 'checkbox';
                compareInput.value = id;
                compareInput.setAttribute('aria-label', `${language() ? 'Linganisha' : 'Compare'} ${window.SiteTools?.translate(productTitle) || productTitle}`);
                compareInput.addEventListener('change', () => {
                    if (compareInput.checked && comparisonProducts.size >= 3) {
                        compareInput.checked = false;
                        if (typeof Notify !== 'undefined') Notify.warning(language() ? 'Chagua hadi bidhaa 3 kulinganisha.' : 'Choose up to 3 products to compare.');
                        return;
                    }
                    if (compareInput.checked) comparisonProducts.add(id);
                    else comparisonProducts.delete(id);
                    updateComparisonBar();
                });
                const compareText = document.createElement('span');
                compareText.textContent = language() ? 'Linganisha' : 'Compare';
                compareLabel.append(compareInput, compareText);
                actions.append(addButton, compareLabel);
                productInfo.append(actions);
            });

            const comparisonBar = document.createElement('div');
            comparisonBar.className = 'comparison-bar';
            comparisonBar.hidden = true;
            comparisonBar.innerHTML = `<p></p><button type="button"></button>`;
            document.body.append(comparisonBar);
            const compareCount = comparisonBar.querySelector('p');
            const compareButton = comparisonBar.querySelector('button');

            const updateComparisonBar = () => {
                comparisonBar.hidden = comparisonProducts.size === 0;
                document.body.classList.toggle('comparison-active', comparisonProducts.size > 0);
                compareCount.textContent = `${comparisonProducts.size} ${language() ? 'bidhaa zimechaguliwa' : 'products selected'}`;
                compareButton.textContent = language() ? 'Linganisha bidhaa ulizochagua' : 'Compare selected products';
            };
            compareButton.addEventListener('click', () => {
                if (comparisonProducts.size < 2) {
                    if (typeof Notify !== 'undefined') Notify.info(language() ? 'Chagua angalau bidhaa 2 kulinganisha.' : 'Choose at least 2 products to compare.');
                    return;
                }
                openComparison();
            });

            const comparisonDialog = document.createElement('dialog');
            comparisonDialog.className = 'comparison-dialog';
            comparisonDialog.setAttribute('aria-labelledby', 'comparison-title');
            document.body.append(comparisonDialog);
            const openComparison = () => {
                const products = [...comparisonProducts].map(id => selectedProducts.has(id)
                    ? selectedProducts.get(id)
                    : (() => {
                        const card = [...productCards].find(item => item.dataset.product === id);
                        return card ? {
                            id,
                            title: getEnglishText(card.querySelector('.product-info h3')),
                            description: getEnglishText(card.querySelector('.product-description')),
                            category: card.dataset.category || ''
                        } : null;
                    })()).filter(Boolean);
                const swahili = language();
                comparisonDialog.replaceChildren();
                const header = document.createElement('div');
                header.className = 'comparison-dialog-header';
                const title = document.createElement('h2');
                title.id = 'comparison-title';
                title.textContent = swahili ? 'Ulinganisho wa bidhaa' : 'Product comparison';
                const close = document.createElement('button');
                close.type = 'button';
                close.textContent = '×';
                close.setAttribute('aria-label', swahili ? 'Funga' : 'Close');
                close.addEventListener('click', () => comparisonDialog.close());
                header.append(title, close);

                const tableWrap = document.createElement('div');
                tableWrap.className = 'comparison-table-wrap';
                const table = document.createElement('table');
                table.className = 'comparison-table';
                const tableHead = document.createElement('thead');
                const headRow = document.createElement('tr');
                const blankHeading = document.createElement('th');
                blankHeading.scope = 'col';
                headRow.append(blankHeading);
                products.forEach(product => {
                    const cell = document.createElement('th');
                    cell.scope = 'col';
                    cell.textContent = window.SiteTools?.translate(product.title) || product.title;
                    headRow.append(cell);
                });
                tableHead.append(headRow);
                const tableBody = document.createElement('tbody');
                const rows = [
                    { label: swahili ? 'Aina' : 'Category', value: product => categoryNames[product.category]?.[swahili ? 'sw' : 'en'] || product.category },
                    { label: swahili ? 'Maelezo' : 'Description', value: product => window.SiteTools?.translate(product.description) || product.description },
                    { label: swahili ? 'Vipimo na matibabu' : 'Specifications and treatment', value: () => swahili ? 'Thibitisha mahitaji haya kwa oda yako.' : 'Confirm these requirements for your order.' },
                    { label: swahili ? 'Bei na upatikanaji' : 'Price and availability', value: () => swahili ? 'Thibitisha kwa timu yetu.' : 'Confirm with our team.' }
                ];
                rows.forEach(row => {
                    const tr = document.createElement('tr');
                    const labelCell = document.createElement('th');
                    labelCell.scope = 'row';
                    labelCell.textContent = row.label;
                    tr.append(labelCell);
                    products.forEach(product => {
                        const valueCell = document.createElement('td');
                        valueCell.textContent = row.value(product);
                        tr.append(valueCell);
                    });
                    tableBody.append(tr);
                });
                table.append(tableHead, tableBody);
                tableWrap.append(table);
                comparisonDialog.append(header, tableWrap);
                comparisonDialog.showModal();
            };

            comparisonDialog.addEventListener('click', event => {
                if (event.target === comparisonDialog) comparisonDialog.close();
            });

            document.getElementById('modal-add-to-quote')?.addEventListener('click', () => {
                if (activeProductCard) addProductToQuote(activeProductCard);
                modal.hidden = true;
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            });

            document.addEventListener('pelano:languagechange', event => {
                const swahili = event.detail.language === 'sw';
                productCards.forEach(card => {
                    const addButton = card.querySelector('.rfq-add-button');
                    if (addButton) addButton.textContent = swahili ? 'Ongeza kwenye ombi la bei' : 'Add to quote';
                    const compare = card.querySelector('.compare-select span');
                    if (compare) compare.textContent = swahili ? 'Linganisha' : 'Compare';
                    const compareInput = card.querySelector('.compare-select input');
                    if (compareInput) {
                        const productName = window.SiteTools?.translate(getEnglishText(card.querySelector('h3'))) || getEnglishText(card.querySelector('h3'));
                        compareInput.setAttribute('aria-label', `${swahili ? 'Linganisha' : 'Compare'} ${productName}`);
                    }
                });
                updateComparisonBar();
                renderQuoteProducts();
            });

            quoteForm?.addEventListener('submit', async event => {
                event.preventDefault();
                const submitter = event.submitter;
                const channel = submitter?.dataset.rfqChannel === 'whatsapp' ? 'whatsapp' : 'email';
                if (quoteWizard && !quoteWizard.isComplete()) {
                    quoteStatus.textContent = language()
                        ? 'Tafadhali kamilisha hatua zote za fomu ya ombi.'
                        : 'Please complete all quote steps before continuing.';
                    return;
                }
                if (selectedProducts.size === 0) {
                    quoteStatus.textContent = language()
                        ? 'Hakuna bidhaa iliyochaguliwa. Ongeza angalau bidhaa moja kabla ya kuandaa ombi la bei.'
                        : 'No products selected. Add at least one product before preparing your quote request.';
                    document.getElementById('rfq-selected-products')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    return;
                }
                if (!quoteForm.reportValidity()) return;

                const values = Object.fromEntries(new FormData(quoteForm).entries());
                const email = String(values.email || '').trim();
                const phone = PelanoPhone.getFullNumber(quoteForm);
                const quantityValue = String(values.quantity || '').trim();
                const quantity = quantityValue
                    ? `${quantityValue} ${String(values.quantity_unit || 'pieces')}`
                    : '';
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                    quoteStatus.textContent = language() ? 'Tafadhali weka anwani sahihi ya barua pepe.' : 'Please enter a valid email address.';
                    return;
                }
                const productList = [...selectedProducts.values()];
                const reference = window.SiteTools?.createReference(productList.map(product => product.title), channel);
                if (!reference) {
                    quoteStatus.textContent = language() ? 'Imeshindikana kutengeneza kumbukumbu. Tafadhali jaribu tena.' : 'Unable to create a reference. Please try again.';
                    return;
                }
                const labels = language()
                    ? { reference: 'Kumbukumbu', products: 'Bidhaa', name: 'Jina', company: 'Kampuni', email: 'Barua pepe', phone: 'Simu', quantity: 'Kiasi', location: 'Mahali pa kupeleka', timeline: 'Muda unaohitajika', specifications: 'Maelezo ya vipimo na mradi' }
                    : { reference: 'Reference', products: 'Products', name: 'Name', company: 'Company', email: 'Email', phone: 'Phone', quantity: 'Estimated quantity', location: 'Delivery location', timeline: 'Required timeframe', specifications: 'Dimensions / treatment / project details' };
                const fields = [
                    [labels.reference, reference.code],
                    [labels.products, productList.map(product => window.SiteTools?.translate(product.title) || product.title).join(', ')],
                    [labels.name, values.name],
                    [labels.company, values.company],
                    [labels.email, email],
                    [labels.phone, phone],
                    [labels.quantity, quantity],
                    [labels.location, values.location],
                    [labels.timeline, values.timeline],
                    [labels.specifications, values.specifications]
                ].filter(([, value]) => String(value || '').trim());
                const quotePayload = {
                    reference_code: reference.code,
                    channel,
                    name: String(values.name).trim(),
                    company: String(values.company || '').trim() || null,
                    email,
                    phone: phone || null,
                    quantity: quantity || null,
                    delivery_location: String(values.location || '').trim() || null,
                    required_timeline: String(values.timeline || '').trim() || null,
                    specifications: String(values.specifications || '').trim() || null,
                    products: productList.map(product => ({
                        id: product.id,
                        title: product.title,
                        category: product.category,
                        description: product.description
                    }))
                };
                latestQuote = {
                    reference: reference.code,
                    createdAt: new Date().toLocaleString(),
                    ...quotePayload
                };
                if (pdfButton) pdfButton.disabled = false;
                if (window.PelanoQuoteApi?.isConfigured) {
                    try {
                        await window.PelanoQuoteApi.submitQuote(quotePayload);
                        window.PelanoAnalytics?.track('quote_submitted', { channel });
                    } catch (error) {
                        console.error('Secure quote submission was unavailable; continuing with the selected handoff.', error);
                        window.PelanoAnalytics?.track('quote_submission_fallback', { channel });
                    }
                }
                const subject = `${language() ? 'Ombi la bei' : 'Quote request'} ${reference.code}`;
                const body = fields.map(([label, value]) => `${label}: ${String(value).trim()}`).join('\n');
                const destination = channel === 'whatsapp'
                    ? `https://wa.me/255755885888?text=${encodeURIComponent(`${subject}\n\n${body}`)}`
                    : `mailto:pelanotz@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                window.PelanoAnalytics?.track('contact_handoff_prepared', { channel, form: 'product_quote' });
                quoteStatus.textContent = language()
                    ? `${translationsMessage(true)} ${reference.code}`
                    : `${translationsMessage(false)} ${reference.code}`;
                if (channel === 'whatsapp') window.open(destination, '_blank', 'noopener,noreferrer');
                else window.location.href = destination;
                quoteWizard?.reset();
            });

            quoteForm.querySelectorAll('[data-rfq-channel]').forEach(button => {
                button.disabled = false;
            });

            const escapeHtml = value => String(value ?? '')
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#039;');

            pdfButton?.addEventListener('click', () => {
                if (!latestQuote) return;
                const products = latestQuote.products.map(product => `<li><strong>${escapeHtml(product.title)}</strong><br><span>${escapeHtml(product.description)}</span></li>`).join('');
                const details = [
                    ['Name', latestQuote.name],
                    ['Company', latestQuote.company],
                    ['Email', latestQuote.email],
                    ['Phone / WhatsApp', latestQuote.phone],
                    ['Estimated quantity', latestQuote.quantity],
                    ['Delivery location', latestQuote.delivery_location],
                    ['Required timeframe', latestQuote.required_timeline],
                    ['Project details', latestQuote.specifications]
                ].filter(([, value]) => value).map(([label, value]) => `<div><dt>${escapeHtml(label)}</dt><dd>${escapeHtml(value)}</dd></div>`).join('');
                const printWindow = window.open('', '_blank', 'noopener,noreferrer');
                if (!printWindow) {
                    quoteStatus.textContent = 'Allow pop-ups to open the quotation PDF view.';
                    return;
                }
                printWindow.document.write(`<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Quotation ${escapeHtml(latestQuote.reference)}</title><style>
                    @page { size: A4; margin: 18mm; } body { font: 14px Arial, sans-serif; color: #16312d; line-height: 1.5; } header { display: flex; justify-content: space-between; border-bottom: 3px solid #4caf50; padding-bottom: 16px; } h1 { color: #1b5a34; margin: 0; } h2 { margin-top: 28px; color: #1b5a34; } .meta { text-align: right; } dl { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px 28px; } dt { font-weight: 700; color: #56645d; } dd { margin: 2px 0 0; } li { margin: 8px 0; } footer { margin-top: 42px; padding-top: 12px; border-top: 1px solid #cbd5d1; color: #56645d; font-size: 12px; } @media print { .print-note { display: none; } }
                </style></head><body><header><div><h1>Pelano Resources Ltd</h1><div>Quotation request summary</div></div><div class="meta"><strong>${escapeHtml(latestQuote.reference)}</strong><br>${escapeHtml(latestQuote.createdAt)}</div></header><h2>Customer details</h2><dl>${details}</dl><h2>Requested products</h2><ul>${products}</ul><footer>This document summarizes an enquiry and is not a final price quotation. Pelano Resources will confirm specifications, availability, delivery and pricing separately.<br><span class="print-note">Use your browser print dialog and choose “Save as PDF”.</span></footer><script>window.addEventListener('load', () => window.print());<\/script></body></html>`);
                printWindow.document.close();
                window.PelanoAnalytics?.track('quote_pdf_opened', { reference: latestQuote.reference });
            });

            function translationsMessage(swahili) {
                return swahili
                    ? 'Namba ya kumbukumbu ya ombi imetengenezwa. Barua pepe au WhatsApp itafunguka; namba hii haithibitishi kuwa Pelano Resources imepokea ujumbe.'
                    : 'An enquiry reference has been created. Your email or WhatsApp app will open next; the reference does not confirm receipt by Pelano Resources.';
            }
}

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.style.display === 'block') {
        modal.hidden = true;
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});