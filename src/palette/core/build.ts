// SPDX-FileCopyrightText: 2026 roro
// SPDX-License-Identifier: GPL-3.0-or-later

import type { Palette, PaletteColors } from "../../types/palette"

/**
 * Build a palette object
 */
export const buildPalette = (name: string, colors: PaletteColors): Palette => {
    return {
        name,
        colors,
    }
}
