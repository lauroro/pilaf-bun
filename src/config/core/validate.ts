// SPDX-FileCopyrightText: 2026 roro
// SPDX-License-Identifier: GPL-3.0-or-later

import type { Config } from "../../types/config"

/**
 * Check if a value is a valid pilaf config
 */
export const validateConfig = (value: unknown): Config => {
    if (typeof value !== "object" || value === null)
        throw new Error("invalid config")

    const config = value as Record<string, unknown>

    if (
        !Array.isArray(config.targets) ||
        !config.targets.every((v) => typeof v === "string")
    )
        throw new Error("invalid config")

    if (
        config.commands !== undefined &&
        (!Array.isArray(config.commands) ||
            !config.commands.every((v) => typeof v === "string"))
    )
        throw new Error("invalid config")

    return value as Config
}
