/**
 *
 * @param {Cb<Rtdb['pcs']>} cb
 */
export function listen_to_pcs(cb: Cb<Rtdb['pcs']>): import("@firebase/database").Unsubscribe;
/**
 *
 * @param {Cb<Rtdb['users']>} cb
 */
export function listen_to_users(cb: Cb<Rtdb['users']>): import("@firebase/database").Unsubscribe;
/**
 *
 * @param {Cb<Rtdb['active_sessions']>} cb
 */
export function listen_to_active_sessions(cb: Cb<Rtdb['active_sessions']>): import("@firebase/database").Unsubscribe;
/**
 *
 * @param {Cb<Rtdb['pc_layout']['dimensions']>} cb
 * @returns
 */
export function listen_to_pc_layout_dimensions(cb: Cb<Rtdb['pc_layout']['dimensions']>): import("@firebase/database").Unsubscribe;
/**
 *
 * @param {import('./types').StudentCardId} id
 * @returns
 */
export function register_user(id: import('./types').StudentCardId): Promise<void>;
/**
 *
 * @param {import('./types').StudentCardId} user_id
 * @param {import('./types').HumanReadablePcId} pc_id
 */
export function register_session(user_id: import('./types').StudentCardId, pc_id: import('./types').HumanReadablePcId): Promise<void>;
export type Cb<T = any> = (x: T) => any;
export type Rtdb = import('./types').RtdbSchema;
