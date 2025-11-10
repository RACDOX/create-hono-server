#!/usr/bin/env node

import prompts from 'prompts';
import chalk from 'chalk';
import ora from 'ora';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import {
  renameTemplateFiles,
  replacePlaceholders,
  copyDirectory,
} from './utils/helpers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  console.log(chalk.bold.cyan('\n🔥 Welcome to create-hono-server!\n'));

  const response = await prompts([
    {
      type: 'text',
      name: 'projectName',
      message: 'What is your project named?',
      initial: 'my-hono-server',
      validate: (value) =>
        value.length > 0 ? true : 'Project name cannot be empty',
    },
    {
      type: 'select',
      name: 'packageManager',
      message: 'Select a package manager:',
      choices: [
        { title: 'bun', value: 'bun' },
        { title: 'npm', value: 'npm' },
        { title: 'pnpm', value: 'pnpm' },
        { title: 'yarn', value: 'yarn' },
      ],
      initial: 0,
    },
    {
      type: 'confirm',
      name: 'installDeps',
      message: 'Install dependencies?',
      initial: true,
    },
  ]);

  if (!response.projectName) {
    console.log(chalk.red('\n❌ Project creation cancelled\n'));
    process.exit(1);
  }

  const { projectName, packageManager, installDeps } = response;
  const targetDir = path.join(process.cwd(), projectName);

  // Check if directory exists
  if (fs.existsSync(targetDir)) {
    console.log(
      chalk.red(`\n❌ Directory "${projectName}" already exists!\n`)
    );
    process.exit(1);
  }

  // Create project directory
  const spinner = ora(chalk.blue('Creating project directory...')).start();
  try {
    fs.mkdirSync(targetDir, { recursive: true });
    spinner.succeed(chalk.green('Project directory created'));
  } catch (error) {
    spinner.fail(chalk.red('Failed to create directory'));
    console.error(error);
    process.exit(1);
  }

  // Copy template files
  spinner.start(chalk.blue('Copying template files...'));
  try {
    const templateDir = path.join(__dirname, 'templates');
    await copyDirectory(templateDir, targetDir);
    spinner.succeed(chalk.green('Template files copied'));
  } catch (error) {
    spinner.fail(chalk.red('Failed to copy template files'));
    console.error(error);
    process.exit(1);
  }

  // Rename template files
  spinner.start(chalk.blue('Setting up project files...'));
  try {
    renameTemplateFiles(targetDir);
    spinner.succeed(chalk.green('Project files set up'));
  } catch (error) {
    spinner.fail(chalk.red('Failed to set up project files'));
    console.error(error);
    process.exit(1);
  }

  // Replace placeholders
  spinner.start(chalk.blue('Configuring project...'));
  try {
    replacePlaceholders(targetDir, { projectName });
    spinner.succeed(chalk.green('Project configured'));
  } catch (error) {
    spinner.fail(chalk.red('Failed to configure project'));
    console.error(error);
    process.exit(1);
  }

  // Install dependencies
  if (installDeps) {
    spinner.start(chalk.blue(`Installing dependencies with ${packageManager}...`));
    try {
      const installCmd =
        packageManager === 'yarn' ? 'yarn' : `${packageManager} install`;
      execSync(installCmd, { cwd: targetDir, stdio: 'ignore' });
      spinner.succeed(chalk.green('Dependencies installed'));
    } catch (error) {
      spinner.fail(chalk.red('Failed to install dependencies'));
      console.log(
        chalk.yellow(`\nYou can install them manually by running:\n  cd ${projectName}\n  ${packageManager} install\n`)
      );
    }
  }

  // Success message
  console.log(chalk.bold.green('\n✅ Project created successfully!\n'));
  console.log(chalk.bold('Next steps:\n'));
  console.log(chalk.cyan(`  1. cd ${projectName}`));
  console.log(chalk.cyan(`  2. Create a .env file (use .env.example as template)`));
  console.log(chalk.cyan(`  3. ${packageManager} run db:push`));
  console.log(chalk.cyan(`  4. ${packageManager} run dev`));
  console.log(
    chalk.cyan(`  5. Visit http://localhost:3000/reference for API docs\n`)
  );
  console.log(chalk.bold.magenta('Happy coding! 🚀\n'));
}

main().catch((error) => {
  console.error(chalk.red('\n❌ An error occurred:'), error);
  process.exit(1);
});

