// Base URL: https://jservice.io 

let categories = [];
let idsArr = [];
const NUM_CATGS = 6;
const CLUES_PER_CATG = 5;
let RANDOM_CATG;

// creates arr of 6 category ids; idsArr, 
// selects a random category id form the arr, randomId, 
async function getCategoryIds() {
    const ctgryQry = `https://jservice.io/api/categories?count=200`;
    const apiRes = await axios.get(ctgryQry);
    const data = apiRes.data;
    // filters category with id 3 because it has no clues
    const ids = data.filter((objs) => objs.id !== 3);
    idsArrShuffled = _.shuffle(ids);
    // creates an array of 6 values
    idsArr = idsArrShuffled.slice(0, 6);
    // creates an array of 6 different titles
    categories = idsArr.map((values) => values.title);
    // creates an array of 6 different category ids
    idsArr = idsArr.map((values) => values.id);
    const randomIdSelector = Math.floor(Math.random() * idsArr.length);
    // extracts a random value form the array
    const randomId = idsArr[randomIdSelector];  
    return RANDOM_CATG = randomId; 
}

async function getCategory(catId) {
    const ctgryQryUrl = `https://jservice.io/api/category?id=${catId}`;
    const ctgryQry = await axios.get(ctgryQryUrl);
    const ctgryTitle = ctgryQry.data.title;
    const ctgryData = ctgryQry.data;
    const ctgryClues = ctgryQry.data.clues;
    // returns an array of clues and the category title for one category
    // contains all the questions in the category also
    return [ctgryClues, ctgryTitle];  
}

async function fillTable(clueInfo) {
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

async function handleClick(evt) {
    // assigns the class name of what was clicked,
    // to grab a category id
    const clickId = evt.target.className;
    // queries the category id from the class name above
    const clickIdUrl = `https://jservice.io/api/category?id=${clickId}`
    const clickIdQry = await axios.get(clickIdUrl);
    const clickIdClues = clickIdQry.data.clues;
    // creates the question matrix
    const clickQstnMatrix = clickIdClues.map((x) => x.question);
    // creates the answer matrix
    const clickAnsrMatrix = clickIdClues.map((x) => x.answer);
    // depending on which td was clicked, the id,
    // will extract a question from the question matrix,
    // and make it the text of the clicked td  
    $( this ).text($( this ).text() === '?' ? clickQstnMatrix[evt.target.id] : clickAnsrMatrix[evt.target.id]);     
}

$('#jeopardy').on('click', 'td', handleClick);

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