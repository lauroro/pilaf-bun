// SPDX-FileCopyrightText: 2026 roro
// SPDX-License-Identifier: GPL-3.0-or-later

import { YAML } from "bun"
import type { Config } from "../../types/config"

/**
 * Parse YAML config content
 */
export const parseConfig = (content: string): Config => {
    const parsed = YAML.parse(content) as Config
    return parsed
}
