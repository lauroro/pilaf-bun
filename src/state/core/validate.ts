// SPDX-FileCopyrightText: 2026 roro
// SPDX-License-Identifier: GPL-3.0-or-later

import { isHexColor } from "../../utils/is-hex-color"
import { BASE16_KEYS } from "../../types/base16-key"
import type { State } from "../../types/state"

/**
 * Validate and return a State.
 * Throws if invalid.
 */
export const validateState = (value: unknown): State => {
    if (typeof value !== "object" || value === null)
        throw new Error("invalid state")

    const state = value as Record<string, unknown>

    if (typeof state.createdAt !== "string") throw new Error("invalid state")

    const date = new Date(state.createdAt)
    if (Number.isNaN(date.getTime())) throw new Error("invalid state")

    if (date.toISOString() !== state.createdAt) throw new Error("invalid state")

    if (
        typeof state.currentPalette !== "object" ||
        state.currentPalette === null
    )
        throw new Error("invalid state")

    const palette = state.currentPalette as Record<string, unknown>

    if (typeof palette.name !== "string") throw new Error("invalid state")

    if (typeof palette.colors !== "object" || palette.colors === null)
        throw new Error("invalid state")

    const colors = palette.colors as Record<string, unknown>

    for (const key of BASE16_KEYS) {
        if (!isHexColor(colors[key])) throw new Error("invalid state")
    }

    return value as State
}
