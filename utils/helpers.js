import fs from 'fs-extra';
import path from 'path';

/**
 * Recursively copy directory contents
 */
export async function copyDirectory(src, dest) {
  await fs.copy(src, dest, {
    recursive: true,
    overwrite: true,
  });
}

/**
 * Recursively rename all .template files by removing the extension
 */
export function renameTemplateFiles(dir) {
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      renameTemplateFiles(fullPath);
    } else if (item.endsWith('.template')) {
      let newPath = fullPath.replace(/\.template$/, '');
      // Special handling for env.example -> .env.example
      if (item === 'env.example.template') {
        newPath = path.join(path.dirname(fullPath), '.env.example');
      }
      // Special handling for gitignore -> .gitignore
      if (item === 'gitignore.template') {
        newPath = path.join(path.dirname(fullPath), '.gitignore');
      }
      fs.renameSync(fullPath, newPath);
    }
  }
}

/**
 * Replace placeholders in all files
 */
export function replacePlaceholders(dir, vars) {
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      replacePlaceholders(fullPath, vars);
    } else {
      try {
        let content = fs.readFileSync(fullPath, 'utf8');
        let modified = false;

        for (const [key, value] of Object.entries(vars)) {
          const placeholder = `{{${key}}}`;
          if (content.includes(placeholder)) {
            content = content.replace(new RegExp(placeholder, 'g'), value);
            modified = true;
          }
        }

        if (modified) {
          fs.writeFileSync(fullPath, content, 'utf8');
        }
      } catch (error) {
        // Skip binary files or files that can't be read as text
        if (error.code !== 'EISDIR') {
          // Ignore directories
          console.warn(`Warning: Could not process ${fullPath}`);
        }
      }
    }
  }
}

