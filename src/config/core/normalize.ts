// SPDX-FileCopyrightText: 2026 roro
// SPDX-License-Identifier: GPL-3.0-or-later

import { env } from "bun"
import type { Config } from "../../types/config"

/**
 * Normalize config:
 * - expand home
 */
export const normalizeConfig = (config: Config): Config => {
    const targets = config.targets.map((target) => {
        if (target.startsWith("~")) {
            return target.replace("~", env.HOME!)
        }
        return target
    })

    return {
        targets,
        commands: config.commands,
    }
}
