import { useEffect } from 'react';

interface SeoProps {
    title: string;
    description: string;
    keywords?: string;
    ogImage?: string;
    twitterImage?: string;
    canonicalUrl?: string;
}

const updateMetaTag = (name: string, content: string) => {
    let element = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
    if (!element) {
        element = document.createElement('meta');
        element.setAttribute('name', name);
        document.head.appendChild(element);
    }
    element.setAttribute('content', content);
};

const updatePropertyMetaTag = (property: string, content: string) => {
    let element = document.querySelector<HTMLMetaElement>(`meta[property="${property}"]`);
    if (!element) {
        element = document.createElement('meta');
        element.setAttribute('property', property);
        document.head.appendChild(element);
    }
    element.setAttribute('content', content);
};

const updateLinkTag = (rel: string, href: string) => {
    let element = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
    if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        document.head.appendChild(element);
    }
    element.setAttribute('href', href);
}

export const useSeo = ({ title, description, keywords, ogImage, twitterImage, canonicalUrl }: SeoProps) => {
    useEffect(() => {
        document.title = title;

        if (description) {
            updateMetaTag('description', description);
            updatePropertyMetaTag('og:description', description);
            updatePropertyMetaTag('twitter:description', description);
        }

        if (title) {
            updatePropertyMetaTag('og:title', title);
            updatePropertyMetaTag('twitter:title', title);
        }

        if (keywords) {
            updateMetaTag('keywords', keywords);
        }

        if (ogImage) {
            updatePropertyMetaTag('og:image', ogImage);
        }

        if (twitterImage) {
            updatePropertyMetaTag('twitter:image', twitterImage);
        }

        if (canonicalUrl) {
            updateLinkTag('canonical', canonicalUrl);
            updatePropertyMetaTag('og:url', canonicalUrl);
        }

    }, [title, description, keywords, ogImage, twitterImage, canonicalUrl]);
};
