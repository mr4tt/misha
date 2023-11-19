/**
 *
 * @param {Cb<Rtdb['pcs']>} cb
 */
export function listen_to_pcs(cb: Cb<Rtdb['pcs']>): import("@firebase/database").Unsubscribe;
/**
 *
 * @param {Cb<Rtdb['inactive_pcs']>} cb
 */
export function listen_to_inactive_pcs(cb: Cb<Rtdb['inactive_pcs']>): import("@firebase/database").Unsubscribe;
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
 * @param {Cb<Rtdb['pc_layout']['pcs']>} cb
 * @returns
 */
export function listen_to_pc_layout_pcs(cb: Cb<Rtdb['pc_layout']['pcs']>): import("@firebase/database").Unsubscribe;
/**
 *
 * @param {import('./types').StudentCardId} id
 * @returns
 */
export function register_user(id: any): Promise<void>;
/**
 *
 * @param {import('./types').StudentCardId} user_id
 * @param {import('./types').HumanReadablePcId} pc_id
 */
export function register_session(user_id: any, pc_id: any): Promise<void>;
/**
 * end session with the given PC id (NOT user id. use end_session_by_user instead for that.)
 * @param {import('./types').HumanReadablePcId} pc_id
 */
export function end_session(pc_id: any): Promise<void>;
/**
 * end active session associated with a given user
 * @param {import('./types').StudentCardId} user_id
 */
export function end_session_by_user(user_id: any): Promise<import("@firebase/database").TransactionResult>;
/**
 *
 * @param {import('./types').StudentCardId} user_id
 * @returns
 */
export function check_if_user_has_active_session(user_id: any): Promise<boolean>;
/**
 *
 * @param {import('./types').HumanReadablePcId} pc_id
 * @returns
 */
export function check_if_pc_has_active_session(pc_id: any): Promise<boolean>;
/**
 * hardcoded database seeding.
 * DO NOT USE THIS IN DEPLOYED CODE
 */
export function seed(): void;
export type Cb<T = any> = (x: T) => any;
export type Rtdb = import('./types').RtdbSchema;
