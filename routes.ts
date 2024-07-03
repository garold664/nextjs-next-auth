/**
 * An array of public routes
 * These routes are accessible without authentication
 * @type {string[]}
 */

export const publicRoutes = ['/'];

/**
 * An array of routes that used for authentication
 * These routes will redirect to the settings page
 * @type {string[]}
 */
export const authRoutes = ['/auth/login', '/auth/signup'];

/**
 * The prefix of routes that used for API authentication
 * Routes that start with this prefix are used for authentication purposes
 * @type {string}
 */

export const apiAuthPrefix = '/api/auth';

/**
 * The default login redirect
 * @type {string}
 */

export const DEFAULT_LOGIN_REDIRECT = '/settings';
