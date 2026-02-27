// SPDX-FileCopyrightText: 2026 roro
// SPDX-License-Identifier: GPL-3.0-or-later

import { YAML } from "bun"
import { BASE16_KEYS } from "../../types/base16-key"
import type { Palette, PaletteColors } from "../../types/palette"

/**
 * Transform a palette name and file content in a palette object.
 */
export const parsePalette = (name: string, content: string): Palette => {
    const parsedContent = YAML.parse(content) as PaletteColors
    const colors = {} as PaletteColors
    for (const key of BASE16_KEYS) {
        colors[key] = parsedContent[key]
    }
    return {
        name,
        colors,
    }
}
