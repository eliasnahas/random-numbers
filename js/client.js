import React from "react";
import ReactDOM from "react-dom";
import $ from "jquery";

class Layout extends React.Component {

  // The goal of this app is to generate a random list of numbers from 1 to 10,000 inclusive
  // There must be no repeats and it must generate a different list each time it is run
  // When I first approached this problem, I had initially thought that I would use
  // a random number generator in a loop that deposits each number into an array
  // if and only if that number does not already exists in that array.
  //
  // The only problem I could forsee is that there is the potential for that loop
  // to run indefinitely therefore making it not an ideal solution
  //
  // My second line of reasoning involved making an initial array of numbers from
  // 1 to 10,000 and having a loop that gives a random number from 0 to one less than
  // the length of the array. This number would be used as an index of the first array
  // and would be pushed to a new array. I would then delete that index entry from the
  // first array (making duplicates impossible), and the random number generator would
  // now return a new random number from 1 to one less of the length of the first array
  // which would now be one less than it was before.
  //
  // This would continue until there are no more numbers in the first array and would
  // give a second array (the result) of the correct number of non-repeating digits from
  // 1 to 10,000


  calcRandomNum() {
    var firstArray = []; // Initial array containing all numbers
    var secondArray = []; // Results array
    var i; // Counter for arrays

    for (i=0; i<10000; i++) { // Populates first array of every number
      firstArray[i] = i + 1;
    };

    for (i=0; i<10000; i++) { // Generates random index number and places value into second array
      var randomNum = Math.floor(Math.random() * firstArray.length);
      secondArray[i] = firstArray[randomNum];
      firstArray.splice(randomNum, 1); // Removes the number from the first array
    };


    // The following console.log outputs the generated random numbers list for testing purposes
    console.log("secondArray: ", secondArray);

    // The following console.log is used to determine if the generated array of numbers contains any duplicates
    // If it does not, it should return an array identical to numbersList
    console.log("unique elements: ", $.unique(secondArray));
    return(secondArray);
  }

  render() {
    const numbersArray = this.calcRandomNum(); // Gets array of randomly generated numbers
    const numbersList = numbersArray.map((number) => { // Uses the previous array to generate a second array of list items
      return <li style={{textAlign: 'right', width: '2em'}}>{number.toLocaleString()}</li>; // Uses inline style to add commas to numbers and right align the text
    });

    // Returns an unordered list of randomly generated numbers and renders them to page
    return (
        <div>
          <h2>Unique Random Numbers from 1 - 10,000 Inclusive</h2>
          <br />
          <ul>
            {numbersList}
          </ul>
        </div>
    );
  }
}

const app = document.getElementById('app');

ReactDOM.render(<Layout/>, app);