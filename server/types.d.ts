/**
 * the human-readable "id" of a PC (e.g. `A1`, `A2`, ...)
 */
export type PcId = string;
/**
 * this is an id card id, NOT the pid
 */
export type UserId = string;
/**
 * a date, as the number of ms from whatever date 1970 (i.e. date.getTime() / new Date(time))
 */
export type DateMs = number;
export type RtdbSchema = {
    pcs: Record<PcId, Pc>;
    inactive_pcs: Record<PcId, true>;
    users: Record<UserId, User>;
    active_sessions: Record<PcId, Session>;
    pc_layout: PcLayout;
};
export type Pc = {
    hrid: PcId;
};
export type User = {
    uid: UserId;
};
/**
 * a gaming session
 */
export type Session = {
    user: UserId;
    start_time: DateMs;
};
export type Dimensions = {
    rows: number;
    cols: number;
};
export type Coordinate = {
    r: number;
    c: number;
};
export type PcLayout = {
    dimensions: Dimensions;
    pcs: Record<PcId, Coordinate>;
};
