// SPDX-FileCopyrightText: 2026 roro
// SPDX-License-Identifier: GPL-3.0-or-later

import { PATHS } from "../../config/paths"
import type { State } from "../../types/state"

/**
 * Write a state to filesystem
 */
export const writeState = async (state: State) => {
    Bun.write(PATHS.STATE, JSON.stringify(state, null, 4))
}
