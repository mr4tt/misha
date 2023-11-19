/**
 * the human-readable "id" of a PC (e.g. `A1`, `A2`, ...)
 */
export type HumanReadablePcId = string;
/**
 * a date, as the number of ms from whatever date 1970 (i.e. date.getTime() / new Date(time))
 */
export type DateMs = number;
export type RtdbSchema = {
    pcs: Record<HumanReadablePcId, Pc>;
    users: Record<StudentCardId, User>;
    active_sessions: Record<HumanReadablePcId, Session>;
    pc_layout: PcLayout;
};
export type Pc = {
    hrid: HumanReadablePcId;
};
/**
 * this is an id card id, NOT the pid
 */
export type StudentCardId = string;
export type User = {
    uid: StudentCardId;
};
/**
 * a gaming session
 */
export type Session = {
    user: StudentCardId;
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
    pcs: Record<HumanReadablePcId, Coordinate>;
};
