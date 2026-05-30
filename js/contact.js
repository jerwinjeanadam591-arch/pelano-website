/**
 * Contact Form Handler with Professional Validation & Security
 */

const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Get form values and sanitize them
        const rawData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            subject: document.getElementById('subject').value.trim(),
            message: document.getElementById('message').value.trim(),
            inquiryType: document.querySelector('#contact-form select')?.value || 'general'
        };

        // Sanitize input data
        const { sanitized, errors: sanitizationErrors } = Security.validateFormData(rawData);
        
        if (sanitizationErrors.length > 0) {
            Notify.error('Invalid input detected: ' + sanitizationErrors.join(' • '));
            return;
        }

        // Additional validation
        let errors = [];

        if (!Validation.required(sanitized.name)) {
            errors.push('Name is required');
        } else if (!Validation.minLength(sanitized.name, 2)) {
            errors.push('Name must be at least 2 characters');
        } else if (sanitized.name.length > 100) {
            errors.push('Name must be less than 100 characters');
        }

        if (!Validation.required(sanitized.email)) {
            errors.push('Email is required');
        } else if (!Validation.email(sanitized.email)) {
            errors.push('Please enter a valid email address');
        }

        if (sanitized.phone.length > 0) {
            if (!Validation.phone(sanitized.phone)) {
                errors.push('Please enter a valid phone number');
            }
        }

        if (!Validation.minLength(sanitized.message, 10)) {
            errors.push('Message must be at least 10 characters');
        } else if (sanitized.message.length > 2000) {
            errors.push('Message must be less than 2000 characters');
        }

        // Rate limiting check
        if (!Security.rateLimit.check('contact-form', 5, 60000)) {
            errors.push('Too many submission attempts. Please try again in a few minutes.');
        }

        // Show errors or submit
        if (errors.length > 0) {
            Notify.error(errors.join(' • '));
            return;
        }

        // Show processing message
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        // Simulate form submission (in real app, send to backend or service)
        setTimeout(() => {
            Notify.success('✓ Thank you! Your message has been sent successfully. We will contact you soon.');
            
            // Store message in localStorage for reference (sanitized data only)
            const messages = Storage.get('contact-messages') || [];
            messages.push({
                ...sanitized,
                timestamp: new Date().toISOString(),
                id: Date.now()
            });
            Storage.set('contact-messages', messages);
            
            // Reset form
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            // Analytics tracking
            if (typeof Analytics !== 'undefined') {
                Analytics.trackEvent('Contact', 'FormSubmitted', {
                    inquiry_type: sanitized.inquiryType
                });
            }
        }, 1500);
    });
}

// ===== FORM FIELD VALIDATION ON CHANGE =====
const formInputs = document.querySelectorAll('#contact-form input, #contact-form textarea');

formInputs.forEach(input => {
    input.addEventListener('change', () => {
        let isValid = true;
        let errorMessage = '';

        if (input.id === 'name') {
            isValid = Validation.required(input.value) && Validation.minLength(input.value, 2);
            errorMessage = 'Name must be at least 2 characters';
        } else if (input.id === 'email') {
            isValid = Validation.email(input.value);
            errorMessage = 'Invalid email address';
        } else if (input.id === 'phone' && input.value) {
            isValid = Validation.phone(input.value);
            errorMessage = 'Invalid phone number';
        } else if (input.id === 'message') {
            isValid = Validation.minLength(input.value, 10);
            errorMessage = 'Message must be at least 10 characters';
        }

        if (!isValid) {
            input.style.borderColor = '#e74c3c';
            input.setAttribute('aria-invalid', 'true');
            
            // Remove old error message
            const oldError = input.nextElementSibling;
            if (oldError && oldError.className === 'field-error') {
                oldError.remove();
            }
            
            // Add error message
            const errorDiv = document.createElement('small');
            errorDiv.className = 'field-error';
            errorDiv.style.cssText = 'color: #e74c3c; display: block; margin-top: 4px; font-size: 0.85rem;';
            errorDiv.textContent = errorMessage;
            input.parentNode.insertBefore(errorDiv, input.nextSibling);
        } else {
            input.style.borderColor = '';
            input.setAttribute('aria-invalid', 'false');
            
            // Remove error message
            const errorMsg = input.nextElementSibling;
            if (errorMsg && errorMsg.className === 'field-error') {
                errorMsg.remove();
            }
        }
    });
});
