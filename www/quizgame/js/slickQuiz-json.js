// Setup your quiz text and questions here

// NOTE: pay attention to commas, IE struggles with those bad boys

    var quizJSON = {
        "info": {
            "name": "Test Your Knowledge!!",
            "main": "<div id='meSsage'><video width='100%' controls><source src='media/sample.mp4' type='video/mp4'></video></div>",
            "results": "<h5>Learn More</h5><p>Etiam scelerisque, nunc ac egestas consequat, odio nibh euismod nulla, eget auctor orci nibh vel nisi. Aliquam erat volutpat. Mauris vel neque sit amet nunc gravida congue sed sit amet purus.</p>",
            "level1": "Jeopardy Ready",
            "level2": "Jeopardy Contender",
            "level3": "Jeopardy Amateur",
            "level4": "Jeopardy Newb",
            "level5": "Stay in school, kid..." // no comma here
        },
        "questions": [
            { // Question 1
                "q": "What number is the letter A in the English alphabet?",
                "a": [
                    {"option": "1", "correct": true},
                    {"option": "14", "correct": false},
                    {"option": "8", "correct": false},
                    {"option": "23", "correct": false} // no comma here
                ],
                "correct": "<p><span>That's right!</span> The letter A is the first letter in the alphabet!</p>",
                "incorrect": "<p><span>Uhh no.</span> It's the first letter of the alphabet. Did you actually <em>go</em> to kindergarden?</p>" // no comma here
            },
            { // Question 2
                "q": "How many inches of rain does Michigan get on average per year?",
                "a": [
                    {"option": "149", "correct": true},
                    {"option": "32", "correct": false},
                    {"option": "3", "correct": false},
                    {"option": "1291", "correct": false} // no comma here
                ],
                "correct": "<p><span>Holy bananas!</span> I didn't actually expect you to know that! Correct!</p>",
                "incorrect": "<p><span>Fail.</span> Sorry. You lose. It actually rains approximately 32 times a year in Michigan.</p>" // no comma here
            }
        ]
    };

    function myFunction() {
        quizJSON;
    }