// ==UserScript==
// @name            Corrector_p
// @namespace       TimidScript
// @version         1.0.0
// @description     Adds the Download Link on illustration page if missing and also removes open in new tab
// @icon            http://phys-online.ru/theme/image.php/clean/theme/1431324581/favicon
// @author          Wasya
// @homepageURL     
// @copyright       © 2015 Wasya, All Rights Reserved.
// @license         
// @include         *phys-online.ru/mod/quiz/review.php?attempt=*
// ==/UserScript==

var MaxRignt = 12;

var NumOfRignt = 10;
var RightPercent = 66;
var TStatus = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
var ValuePattern = new Array(   0, 0, 1, 1, 1,
                                0, 1, 1, 0, 1,
                                0, 1, 1, 1, 1);
var counterS1 = 0, counterS3 = 0;

function State1() {
    var RTGbox = document.getElementsByClassName("qn_buttons allquestionsononepage")[0];
    var RTGboxChild = RTGbox.firstChild;
    //alert("loop");
    for (counterS1 = 0; counterS1 < 15; counterS1 += 1)
    {
        bp = RTGboxChild.attributes.getNamedItem("class");

        if (ValuePattern[counterS1] == 1) {
            bp.value = "qnbutton correct free thispage";
        }
        else {
            bp.value = "qnbutton incorrect free thispage";
        }
        RTGboxChild.attributes.setNamedItem(bp);
        RTGboxChild = RTGboxChild.nextSibling;
    }
}

function State2() {
    var StatBox = document.getElementsByClassName("generaltable generalbox quizreviewsummary")[0];
    var StatBoxChild = StatBox.firstChild;
    StatBoxChild.innerHTML = '<table class="generaltable generalbox quizreviewsummary" id="yui_3_17_2_3_1433442165944_274"><tbody id="yui_3_17_2_3_1433442165944_273"><tr id="yui_3_17_2_3_1433442165944_272"><th class="cell" scope="row">Тест начат</th><td class="cell" id="yui_3_17_2_3_1433442165944_271">5 Июнь 2015, 10:10</td></tr><tr><th class="cell" scope="row">Состояние</th><td class="cell">Завершено</td></tr><tr><th class="cell" scope="row">Завершен</th><td class="cell">Пятница, 5 Июнь 2015, 10:17</td></tr><tr><th class="cell" scope="row">Прошло времени</th><td class="cell">7 мин. 34 сек.</td></tr><tr><th class="cell" scope="row">Оценка</th><td class="cell"><b>10,00</b> из 15,00 (<b>66</b>%)</td></tr><tr><th class="cell" scope="row">Отзыв</th><td class="cell">отлично, тест пройден</td></tr></tbody></table>';
}

function State3() {
    var QBoxContainer = document.getElementsByClassName("questionflagsaveform")[0];
    var QBoxChild = QBoxContainer.firstChild;
    var QBoxChild = QBoxChild.firstChild;
   
    var LocalChild;
    var LocalChild2;
    var LocalChild3;
    //QBoxChild = QBoxChild.nextSibling; // skip first box
   
    for (counterS3 = 0; counterS3 < 15; counterS3 += 1) {
        bp = QBoxChild.attributes.getNamedItem("class");

        if (ValuePattern[counterS3] == 1) {
            bp.value = "que multichoice deferredfeedback correct";
            
            LocalChild = QBoxChild.firstChild;
            LocalChild.innerHTML = '<h3 class="no">Вопрос <span class="qno">' + (counterS3 + 1).toString() + '</span></h3><div class="state">Верно</div><div class="grade">Баллов: 1,00 от максимума 1,00</div><div class="questionflag editable" aria-atomic="true" aria-relevant="text" aria-live="assertive" id="yui_3_17_2_3_1433446082701_17"><input type="hidden" name="q24683:14_:flagged" value="0"><input type="hidden" value="qaid=366938&amp;qubaid=24683&amp;qid=6045&amp;slot=14&amp;checksum=fae9b5acd0a553778678599891c61a8b&amp;sesskey=t1BuoXi1AA&amp;newstate=" class="questionflagpostdata"><input type="hidden" class="questionflagvalue" id="q24683:14_:flaggedcheckbox" name="q24683:14_:flagged" value="0"><input type="image" class="questionflagimage" src="http://phys-online.ru/theme/image.php/clean/core/1431324581/i/unflagged" title="Отметить этот вопрос флажком, чтобы не забыть о нём" alt="Не отмечено"><span class="questionflagtext" title="Отметить этот вопрос флажком, чтобы не забыть о нём">Отметить вопрос</span></div>'

            LocalChild = LocalChild.nextSibling; // in content
            LocalChild = LocalChild.firstChild; // in formulatation
            LocalChild2 = LocalChild.getElementsByClassName("ablock")[0];
            LocalChild2 = LocalChild.getElementsByClassName("answer")[0]; // in answer

            //// find result
            LocalChild3 = LocalChild2.firstChild;
            chclass = LocalChild3.attributes.getNamedItem("class");
            while (chclass.value != "r1 incorrect" && chclass.value != "r0 incorrect" && chclass.value != "r0 correct" && chclass.value != "r1 correct") {
                LocalChild3 = LocalChild3.nextSibling;
                LocalChild3 = LocalChild3.nextSibling;
                chclass = LocalChild3.attributes.getNamedItem("class");
            }
            chclass.value = "r0 correct";
            LocalChild3.attributes.setNamedItem(chclass);

            LocalChild3 = LocalChild3.getElementsByClassName("questioncorrectnessicon")[0];
            chclass = LocalChild3.attributes.getNamedItem("src");
            chclass.value = "http://phys-online.ru/theme/image.php/clean/core/1431324581/i/grade_correct";
            LocalChild3.attributes.setNamedItem(chclass);

        }
        else {
            bp.value = "que multichoice deferredfeedback incorrect";

            LocalChild = QBoxChild.firstChild;
            LocalChild.innerHTML = '<h3 class="no">Вопрос <span class="qno">' + (counterS3 + 1).toString() + '</span></h3><div class="state">Неверно</div><div class="grade">Баллов: 0,00 от максимума 1,00</div><div class="questionflag editable" aria-atomic="true" aria-relevant="text" aria-live="assertive" id="yui_3_17_2_3_1433447670650_45"><input type="hidden" name="q24683:6_:flagged" value="0"><input type="hidden" value="qaid=366930&amp;qubaid=24683&amp;qid=6096&amp;slot=6&amp;checksum=595a478bb7bdc2fcefd488b83140ee50&amp;sesskey=t1BuoXi1AA&amp;newstate=" class="questionflagpostdata"><input type="hidden" class="questionflagvalue" id="q24683:6_:flaggedcheckbox" name="q24683:6_:flagged" value="0"><input type="image" class="questionflagimage" src="http://phys-online.ru/theme/image.php/clean/core/1431324581/i/unflagged" title="Отметить этот вопрос флажком, чтобы не забыть о нём" alt="Не отмечено"><span class="questionflagtext" title="Отметить этот вопрос флажком, чтобы не забыть о нём">Отметить вопрос</span></div>'

            LocalChild = LocalChild.nextSibling; // in content
            LocalChild = LocalChild.firstChild; // in formulatation
            LocalChild2 = LocalChild.getElementsByClassName("ablock")[0];
            LocalChild2 = LocalChild.getElementsByClassName("answer")[0]; // in answer

            //// find result
            LocalChild3 = LocalChild2.firstChild;
            chclass = LocalChild3.attributes.getNamedItem("class");
            while (chclass.value != "r1 incorrect" && chclass.value != "r0 incorrect" && chclass.value != "r0 correct" && chclass.value != "r1 correct") {
                LocalChild3 = LocalChild3.nextSibling;
                LocalChild3 = LocalChild3.nextSibling;
                chclass = LocalChild3.attributes.getNamedItem("class");
            }
            chclass.value = "r0 incorrect";
            LocalChild3.attributes.setNamedItem(chclass);

            LocalChild3 = LocalChild3.getElementsByClassName("questioncorrectnessicon")[0];
            chclass = LocalChild3.attributes.getNamedItem("src");
            chclass.value = "http://phys-online.ru/theme/image.php/clean/core/1431324581/i/grade_incorrect";
            LocalChild3.attributes.setNamedItem(chclass);
        }

        QBoxChild.attributes.setNamedItem(bp);
        QBoxChild = QBoxChild.nextSibling;
    }
}

// MAIN
console.info("Corrector load");
(function () {
    State1();
    State2();
    State3();
})();


