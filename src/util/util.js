export function sortAnswer(questionsDisplay, questionArraySorted) {
  if (questionsDisplay && questionArraySorted) {
    const questionsDisplaySorted = [];
    let questionIdSorted = questionArraySorted.map(obj => obj['id']);
    questionIdSorted.forEach(id => {
      if (questionsDisplay.indexOf(id) > -1) {
        questionsDisplaySorted.push(id)
      }
    })
    return questionsDisplaySorted;
  }
  return []
}

export function getArrayFromDictionary(dict) {
  let resultAr = Object.keys(dict).map(id => dict[id]);
  return resultAr;
}

export function getQuestionFormatted(id, questionsDictionary) {
  if (questionsDictionary && id) {
    let option1 = questionsDictionary[id]['optionOne']['text'];
    let option2 = questionsDictionary[id]['optionTwo']['text'];
    return `${option1} OR ${option2}?`
  }
  return
}

export function sortByPropDesc(arr, prop) {
  arr.sort((a, b) => {
    return b[prop] - a[prop];
  })

  return arr;
}

export function sortByAnswersCount(answerArray) {
  answerArray.sort((a, b) => {
    let bNumAnswers = Object.keys(b.answers).length + b.questions.length;
    let aNumAnswers = Object.keys(a.answers).length + a.questions.length;
    return bNumAnswers - aNumAnswers;
  });
  return answerArray;
}

export function getUnansweredQuestions(userAnswers, allQuestions) {
  let unansweredQuestions;
  let answeredSet;
  if (userAnswers) {
    answeredSet = new Set(Object.keys(userAnswers));
  }
  let allQuestionsSet;
  if (allQuestions) {
    allQuestionsSet = new Set(Object.keys(allQuestions));
  }

  if (allQuestionsSet && answeredSet) {
    unansweredQuestions = [...allQuestionsSet].filter(id => !answeredSet.has(id))
  }

  return unansweredQuestions;
}

export function getPercentVoted(part, total) {
  return Math.round(part / total * 100);
}
