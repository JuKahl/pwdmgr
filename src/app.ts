const [command] = process.argv.slice(2);

if (command === "set") {
  console.log("You like to get something?");
} else if (command === "get") {
  console.log("What should i get?");
}
