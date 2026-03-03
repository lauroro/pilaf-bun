// SPDX-FileCopyrightText: 2026 roro
// SPDX-License-Identifier: GPL-3.0-or-later

import type { Config } from "../../types/config"

/**
 * Check if a value is a valid pilaf config
 */
export const validateConfig = (value: unknown): Config => {
    try {
        if (typeof value !== "object" || value === null) throw new Error()

        const config = value as Record<string, unknown>

        if (!Array.isArray(config.targets)) throw new Error()
        if (!Array.isArray(config.commands)) throw new Error()

        if (!config.targets.every((v) => typeof v === "string"))
            throw new Error()
        if (!config.commands.every((v) => typeof v === "string"))
            throw new Error()

        return value as Config
    } catch (err) {
        throw new Error("invalid config")
    }
}
