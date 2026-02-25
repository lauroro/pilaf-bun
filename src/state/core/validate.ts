// SPDX-FileCopyrightText: 2026 roro
// SPDX-License-Identifier: GPL-3.0-or-later

import { isHexColor } from "../../color/core/is-hex-color"
import { BASE16_KEYS } from "../../types/base16-key"
import type { State } from "../../types/state"

export const validateState = (value: unknown): value is State => {
    if (typeof value !== "object" || value === null) return false

    const state = value as Record<string, unknown>

    if (typeof state.createdAt !== "string") return false

    const date = new Date(state.createdAt)
    if (Number.isNaN(date.getTime())) return false
    if (date.toISOString() !== state.createdAt) return false

    if (
        typeof state.currentPalette !== "object" ||
        state.currentPalette === null
    )
        return false

    const palette = state.currentPalette as Record<string, unknown>

    if (typeof palette.name !== "string") return false

    if (typeof palette.colors !== "object" || palette.colors === null)
        return false

    const colors = palette.colors as Record<string, unknown>

    for (const key of BASE16_KEYS) {
        if (!isHexColor(colors[key])) return false
    }

    return true
}
