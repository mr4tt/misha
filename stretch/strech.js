const fs = require("fs");

function parseCSV(str) {
    let UNAVAILABLE_PREFIX = "UNAVAILABLE_";
    let rows = str.split("\n");
    let num_rows = rows.length;

    let grid = [];
    for (let i = 0; i < num_rows; i++) {
        grid.push(rows[i].split(","));
    }

    let num_cols = grid[0].length;

    let pc_layout = {};
    pc_layout["dimensions"] = {
        cols: num_cols,
        rows: num_rows,
    };
    pc_layout["pcs"] = {};

    let inactive_pcs = {};

    let pcs = {};
    for (let i = 0; i < num_rows; i++) {
        for (let j = 0; j < num_cols; j++) {
            if (grid[i][j] === "" || grid[i][j] === "_" || grid[i][j] === "\r") {
                continue;
            } else if (grid[i][j].startsWith(UNAVAILABLE_PREFIX)) {
                let name = grid[i][j].substring(UNAVAILABLE_PREFIX.length);
                inactive_pcs[name] = true;
                pc_layout["pcs"][name] = { r: i, c: j };
                pcs[name] = name;
            } else {
                pc_layout["pcs"][grid[i][j]] = { r: i, c: j };

                pcs[grid[i][j]] = grid[i][j];
            }
        }
    }

    return [pc_layout, inactive_pcs, pcs];
    // replace old values with these new values. Delete everything else(so just active sessions and users)
}

// num queued can be 0 if we choose not to implement that
function queue_time(active_sessions, pcs, inactive_pcs, num_queued) {
    let wait_time = 0;
    let available_pcs =
        Object.keys(pcs).length - Object.keys(inactive_pcs).length - Object.keys(active_sessions).length - num_queued;

    while (available_pcs <= 0) {
        let min_time = Date.now() * 2;
        let min_session = null;

        if (Object.keys(active_sessions).length !== 0) {
            for (let session in active_sessions) {
                if (active_sessions[session].start_time < min_time) {
                    min_time = active_sessions[session].start_time;
                    min_session = session;
                }
            }

            delete active_sessions[min_session];

            wait_time += min_time + 1000 * 60 * 60 * 2 - Date.now();
        } else {
            wait_time += 1000 * 60 * 60 * 2; // 2 hrs
        }

        available_pcs += 1;
    }

    return wait_time;
}

fs.readFile("test.csv", "utf8", function (err, contents) {
    let [pc_layout, inactive_pcs, pcs] = parseCSV(contents);
    console.log(pc_layout);
    console.log(inactive_pcs);
    console.log(pcs);

    let active_sessions = {};
    for (let i = 0; i < 21; i++) {
        active_sessions[i] = {
            start_time: Date.now() - Math.random() * 1000 * 60 * 60 * 2,
        };
    }

    let wait_time = queue_time(active_sessions, pcs, inactive_pcs, 3);
    console.log(wait_time / 1000 / 60, "minutes");
});
