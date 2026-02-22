// SPDX-FileCopyrightText: 2026 roro
// SPDX-License-Identifier: GPL-3.0-or-later

import { BASE16_KEYS } from "../../types/base16-key"
import type { Palette, HexColor } from "../../types/palette"

const isValidHex = (value: string): boolean => /^#?[0-9A-Fa-f]{6}$/.test(value)

/**
 * Check if a given base16 palette is:
 * - complete
 * - without duplicates
 * - made of all valid HEX colors
 */
export const validatePalette = (palette: Palette): boolean => {
    if (!BASE16_KEYS.every((key) => key in palette.colors)) return false
    if (!palette.name) return false

    const seenColors = new Set<HexColor>()

    for (const key of BASE16_KEYS) {
        const color = palette.colors[key]

        if (!isValidHex(color)) return false

        if (seenColors.has(color)) return false

        seenColors.add(color)
    }

    return true
}
