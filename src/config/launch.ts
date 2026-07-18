/**
 * Marketing-site hero toggle (PRD §4.7): one fixed layout, two states.
 * Flip this flag to go waitlist → live — no rebuild of the page structure.
 */
export type LaunchState = 'waitlist' | 'live';

export const LAUNCH_STATE: LaunchState = 'waitlist';
