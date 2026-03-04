// SPDX-FileCopyrightText: 2026 roro
// SPDX-License-Identifier: GPL-3.0-or-later

import type { State } from "../../types/state"
import { asyncPipe } from "../../utils/async-pipe"
import { parseState } from "../core/parse"
import { validateState } from "../core/validate"
import { readState } from "../io/read"

/**
 * Read, parse and validate state
 */
export const loadState = async (): Promise<State> => {
    const pipeline = asyncPipe(readState, parseState, validateState)

    return pipeline(undefined as never)
}
