// SPDX-FileCopyrightText: 2026 roro
// SPDX-License-Identifier: GPL-3.0-or-later

import { BASE16_KEYS } from "../../types/base16-key"
import type { Palette, PaletteColors } from "../../types/palette"

/**
 * Return a normalized palette:
 *  - no #
 *  - lowercase hex
 */
export const normalizePalette = (palette: Palette): Palette => {
    const colors = {} as PaletteColors
    for (const key of BASE16_KEYS) {
        const value = palette.colors[key]
        const normalized = value.replace(/^#+/, "").toLowerCase()
        colors[key] = normalized
    }
    return {
        name: palette.name,
        colors,
    }
}
