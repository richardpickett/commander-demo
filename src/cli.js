import { Command } from "commander";

const commander = new Command();

// Usage:
// node src/cli.js
// node src/cli.js -h
// node src/cli.js -v
commander
  .name("Commander Demo")
  .description("Demo how to use tj's commander npm package")
  .version("v0.0.1", "-v, --version", "output the current version");

// Usage:
// node src/cli.js commandOne                    # uses defaults set in myGreatFunction() delcaration
// node src/cli.js commandOne -h                 # will show help
// node src/cli.js commandOne -b                 # boolean will be true
// node src/cli.js commandOne -b SomeValue       # boolean will be true, SomeValue is ignored
// node src/cli.js commandOne -s                 # error, have to provide -s value
// node src/cli.js commandOne -s someString      # stringOption = "someString"
// node src/cli.js commandOne -bs someString     # boolean is true and stringOption = "someString"
// node src/cli.js commandOne -b X -s someString # boolean is true and stringOption = "someString", X is ignored
const commandOne = commander
  .command("commandOne")
  .option("-b, --bool-option", "Boolean Option, will be true or false")
  .option("-s, --string-option <string>", "You can give me one more if you want")
  .action((options) => {
    return myGreatFunction(options);
  });

function myGreatFunction({ boolOption = false, stringOption }) {
  console.log(`boolOption: ${boolOption}, stringOption: ${stringOption}`);
}

// Usage:
// node src/cli.js commandOne subCommandOne                   # error, required to give x
// node src/cli.js commandOne subCommandOne -h                # will show help
// node src/cli.js commandOne subCommandOne -x                # error, required to give x value
// node src/cli.js commandOne subCommandOne -x XX             # xOption  = "XX", yNotAnotherOption is false
// node src/cli.js commandOne subCommandOne -x XX -y          # xOption  = "XX", yNotAnotherOption is true
const subCommandOne = commandOne
  .command("subCommandOne")
  .requiredOption("-x, --x-option <option>", "Required X option")
  .option("-y, --y-not-another-option", "Y not one more?", false) // default value is false
  .action((options) => {
    console.log(options);
  });

// Usage:
// works just like commandOne, with cYa and dontForgetThisOne required
const commandTwo = commander
  .command("commandTwo")
  .requiredOption("-c, --c-ya <option>", "C-ya option")
  .requiredOption("-d, --dont-forget-this-one <option>", "Don't forget to give me this option")
  .option("-o, --optional-option", "You can give me one more if you want")
  .action((options) => {
    console.log(options);
  });

commander.parse();

// to parse a command from inside your app:
// commander.parseAsync(["node", "cli", "commandOne", "-s", "mystring"]);
