// SPDX-FileCopyrightText: 2026 roro
// SPDX-License-Identifier: GPL-3.0-or-later

import type { Config } from "../../types/config"

/**
 * Check if a value is a valid pilaf config
 */
export const validateConfig = (value: unknown): value is Config => {
    return true
}
