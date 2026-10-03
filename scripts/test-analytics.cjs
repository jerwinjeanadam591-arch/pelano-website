const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const source = fs.readFileSync(path.join(__dirname, '..', 'js', 'analytics.js'), 'utf8');

function createEnvironment(measurementId = '') {
    const stored = new Map();
    const nodes = new Map();
    const scripts = [];
    let notice;

    class MockElement {
        constructor(dataset = {}) {
            this.dataset = dataset;
        }

        closest(selector) {
            return selector === '[data-analytics-consent]' && this.dataset.analyticsConsent ? this : null;
        }
    }

    const document = {
        body: {
            append(element) {
                nodes.set(element.id, element);
                if (element.id === 'analytics-consent-notice') notice = element;
            }
        },
        head: { append: script => scripts.push(script) },
        addEventListener() {},
        createElement(tagName) {
            return {
                tagName,
                listeners: {},
                addEventListener(type, listener) {
                    this.listeners[type] = listener;
                },
                setAttribute() {},
                querySelector() {
                    return { focus() {} };
                }
            };
        },
        getElementById(id) {
            return nodes.get(id) || null;
        },
        querySelectorAll() {
            return [];
        }
    };
    const window = {
        PelanoAnalyticsConfig: { measurementId },
        location: { pathname: '/test-page.html' },
        dataLayer: []
    };
    const context = {
        window,
        document,
        Element: MockElement,
        localStorage: {
            getItem: key => stored.get(key) || null,
            setItem: (key, value) => stored.set(key, value)
        },
        console
    };
    vm.runInNewContext(source, context, { filename: 'analytics.js' });

    return {
        window,
        scripts,
        consent(value) {
            assert.ok(notice, 'consent notice should be rendered when a measurement ID is configured');
            notice.listeners.click({
                target: new MockElement({ analyticsConsent: value })
            });
        }
    };
}

test('analytics remains disabled and makes no network request by default', () => {
    const environment = createEnvironment();
    assert.equal(environment.window.PelanoAnalytics.isConfigured, false);
    assert.equal(environment.window.PelanoAnalytics.track('contact_click', { channel: 'email' }), false);
    assert.equal(environment.scripts.length, 0);
    assert.equal(environment.window.dataLayer.length, 0);
});

test('placeholder measurement IDs are rejected without showing consent or loading Google scripts', () => {
    const environment = createEnvironment('G-TEST123');
    assert.equal(environment.window.PelanoAnalytics.isConfigured, false);
    assert.equal(environment.scripts.length, 0);
    assert.equal(environment.window.PelanoAnalytics.track('contact_click', { channel: 'email' }), false);
});

test('unconsented and rejected visitors are not measured', () => {
    const environment = createEnvironment('G-1A2B3C4D5E');
    assert.equal(environment.scripts.length, 0);
    assert.equal(environment.window.PelanoAnalytics.track('lead_magnet_download', { asset_name: 'guide.html' }), false);
    environment.consent('denied');
    assert.equal(environment.scripts.length, 0);
    assert.equal(environment.window.PelanoAnalytics.hasConsent(), false);
    assert.equal(environment.window.PelanoAnalytics.track('contact_click', { channel: 'email' }), false);
});

test('analytics loads only after opt-in and filters personal event parameters', () => {
    const environment = createEnvironment('G-1A2B3C4D5E');
    environment.consent('granted');
    assert.equal(environment.scripts.length, 1);
    assert.equal(environment.scripts[0].src, 'https://www.googletagmanager.com/gtag/js?id=G-1A2B3C4D5E');
    assert.equal(environment.window.PelanoAnalytics.hasConsent(), true);
    assert.equal(environment.window.PelanoAnalytics.track('lead_magnet_download', {
        asset_name: 'timber-guide.html',
        email: 'private@example.com'
    }), true);
    const serializedEvents = JSON.stringify(environment.window.dataLayer);
    assert.match(serializedEvents, /timber-guide\.html/);
    assert.doesNotMatch(serializedEvents, /private@example\.com/);
});
