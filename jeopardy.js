// Base URL: https://jservice.io 

let categories = [];
let idsArr = [];
const NUM_CATGS = 6;
const CLUES_PER_CATG = 5;
let RANDOM_CATG;


/** Get NUM_CATEGORIES random category from API.
 *
 * Returns array of category ids
 */
// creates arr of 6 category ids; idsArr, 
// selects a random category id form the arr, randomId,
// changes the value of RANDOM_CATG to randomId 
async function getCategoryIds() { 
    // before shuffle syntax
    // const ctgryQry = `https://jservice.io/api/categories?count=7`;
    // new shuffle syntaxes
    const ctgryQry = `https://jservice.io/api/categories?count=31`;
    const apiRes = await axios.get(ctgryQry);
    const data = apiRes.data;
    // console.log('DATA ', data);
    // filters category with id 3 because it has no clues
    const ids = data.filter((datas) => datas.id !== 3);
    // new shuffle syntax
    idsArrShuffled = _.shuffle(ids);
    // creates an array of 6 values
    idsArr = idsArrShuffled.slice(0, 6);
    // console.log('idsArrShuffle ', idsArrShuffle);
    // console.log('IDS ', ids);
    // creates an array of 6 different titles
    // before shuffle syntax
    // categories = ids.map((x) => x.title);
    // new shuffle syntax
    categories = idsArr.map((x) => x.title);
    // console.log('CATEGORIES ARR ', categories);
    // console.log('IDS ARRAY ', ids.map((x) => x.id));
    // creates an array of 6 different category ids
    // before shuffle syntax
    // idsArr = ids.map((x) => x.id);
    // new shuffle syntax
    idsArr = idsArr.map((x) => x.id);
    // console.log('IDS ARRAY ', idsArr);
    const randomIdSelector = Math.floor(Math.random() * idsArr.length);
    // extracts a random value form the array
    const randomId = idsArr[randomIdSelector];
    // console.log('RANDOM ID ', randomId);
    // changes the value of RANDOM_CATG to the random value  
    return RANDOM_CATG = randomId;
    // new shuffle syntaxes
    // const ctgryQry = `https://jservice.io/api/categories?count=31`;
    // const apiRes = await axios.get(ctgryQry);
    // const data = apiRes.data;
    // const ids = data.filter((datas) => datas.id !== 3);
    // idsArr = ids.map((x) => x.id);
    // idsArr.slice(0, 6); 
}

// test run, not included with file
// getCategoryIds();

/** Return object with data about a category:
 *
 *  Returns { title: "Math", clues: clue-array }
 *
 * Where clue-array is:
 *   [
 *      {question: "Hamlet Author", answer: "Shakespeare", showing: null},
 *      {question: "Bell Jar Author", answer: "Plath", showing: null},
 *      ...
 *   ]
 */
// this was not an async function when I downloaded from Exercise Brief
async function getCategory(catId) {
    const ctgryQryUrl = `https://jservice.io/api/category?id=${catId}`;
    const ctgryQry = await axios.get(ctgryQryUrl);
    // console.log('CATEGORY QUERY FROM RANDOM ID ', ctgryQry.data);
    const ctgryTitle = ctgryQry.data.title;
    // console.log('CATEGORY TITLE FROM RANDOM ID DATA ', ctgryTitle);
    const ctgryData = ctgryQry.data;
    // console.log('CATEGORY DATA FROM RANDOM ID DATA ', ctgryQry.data);
    const ctgryClues = ctgryQry.data.clues;
    // console.log('CATEGORY CLUES FROM RANDOM ID DATA ', ctgryClues);
    // console.log('CATEGORY ARRAY ', {ctgryClues, ctgryTitle});
    // returns an array of clues and the category title for one category
    // contains all the questions in the category also
    return [ctgryClues, ctgryTitle];  
}

/** Fill the HTML table#jeopardy with the categories & cells for questions.
 *
 * - The <thead> should be filled w/a <tr>, and a <td> for each category
 * - The <tbody> should be filled w/NUM_QUESTIONS_PER_CAT <tr>s,
 *   each with a question for each category in a <td>
 *   (initally, just show a "?" where the question/answer would go.)
 */

// did not originally have a paramter
async function fillTable(clueInfo) {
    // console.log('CLUE OBJECT ', clueInfo);
    // const clueData = clueInfo[0];
    // console.log('clueData ', clueData);
    // console.log('CLUES ARR', clueData.map((x) => x.question));
    // const cluesArr = clueData.map((x) => x.question);
    // this loop with <thead><tr><th></th></tr></thead> creates one cell
    // the below creates 6 horizotal cells  
    for (let x = 0; x < 1; x++) {
        $('#jeopardy').append(`
        <thead>
            <tr>
                <th class="${idsArr[0]}" id="title1"></th>
                <th class="${idsArr[1]}" id="title2"></th>
                <th class="${idsArr[2]}" id="title3"></th>
                <th class="${idsArr[3]}" id="title4"></th>
                <th class="${idsArr[4]}" id="title5"></th>
                <th class="${idsArr[5]}" id="title6"></th>
            </tr>
        </thead>
        `)
        // this loop with <tbody><tr><td></td></tr></tbody> creates 5 vertical colums under the th above
        // we use the below code with the above code to make the entire board
        // the ids below allow us to index a value from the matrix variables
        // for ex, if we click the second box in a category column,
        // it will extract the second clue from its array
        // the classes below allow each td to have a category id,
        // this allows us to query clues from its category id
        for (let y = 0; y < 5; y++) {
            $('#jeopardy').append(`
                <tr>
                    <td id="${y}" class="${idsArr[0]}">?</td>
                    <td id="${y}" class="${idsArr[1]}">?</td>
                    <td id="${y}" class="${idsArr[2]}">?</td>
                    <td id="${y}" class="${idsArr[3]}">?</td>
                    <td id="${y}" class="${idsArr[4]}">?</td>
                    <td id="${y}" class="${idsArr[5]}">?</td>
                </tr>
            `)
        }
    }
    // these name each th with a value from the category array
    // it creates the category name row above the board
    $('#title1').text(categories[0]);
    $('#title2').text(categories[1]);
    $('#title3').text(categories[2]);
    $('#title4').text(categories[3]);
    $('#title5').text(categories[4]);
    $('#title6').text(categories[5]);
    }

/** Handle clicking on a clue: show the question or answer.
 *
 * Uses .showing property on clue to determine what to show:
 * - if currently null, show question & set .showing to "question"
 * - if currently "question", show answer & set .showing to "answer"
 * - if currently "answer", ignore click
 * */

async function handleClick(evt) {
    // console.log('TARGET ', evt.target);
    // assigns the class name of what was clicked,
    // to grab a category id
    const clickId = evt.target.className;
    // console.log('TARGET CLASS NAME ', evt.target.className);
    // queries the category id from the class name above
    const clickIdUrl = `https://jservice.io/api/category?id=${clickId}`
    const clickIdQry = await axios.get(clickIdUrl);
    // console.log('clickIdQry ', clickIdQry);
    const clickIdClues = clickIdQry.data.clues;
    // console.log('clickIdClues ', clickIdClues);
    // console.log('clickIdClue ', clickIdClues[0].question);
    // creates the question matrix
    const clickQstnMatrix = clickIdClues.map((x) => x.question); 
    // console.log('QSTN ARRAY ', clickIdClues.map((x) => x.question));
    // creates the answer matrix
    const clickAnsrMatrix = clickIdClues.map((x) => x.answer);
    // console.log('ANSWR ARRAY ', clickIdClues.map((x) => x.answer));
    // $( this ).text(clickQstnMatrix[evt.target.id]);
    // $( this ).text(clickAnsrMatrix[evt.target.id]);
    // depending on which td was clicked, the id,
    // will extract a question from the question matrix,
    // and make it the text of the clicked td  
    $( this ).text($( this ).text() === '?' ? clickQstnMatrix[evt.target.id] : clickAnsrMatrix[evt.target.id]);     
}

$('#jeopardy').on('click', 'td', handleClick);

/** Wipe the current Jeopardy board, show the loading spinner,
 * and update the button used to fetch data.
 */

function showLoadingView() {
    $('#jeopardy').html('');
    $('.loader').css('display', 'flex');
    setTimeout(function() {
        setupAndStart();
    }, 600);

    setTimeout(function() {
        $('.loader').css('display', 'none');
    }, 600);
}

/** Remove the loading spinner and update the button used to fetch data. */

function hideLoadingView() {
}

/** Start game:
 *
 * - get random category Ids
 * - get data for each category
 * - create HTML table
 * */

async function setupAndStart() {
    getCategoryIds();
    const catId = await getCategoryIds();
    getCategory(catId);
    const clueInfo = await getCategory(catId) 
    fillTable(clueInfo);
}

setupAndStart();

$btn = $('#btn');
$btn.on('click', showLoadingView);

// TODO

/** On page load, add event handler for clicking clues */

// TODO