import { site } from '@/config/site';

export function whatsappLink(message: string = site.contact.whatsappMessage): string {
  return `https://wa.me/${site.contact.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const instagramLink = `https://www.instagram.com/${site.contact.instagram}/`;
export const emailLink = `mailto:${site.contact.email}`;
