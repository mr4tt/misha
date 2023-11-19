export {}

/**
 * the human-readable "id" of a PC (e.g. `A1`, `A2`, ...)
 * 
 * @typedef {string} HumanReadablePcId
 */

/**
 * a date, as the number of ms from whatever date 1970 (i.e. date.getTime() / new Date(time))
 * @typedef {number} DateMs 
 */

/**
 * @typedef {{
 *  pcs: Record<HumanReadablePcId, Pc>,
 *  users: Record<StudentCardId, User>,
 *  active_sessions: Record<HumanReadablePcId, Session>,
 *  pc_layout: PcLayout,
 * }} RtdbSchema
 */

/**
 * @typedef {{
 *  hrid: HumanReadablePcId,
 * }} Pc
 */

/**
 * this is an id card id, NOT the pid
 * @typedef {string} StudentCardId
 */

/** 
 * @typedef {{
 *  uid: StudentCardId,
 * }} User
 */

/**
 * a gaming session
 * 
 * @typedef {{
 *  user: StudentCardId,
 *  start_time: DateMs,
 * }} Session
 */

/**
 * @typedef {{ r: number, c: number }} Coordinate
 * 
 * @typedef {{
 *  dimensions: {
 *      rows: number, 
 *      cols: number,
 *  },
 *  pcs: Record<HumanReadablePcId, Coordinate>,
 * }} PcLayout
 */