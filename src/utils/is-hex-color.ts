// SPDX-FileCopyrightText: 2026 roro
// SPDX-License-Identifier: GPL-3.0-or-later

const HEX_COLOR_REGEX = /^[0-9a-fA-F]{6}$/

export const isHexColor = (value: unknown): value is string =>
    typeof value === "string" && HEX_COLOR_REGEX.test(value)
