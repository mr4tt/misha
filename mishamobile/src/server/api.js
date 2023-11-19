import {
  ref as _ref,
  child,
  get,
  onValue,
  set,
  once,
  runTransaction,
} from 'firebase/database';
import {get_db} from './config';

/**
 * @template [T=any]
 * @typedef {(x: T) => any} Cb
 */

/**
 * @typedef {import('./types').RtdbSchema} Rtdb
 */

const PCS_PATH = 'pcs';
const INACTIVEPCS_PATH = 'inactive_pcs';
const USERS_PATH = 'users';
const ACTIVESESSIONS_PATH = 'active_sessions';
const PCLAYOUT_PATH = 'pc_layout';

/**
 *
 * @param {string[]} path
 * @returns {import('firebase/database').DatabaseReference}
 */
function ref(...path) {
  return _ref(get_db(), path?.length ? path.join('/') : undefined);
}

/**
 *
 * @param {Cb<Rtdb['pcs']>} cb
 */
export function listen_to_pcs(cb) {
  return onValue(ref(PCS_PATH), ss => {
    cb(ss.val());
  });
}

/**
 *
 * @param {Cb<Rtdb['inactive_pcs']>} cb
 */
export function listen_to_inactive_pcs(cb) {
  return onValue(ref(INACTIVEPCS_PATH), ss => {
    cb(ss.val());
  });
}

/**
 *
 * @param {Cb<Rtdb['users']>} cb
 */
export function listen_to_users(cb) {
  return onValue(ref(USERS_PATH), ss => {
    console.log(ss.val());
    cb(ss.val());
  });
}

/**
 *
 * @param {Cb<Rtdb['active_sessions']>} cb
 */
export function listen_to_active_sessions(cb) {
  return onValue(ref(ACTIVESESSIONS_PATH), ss => {
    cb(ss.val());
  });
}

/**
 *
 * @param {Cb<Rtdb['pc_layout']['dimensions']>} cb
 * @returns
 */
export function listen_to_pc_layout_dimensions(cb) {
  return onValue(ref(PCLAYOUT_PATH, 'dimensions'), ss => {
    cb(ss.val());
  });
}

/**
 *
 * @param {Cb<Rtdb['pc_layout']['pcs']>} cb
 * @returns
 */
export function listen_to_pc_layout_pcs(cb) {
  return onValue(ref(PCLAYOUT_PATH, 'pcs'), ss => {
    cb(ss.val());
  });
}

/**
 *
 * @param {import('./types').StudentCardId} id
 * @returns
 */
export function register_user(id) {
  /** @type {import('./types').User} */
  const user = {
    uid: id,
  };

  return set(ref(USERS_PATH, id), {uid: id});
}

/**
 *
 * @param {import('./types').StudentCardId} user_id
 * @param {import('./types').HumanReadablePcId} pc_id
 */
export async function register_session(user_id, pc_id) {
  const user_lookup = await get(ref(USERS_PATH, user_id));
  if (!user_lookup.exists()) {
    register_user(user_id);
  }

  /** @type {import('./types').Session} */
  const session = {
    user: user_id,
    start_time: Date.now(),
  };

  set(ref(ACTIVESESSIONS_PATH, pc_id), session);
}

/**
 * end session with the given PC id (NOT user id. use end_session_by_user instead for that.)
 * @param {import('./types').HumanReadablePcId} pc_id
 */
export async function end_session(pc_id) {
  set(ref(ACTIVESESSIONS_PATH, pc_id), null);
}

/**
 * end active session associated with a given user
 * @param {import('./types').StudentCardId} user_id
 */
export function end_session_by_user(user_id) {
  // return runTransaction(ref(ACTIVESESSIONS_PATH), (data) => {
  //     console.log({ data });
  //     const val = data.val();
  //     for (const pc_id in val) {
  //         if (val?.[pc_id]?.user === user_id) {
  //             val[pc_id] = null;
  //         }
  //     }
  //     return data;
  // });

  // delete all sessions associated with this user

  return get(ref(ACTIVESESSIONS_PATH)).then(ss => {
    const val = ss.val();
    for (const pc_id in val) {
      if (val?.[pc_id]?.user === user_id) {
        set(ref(ACTIVESESSIONS_PATH, pc_id), null);
      }
    }
  });
}

/**
 *
 * @param {import('./types').StudentCardId} user_id
 * @returns
 */
export async function check_if_user_has_active_session(user_id) {
  const active_sessions = await get(ref(ACTIVESESSIONS_PATH));
  const user_has_active_session = Object.values(active_sessions.val()).some(
    session => session.user === user_id,
  );

  return user_has_active_session;
}

/**
 *
 * @param {import('./types').HumanReadablePcId} pc_id
 * @returns
 */
export async function check_if_pc_has_active_session(pc_id) {
  const data = await get(ref(ACTIVESESSIONS_PATH, pc_id));
  return data.exists();
}

/**
 * hardcoded database seeding.
 * DO NOT USE THIS IN DEPLOYED CODE
 */
export function seed() {
  const rc = (r, c) => ({r, c});
  const pc_locs = {
    A1: rc(7, 0),
    A2: rc(7, 1),
    A3: rc(7, 2),
    A4: rc(7, 3),
    A5: rc(7, 4),
    B1: rc(5, 0),
    B2: rc(5, 1),
    B3: rc(5, 2),
    B4: rc(5, 3),
    B5: rc(5, 4),
    C1: rc(3, 0),
    C2: rc(3, 1),
    C3: rc(3, 2),
    C4: rc(3, 3),
    C5: rc(3, 4),
    C6: rc(3, 5),
    D1: rc(1, 0),
    D2: rc(1, 1),
    D3: rc(1, 2),
    D4: rc(1, 3),
    D5: rc(1, 4),
    D6: rc(1, 5),
    E1: rc(1, 7),
    E2: rc(3, 7),
    E3: rc(5, 7),
    E4: rc(7, 7),
  };
  const seed_users = ['misha'];
  const pc = id => ({id});
  const u = uid => ({uid});
  set(ref(), {
    pcs: Object.fromEntries(Object.keys(pc_locs).map(id => [id, pc(id)])),
    inactive_pcs: {
      E2: true,
    },
    users: Object.fromEntries(seed_users.map(id => [id, u(id)])),
    active_sessions: {
      B2: {
        user: 'misha',
        start_time: Date.now(),
      },
    },
    pc_layout: {
      dimensions: {rows: 9, cols: 8},
      pcs: pc_locs,
    },
  });
}
