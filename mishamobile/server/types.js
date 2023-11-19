export {}

/**
 * the human-readable "id" of a PC (e.g. `A1`, `A2`, ...)
 * 
 * @typedef {string} PcId
 */

/**
 * this is an id card id, NOT the pid
 * @typedef {string} UserId
 */

/**
 * a date, as the number of ms from whatever date 1970 (i.e. date.getTime() / new Date(time))
 * @typedef {number} DateMs 
 */

/**
 * @typedef {{
 *  pcs: Record<PcId, Pc>,
 *  inactive_pcs: Record<PcId, true>,
 *  users: Record<UserId, User>,
 *  active_sessions: Record<PcId, Session>,
 *  pc_layout: PcLayout,
 * }} RtdbSchema
 */

/**
 * @typedef {{
 *  hrid: PcId,
 * }} Pc
 */

/** 
 * @typedef {{
 *  uid: UserId,
 * }} User
 */

/**
 * a gaming session
 * 
 * @typedef {{
 *  user: UserId,
 *  start_time: DateMs,
 * }} Session
 */

/**
 * @typedef {{ rows: number, cols: number }} Dimensions
 * @typedef {{ r: number, c: number }} Coordinate
 * 
 * @typedef {{
 *  dimensions: Dimensions,
 *  pcs: Record<PcId, Coordinate>,
 * }} PcLayout
 */