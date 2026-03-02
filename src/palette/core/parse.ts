// SPDX-FileCopyrightText: 2026 roro
// SPDX-License-Identifier: GPL-3.0-or-later

import { YAML } from "bun"
import { BASE16_KEYS } from "../../types/base16-key"
import type { PaletteColors } from "../../types/palette"

/**
 * Parse colors from a palette content
 */
export const parseColors = (content: string): PaletteColors => {
    const parsedContent = YAML.parse(content) as PaletteColors
    const colors = {} as PaletteColors
    for (const key of BASE16_KEYS) {
        colors[key] = parsedContent[key]
    }
    return colors
}
