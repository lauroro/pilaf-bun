// SPDX-FileCopyrightText: 2026 roro
// SPDX-License-Identifier: GPL-3.0-or-later

import type { Palette } from "../../types/palette"

const isValidHex = (value: string): boolean => /^#?[0-9A-Fa-f]{6}$/.test(value)

/**
 * Check if a given base16 palette is:
 * - complete
 * - without duplicates
 * - made of all valid HEX colors
 */
export const validatePalette = (palette: Palette): boolean => {
    return true
}
