// SPDX-FileCopyrightText: 2026 roro
// SPDX-License-Identifier: GPL-3.0-or-later

import type { Config } from "../../types/config"

/**
 * Check if a value is a valid pilaf config
 */
export const validateConfig = (value: unknown): value is Config => {
    if (typeof value !== "object" || value === null) return false

    const config = value as Record<string, unknown>

    if (!Array.isArray(config.targets)) return false
    if (!Array.isArray(config.commands)) return false

    if (!config.targets.every((v) => typeof v === "string")) return false
    if (!config.commands.every((v) => typeof v === "string")) return false

    return true
}
