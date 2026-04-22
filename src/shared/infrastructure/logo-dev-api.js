const logoApiUrl = import.meta.env.VITE_LOGO_API_URL;
const apiKey = import.meta.env.VITE_LOGO_PUBLISHABLE_API_KEY;

export class LogoDevApi {
    getUrlToLogo(domain) {
        return `${logoApiUrl}/${new URL(domain).host}?token=${apiKey}`;
    }
}