// SPDX-FileCopyrightText: 2026 roro
// SPDX-License-Identifier: GPL-3.0-or-later

/**
 * Run a list of commands sequentialy
 */
export const runCommands = async (commands: string[]): Promise<void> => {
    for (const command of commands) {
        const proc = Bun.spawn(["sh", "-c", command], {
            stdout: "ignore",
            stderr: "pipe",
        })

        const exitCode = await proc.exited

        if (exitCode !== 0) {
            const errorOutput = await new Response(proc.stderr).text()

            throw new Error(
                `Command failed: ${command}\n\n${errorOutput.trim()}`
            )
        }
    }
}
