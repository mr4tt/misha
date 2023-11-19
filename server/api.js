import { ref as _ref, child, get, onValue, set, once, runTransaction } from 'firebase/database';
import { get_db } from "./config";

/**
 * @template [T=any]
 * @typedef {(x: T) => any} Cb
 */

/**
 * @typedef {import('./types').RtdbSchema} Rtdb
 */

const PCS_PATH = 'pcs'
const USERS_PATH = 'users'
const ACTIVESESSIONS_PATH = 'active_sessions'
const PCLAYOUT_PATH = 'pc_layout'

/**
 * 
 * @param {string[]} path
 * @returns {import('firebase/database').DatabaseReference}
 */
function ref(...path) {
    return _ref(get_db(), path?.length ? path.join('/') : undefined)
}

/**
 * 
 * @param {Cb<Rtdb['pcs']>} cb
 */
export function listen_to_pcs(cb) {
    return onValue(ref(PCS_PATH), ss => {
        cb(ss.val())
    })
}

/**
 * 
 * @param {Cb<Rtdb['users']>} cb
 */
export function listen_to_users(cb) {
    return onValue(ref(USERS_PATH), ss => {
        console.log(ss.val())
        cb(ss.val())
    })
}

/**
 * 
 * @param {Cb<Rtdb['active_sessions']>} cb
 */
export function listen_to_active_sessions(cb) {
    return onValue(ref(ACTIVESESSIONS_PATH), ss => {
        cb(ss.val())
    })
}

/**
 * 
 * @param {Cb<Rtdb['pc_layout']['dimensions']>} cb 
 * @returns 
 */
export function listen_to_pc_layout_dimensions(cb) {
    return onValue(ref(PCLAYOUT_PATH, 'dimensions'), ss => {
        cb(ss.val())
    })
}

/**
 * 
 * @param {Cb<Rtdb['pc_layout']['pcs']>} cb 
 * @returns 
 */
export function listen_to_pc_layout_pcs(cb) {
    return onValue(ref(PCLAYOUT_PATH, 'pcs'), ss => {
        cb(ss.val())
    })
}

/**
 * 
 * @param {import('./types').StudentCardId} id 
 * @returns 
 */
export function register_user(id) {
    /** @type {import('./types').User} */
    const user = {
        uid: id
    }

    return set(ref(USERS_PATH, id), { uid: id })
}

/**
 * 
 * @param {import('./types').StudentCardId} user_id 
 * @param {import('./types').HumanReadablePcId} pc_id 
 */
export async function register_session(user_id, pc_id) {
    const user_lookup = await get(ref(USERS_PATH, user_id))
    if (!user_lookup.exists()) {
        register_user(user_id)
    }

    /** @type {import('./types').Session} */
    const session = {
        user: user_id,
        start_time: Date.now(),
    }

    set(ref(ACTIVESESSIONS_PATH, pc_id), session)
}

/**
 * 
 * @param {import('./types').StudentCardId} user_id 
 * @returns 
 */
export async function check_if_user_has_active_session(user_id) {
    const active_sessions = await get(ref(ACTIVESESSIONS_PATH))
    const user_has_active_session = Object.values(active_sessions.val())
        .some(session => session.user === user_id)
    
    return user_has_active_session
}

/**
 * 
 * @param {import('./types').HumanReadablePcId} pc_id 
 * @returns 
 */
export async function check_if_pc_has_active_session(pc_id) {
    const data = await get(ref(ACTIVESESSIONS_PATH, pc_id))
    return data.exists()
}