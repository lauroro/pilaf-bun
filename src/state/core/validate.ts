// SPDX-FileCopyrightText: 2026 roro
// SPDX-License-Identifier: GPL-3.0-or-later

import type { State } from "../../types/state"

export const validateState = (value: unknown): value is State => {
    return true
}
