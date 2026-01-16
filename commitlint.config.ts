import type { UserConfig } from '@commitlint/types';

const config: UserConfig = {
    extends: ['@commitlint/config-conventional'],

    prompt: {
        settings: {
            enableMultipleScopes: false,
        },

        questions: {
            type: {
                description: "Select the type of change you're committing:",
                enum: {
                    feat: {
                        description: 'Introduce a new feature or capability',
                        title: '🚀 Feature',
                        emoji: '🚀',
                    },
                    fix: {
                        description: 'Resolve a bug or incorrect behavior',
                        title: '🧩 Bug Fix',
                        emoji: '🧩',
                    },
                    docs: {
                        description: 'Add or update documentation',
                        title: '📝 Documentation',
                        emoji: '📝',
                    },
                    style: {
                        description: 'Code changes that do not affect behavior (formatting, whitespace)',
                        title: '🎨 Style',
                        emoji: '🎨',
                    },
                    refactor: {
                        description: 'Improve code structure without changing external behavior',
                        title: '🧠 Refactor',
                        emoji: '🧠',
                    },
                    test: {
                        description: 'Add, update, or improve tests',
                        title: '🧪 Test',
                        emoji: '🧪',
                    },
                    chore: {
                        description: 'Maintenance tasks (build system, dependencies, tooling)',
                        title: '⚙️ Chore',
                        emoji: '⚙️',
                    },
                },
            },

            scope: {
                description: 'Specify the scope of this change (e.g., auth, ui, api)',
            },

            subject: {
                description: 'Short, imperative summary (max 50 chars, e.g., Add login validation)',
            },

            body: {
                description: 'Detailed explanation of what changed, why, and how (optional)',
            },
        },
    },
};

export default config;
