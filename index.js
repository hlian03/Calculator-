// Logic Thinking:
// What do I want the code to do ?
// I want to take number users clicks (numbers from 0-9)
// I want the user to have option for operations: (+, -, ×, ÷)
// I want user to be able to have answer when they click =

// On Display, I want to start with empty input
// When the number is clicked on the calculator screen(front-end screen), add that number to the screen (class=display)
// When an operator is clicked on the calculator screen (front-end screen), store the number and operator information in memory so they can type the next number in a clear screen
// When another number is clicked, add that to the new input
// When = (equal) is clicked, do the math and show the answer

//If... else.. Statement:
//if button clicked as AC - THEN clear everything
//if there's an operator and second number - THEN calculate
//if user keeps typing number - THEN keep adding to the input (type "1" -> type "2" -> type "3") => 123 (on the front-end screen)

// step 1: When the page loads, show 0 on the screen
// step 2: when the number is clicked: add the number to 'currentInput' & update the screen with 'currentInput'
// step 3: when an operator (+, -, *, ÷)) is clicked:
// -save the currentInput as 'previousInput'
// -store the operator
// -clear currentInput or (or else example: 8+2 can look like 82 if the currentInput is not clear) - by clear it will appear as 8=previousInput, +=operator 2=currentInput
//step 4: When equal (=) is clicked: show result
//user: previousInput, operator, and currentInput to calculate
//step 5: If AC is clicked: clear everything

//Notes:
// DOM = document object model -> structured representation of HTML on a webpage that allows JS to read & change elements, content, & styles. (reads HTML elements as objects )
// DOM -> document.getElementById(...): set up a "listener" that waits for something to happen, documentSelectorbyID(..) innerText=..,
// document.addEventListener('DOMContentLoaded', () => { -> Use this when JS is in <head> or top of HTML ( elements: buttons, inputs, or divs) it make sure HTML is fully loaded before JS runs.//
// document = entire page | addEventListener = "listen for an event" | 'DOMContentLoaded'= think of schoolbell, "this page is ready, you can start" | () => {} -> () parameters, => connects input to output, {} the block of code to run //
//getElementById= a single element, querySelectorAll= finds all element that match a css selector (all matching element) (Nodelist(like an array))

// let, const, var = all creates variables //

document.addEventListener('DOMContentLoaded', () => {  // wait until the entire HTML page has finished loading before running any of your JS//
   const display = document.getElementById('display'); // Grabs all HTML element with ID=display from index.html //
   const buttons = document.querySelectorAll('.btn'); // Grabs all HTML elements with class=.btn from index.html  //
//Return a list (Nodelist) of all buttons, so you can loop through them//
//You need to access to the screen and buttons so you can show results and know when buttons are clicked.//

// let = I'm creating a box to store something later, I might want to update what's inside later..//
// the calculator has to remember numbers and math signs to calculate properly //
   let currentInput = '';  // (start with nothing) empty blank screen (the number you're typing now)
   let previousInput = ''; // (start with nothing) empty blank screen (the number from before when you clicked + or - or etc)
   let operator = ''; // (start with nothing) empty blank screen. (the symbol you clicked (+, -, x, or ÷ ))
   let shouldResetDisplay = false;  // (boolean) helps the calculator know when to start fresh (like after pressing "=")

// For every button, listen to for a click. When you clicked, grab button's value (like 7, +, AC, etc) //
// This lets the calculator know what the user clicked, and what to do next//

//Add event-listeners to all calculator button
//Using forEach instead of individual listeners makes code more maintainable. 
   buttons.forEach(button => { 
       button.addEventListener('click', () => {
// this allows us to separate display text from functional value //
// get the button's value from the data-value attribute //
           const value = button.getAttribute('data-value');
// "=" -> you are giving a value to a variable (give)
/// "===" -> check and compare if two things are the same (compare) //

           if (value === 'AC') {
               clearAll();                 // If YES, Call AC, If NO, move to the next condition
         
           } else if (value === '+/-') {
               toggleSign();            // -> If YES, call togglesigns = switch the number between positive and negative, If NO, move to the next condition //
         
           } else if (value === '%') {
               calculatePercentage();     // -> If YES, call calculatepercentage, If NO, move to the next condition
      
           } else if (value === '=') { 
               calculateResult();    // -> If Yes, call calculateResult, If NO, move to the next condition
         
           } else if (['+', '-', '×', '÷'].includes(value)) { 
               setOperator(value);   // -> create an array operator symbols('+', '-', '×', '÷') and ask "is the button's value IN this array ? -> set return if found, false if not"
      
          // if its not none of the above ⬆, it must be a number or decimal ⤵ //
           } else {
               appendNumber(value);
           }  // -> if not a special buttons, it must be a number or a decimal point
           // appendNumber = add something to the end of something else. for example: you click "1" and click "2" -> you get "12"//
       });
   });

// Function: telling the computer to do something specific (like a task) -giving that action a name so you can run(executed) one or more times -anytime you want. example:(microwave)
// (clean, organized, and reusable)
// we are using function here so that our code is more organize and save us from having to write code many times (unnecessarily) (DRY=dont repeat yourself)

   // Reset calculator to initial state to initial that can be executed one or more times.
   // Separate function for reusability (called on AC and after errors)

   //starts fresh- like pressing the clear button
   function clearAll() {
       currentInput = '';
       previousInput = '';
       operator = '';
       shouldResetDisplay = false;
       display.classList.remove('error-display'); // Remove error styling
       updateDisplay('0');
   }

   // Show error function - NEW ADDITION
   function showError() {
       display.classList.add('error-display');
       updateDisplay('Error');
       
       // Clear error after 2 seconds
       setTimeout(() => {
           clearAll();
       }, 2000);
   }

// !== -> check if two things are not the same//
// .slice(1) -> cuts off the first character if its .slice(2) -> it will remove both of the second characters.
   function toggleSign() {
       if (currentInput && currentInput !== '0') { //"if the currentInput is not the number 0, do something"//
           if (currentInput.startsWith('-')) { 
               currentInput = currentInput.slice(1);  // if the currentInput starts with "-" then it will remove it by applying .slice(1).
           } else {
               currentInput = '-' + currentInput;
           }
           updateDisplay(currentInput);
       } else if (display.value !== '0') {
           const value = display.value;
           if (value.startsWith('-')) {
               updateDisplay(value.slice(1));
           } else {
               updateDisplay('-' + value);  //
           }
       }
   }

// convert the displayed number to its percentage value
// implements standard calculator percentage function (divide by 100)
   function calculatePercentage() {
       const displayValue = display.value;    // -> get whatever is currently displayed //
       if (displayValue && displayValue !== '0') {
     
       // convert string to number, divide by 100, then back to string
       // parseFloat -> to change the string into a real number so we can divide it.
           const numValue = parseFloat(displayValue);
           
           // Check for invalid number - FIXED ERROR HANDLING
           if (isNaN(numValue)) {
               showError();
               return;
           }
           
           const percentValue = (numValue / 100).toString(); 
           currentInput = percentValue;
           updateDisplay(percentValue);
       }
   }

   // This stores the math sign and first number
   // So we know what to calculate when the user hits "=" later
   function setOperator(op) {
       const displayValue = display.value;
      
       if (previousInput && currentInput && operator) {
           calculateResult();
           operator = op;
           previousInput = display.value;
           currentInput = '';
           shouldResetDisplay = true;
       } else {
           operator = op;
           previousInput = displayValue;
           currentInput = '';
           shouldResetDisplay = true;
       }
   }

   // This Builds up the number you're typing (like typing "3" then "5" to make "35") //
   // -> So you can type full numbers and decimals without errors //
   function appendNumber(number) {
       if (shouldResetDisplay) {
           currentInput = '';
           shouldResetDisplay = false;
       }
      
       if (number === '.' && currentInput.includes('.')) return;
      
       if (currentInput === '' && number !== '.') {
           currentInput = number;
       } else if (currentInput === '' && number === '.') {
           currentInput = '0.';
       } else {
           currentInput += number;
       }
       updateDisplay(currentInput);
   }

// This does the actual math when you press "=" //
   function calculateResult() {
       if (previousInput && (currentInput || display.value) && operator) {
           const prev = parseFloat(previousInput);
           const current = parseFloat(currentInput || display.value);
           let result;

           // Check for invalid numbers - FIXED ERROR HANDLING
           if (isNaN(prev) || isNaN(current)) {
               showError();
               return;
           }

           switch (operator) {
               case '+':
                   result = prev + current;
                   break;
               case '-':
                   result = prev - current;
                   break;
               case '×':
                   result = prev * current;
                   break;
               case '÷':
                   if (current === 0) {
                       showError(); // FIXED: Now shows "Error" instead of crashing
                       return;
                   }
                   result = prev / current;
                   break;
           }

           // Check for invalid results - FIXED ERROR HANDLING
           if (isNaN(result) || !isFinite(result)) {
               showError();
               return;
           }

// -> Notes:
// Switch: checks a value against different choices,
// Case: a possible match
// Break: stops after finding a match
// return: exits the function early if needed

// Format result to avoid floating point precision issues
// result to fix decimal problem
           result = Math.round(result * 1000000000) / 1000000000;
           currentInput = result.toString(); // turns number into a string
           operator = '';
           previousInput = '';
           shouldResetDisplay = true;   // the next time user types a number, erase the screen first
           updateDisplay(currentInput);
       }
   }

// This Updates the screen to show the current number
   function updateDisplay(value) {
       // Check for NaN before displaying - FIXED ERROR HANDLING
       if (value === 'NaN' || (typeof value === 'string' && value.includes('NaN'))) {
           showError();
           return;
       }
       
       display.value = value;
   }
});


// Key Points in the Code:
// Event Listeners: We add click event listeners to each button to handle user interactions.
// Basic Operations: The operations include addition, subtraction, multiplication, and division.
// Special Functions:
// AC (All Clear): Resets the calculator.
// Toggle Sign: Changes the sign of the current input.
// Percentage: Converts the current input to a percentage.
// Equal Sign: Executes the calculation based on the current operator.
// Error Handling: For division by zero, we display an error message.
// Display Updates: The updateDisplay function updates the display with the current input or result. 




