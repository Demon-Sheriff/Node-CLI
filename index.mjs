import chalk from "chalk";
import fs from 'fs';
import { Command } from 'commander';

console.log(chalk.blue("This is the blue colored line!"));
console.log(chalk.red.bold("This is the red colored line indicating error!"));
console.log(chalk.green.underline("This is the green colored line indicating success!"));

const program = new Command();

program
  .name('file-util')
  .description('CLI to do some JavaScript file utilities')
  .version('0.8.0');

program.command('count')
  .description('Count the number of words or lines in a file')
  .argument('<filename>', 'file to count the number of words or lines')
  .option('-w, --words', 'Count the words in the given file')
  .option('-l, --lines', 'Count the number of lines in the given file')
  .action((filename, options) => {
    try {
      const data = fs.readFileSync(filename, 'utf8');
      if (options.words) {
        const wordCount = data.split(/\s+/).filter(Boolean).length;
        console.log(chalk.green(`Word count: ${wordCount}`));
      } 
      else if (options.lines) {
        const lineCount = data.split('\n').length;
        console.log(chalk.green(`Line count: ${lineCount}`));
      } 
      else {
        console.log(chalk.yellow('Please specify an option: --words or --lines'));
      }
    } 
    catch (error) {
      console.error(chalk.red.bold(`Error reading file: ${error.message}`));
    }
  });

program.parse();
