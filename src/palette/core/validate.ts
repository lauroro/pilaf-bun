// SPDX-FileCopyrightText: 2026 roro
// SPDX-License-Identifier: GPL-3.0-or-later

import { isHexColor } from "../../color/core/is-hex-color"
import { BASE16_KEYS } from "../../types/base16-key"
import type { Palette } from "../../types/palette"

/**
 * Check if a given value is a valid base16 Palette
 */
export const validatePalette = (value: unknown): value is Palette => {
    if (typeof value !== "object" || value === null) return false

    const palette = value as Record<string, unknown>

    if (typeof palette.name !== "string") return false

    if (typeof palette.colors !== "object" || palette.colors === null)
        return false

    const colors = palette.colors as Record<string, unknown>

    for (const key of BASE16_KEYS) {
        if (!isHexColor(colors[key])) return false
    }

    const seen = new Set<string>()
    for (const key of BASE16_KEYS) {
        const color = colors[key] as string
        if (seen.has(color)) return false
        seen.add(color)
    }

    return true
}
