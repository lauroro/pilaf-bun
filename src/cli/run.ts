// SPDX-FileCopyrightText: 2026 roro
// SPDX-License-Identifier: GPL-3.0-or-later

import { apply } from "../use-cases/apply"

const run = async (argv: string[]) => {
    const [, , command, ...args] = argv

    switch (command) {
        case "apply": {
            const palette = args[0]
            if (!palette) throw new Error("palette name required")

            await apply(palette)
            return
        }

        default:
            throw new Error("unknown command")
    }
}

try {
    await run(process.argv)
} catch (err) {
    console.error(err instanceof Error ? err.message : err)
    process.exit(1)
}
