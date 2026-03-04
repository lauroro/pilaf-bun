// SPDX-FileCopyrightText: 2026 roro
// SPDX-License-Identifier: GPL-3.0-or-later

import { isHexColor } from "../../utils/is-hex-color"
import { BASE16_KEYS } from "../../types/base16-key"
import type { Palette } from "../../types/palette"

/**
 * Validate and return a Palette.
 * Throws if invalid.
 */
export const validatePalette = (value: unknown): Palette => {
    if (typeof value !== "object" || value === null)
        throw new Error("invalid palette")

    const palette = value as Record<string, unknown>

    if (typeof palette.name !== "string") throw new Error("invalid palette")

    if (typeof palette.colors !== "object" || palette.colors === null)
        throw new Error("invalid palette")

    const colors = palette.colors as Record<string, unknown>

    for (const key of BASE16_KEYS) {
        if (!isHexColor(colors[key])) throw new Error("invalid palette")
    }

    const seen = new Set<string>()
    for (const key of BASE16_KEYS) {
        const color = colors[key] as string
        if (seen.has(color)) throw new Error("invalid palette")
        seen.add(color)
    }

    return value as Palette
}
