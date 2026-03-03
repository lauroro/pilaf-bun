// SPDX-FileCopyrightText: 2026 roro
// SPDX-License-Identifier: GPL-3.0-or-later

import type { Config } from "../../types/config"
import { asyncPipe } from "../../utils/async-pipe"
import { normalizeConfig } from "../core/normalize"
import { parseConfig } from "../core/parse"
import { validateConfig } from "../core/validate"
import { readConfig } from "../io/read"

/**
 * Read, parse, validate and normalize configuration.
 */
export const loadConfig = async (): Promise<Config> => {
    const pipeline = asyncPipe(
        readConfig,
        parseConfig,
        validateConfig,
        normalizeConfig
    )

    // pass undefined as never as a type hack
    // to bypass the input requirement as
    // readConfig has no input
    return pipeline(undefined as never)
}
