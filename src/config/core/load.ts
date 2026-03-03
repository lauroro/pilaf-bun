// SPDX-FileCopyrightText: 2026 roro
// SPDX-License-Identifier: GPL-3.0-or-later

import { readConfig } from "../io/read"
import { parseConfig } from "./parse"
import { normalizeConfig } from "./normalize"
import { validateConfig } from "./validate"
import type { Config } from "../../types/config"
import { asyncPipe } from "../../utils/async-pipe"

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
