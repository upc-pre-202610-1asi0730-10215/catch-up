/**
 * @fileoverview Logo.dev API gateway — shared infrastructure service.
 *
 * Provides a thin wrapper around the Logo.dev REST API for resolving a
 * company logo image URL from a domain hostname.
 *
 * @module shared/infrastructure/logo-dev-api
 */

const logoApiUrl = import.meta.env.VITE_LOGO_API_URL;
const apiKey = import.meta.env.VITE_LOGO_PUBLISHABLE_API_KEY;

/**
 * Infrastructure gateway that communicates with the Logo.dev Logo API.
 *
 * This service is shared across bounded contexts and should be accessed
 * exclusively through the infrastructure layer to keep domain entities
 * free from remote-service concerns.
 */
export class LogoDevApi {
    /**
     * Builds a fully-qualified Logo.dev image URL for the given website domain.
     *
     * The returned URL points directly to the company's logo image and can be
     * embedded in an `<img>` element or passed to an avatar component.
     *
     * @param {string} domain - The full URL (e.g. `"https://bbc.com"`) or hostname
     *   of the organisation whose logo is required. The `host` portion is extracted
     *   automatically via the `URL` constructor.
     * @returns {string} A fully-qualified Logo.dev CDN URL including the API token.
     * @example
     * const api = new LogoDevApi();
     * api.getUrlToLogo('https://bbc.com');
     * // → 'https://img.logo.dev/bbc.com?token=pk_...'
     */
    getUrlToLogo(domain) {
        return `${logoApiUrl}/${new URL(domain).host}?token=${apiKey}`;
    }
}