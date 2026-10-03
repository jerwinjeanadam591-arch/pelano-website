(() => {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    const status = document.getElementById('contact-status');
    const language = () => window.SiteTools?.currentLanguage() === 'sw';

    contactForm.addEventListener('submit', event => {
        event.preventDefault();
        if (!contactForm.reportValidity()) return;

        if (typeof Security !== 'undefined' && !Security.rateLimit.check('contact-form', 5, 60000)) {
            status.textContent = language()
                ? 'Maombi mengi yamejaribiwa. Tafadhali subiri dakika chache kabla ya kujaribu tena.'
                : 'Too many attempts. Please wait a few minutes before trying again.';
            return;
        }

        const values = Object.fromEntries(new FormData(contactForm).entries());
        const name = String(values.name || '').trim();
        const email = String(values.email || '').trim();
        const phone = PelanoPhone.getFullNumber(contactForm);
        const inquiryType = String(values.subject || '').trim();
        const message = String(values.message || '').trim();
        const channel = event.submitter?.dataset.contactChannel === 'whatsapp' ? 'whatsapp' : 'email';

        if (name.length < 2 || name.length > 100 || message.length < 10 || message.length > 2000) {
            status.textContent = language()
                ? 'Tafadhali hakikisha jina lina herufi 2–100 na ujumbe una herufi 10–2,000.'
                : 'Please check that your name is 2–100 characters and your message is 10–2,000 characters.';
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            status.textContent = language() ? 'Tafadhali weka anwani sahihi ya barua pepe.' : 'Please enter a valid email address.';
            return;
        }
        if (phone && !/^\+[1-9]\d{6,14}$/.test(phone)) {
            status.textContent = language() ? 'Tafadhali weka namba sahihi ya simu.' : 'Please enter a valid phone number.';
            return;
        }

        const reference = window.SiteTools?.createReference([], channel);
        if (!reference) {
            status.textContent = language()
                ? 'Imeshindikana kutengeneza kumbukumbu. Tafadhali jaribu tena.'
                : 'Unable to create a reference. Please try again.';
            return;
        }
        const labels = language()
            ? { name: 'Jina', email: 'Barua pepe', phone: 'Simu', type: 'Aina ya ombi', message: 'Ujumbe', reference: 'Kumbukumbu' }
            : { name: 'Name', email: 'Email', phone: 'Phone', type: 'Inquiry type', message: 'Message', reference: 'Reference' };
        const subject = `${language() ? 'Ombi' : 'Enquiry'} ${reference.code} - ${inquiryType}`;
        const body = [
            [labels.reference, reference.code],
            [labels.name, name],
            [labels.email, email],
            [labels.phone, phone],
            [labels.type, inquiryType],
            [labels.message, message]
        ].filter(([, value]) => value).map(([label, value]) => `${label}: ${value}`).join('\n\n');
        const destination = channel === 'whatsapp'
            ? `https://wa.me/255755885888?text=${encodeURIComponent(`${subject}\n\n${body}`)}`
            : `mailto:info@pelanoresources.co.tz?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        window.PelanoAnalytics?.track('contact_handoff_prepared', { channel, form: 'contact' });
        status.textContent = language()
            ? `Kumbukumbu ${reference.code} imetengenezwa. Programu uliyochagua itafunguka; namba hii haithibitishi kupokelewa kwa ujumbe.`
            : `Reference ${reference.code} created. Your chosen app will open; this does not confirm message receipt.`;

        if (channel === 'whatsapp') window.open(destination, '_blank', 'noopener,noreferrer');
        else window.location.href = destination;
    });

    contactForm.querySelectorAll('[data-contact-channel]').forEach(button => {
        button.disabled = false;
    });
})();
