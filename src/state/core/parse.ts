// SPDX-FileCopyrightText: 2026 roro
// SPDX-License-Identifier: GPL-3.0-or-later

import type { State } from "../../types/state"

/**
 * Transform a state file content in a state object.
 */
export const parseState = (content: string): State => {
    const parsed = JSON.parse(content) as State
    return parsed
}
