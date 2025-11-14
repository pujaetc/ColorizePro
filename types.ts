
export const navItems = ['Tool', 'FAQ', 'About Us', 'Contact'] as const;
export type Page = typeof navItems[number];
