const JOURNEY_CLASSNAME = 'journey';

const STEP_CLASSNAME = 'step';

const STEP_ACTIVE_CLASSNAME = 'step_active';

const HIDDEN_BUTTON_CLASSNAME = 'hidden-button';

const getSteps = () => {
  return Array.from(document.querySelectorAll('[data-type="step"]'));
}

const getCurrentActiveStepIndex = (steps) => {
  return steps.findIndex((item) => item.classList.contains(STEP_ACTIVE_CLASSNAME));
};

const getNextStepButton = () => document.getElementById('next-step');

const getGoToStartButton = () => document.getElementById('to-the-start');

const replaceButtons = () => {
  const nextStetButton = getNextStepButton();
  const goToStartButton = getGoToStartButton();

  if (!nextStetButton || !goToStartButton) return;

  if (nextStetButton.classList.contains(HIDDEN_BUTTON_CLASSNAME)) {
    nextStetButton.classList.remove(HIDDEN_BUTTON_CLASSNAME);
    goToStartButton.classList.add(HIDDEN_BUTTON_CLASSNAME);

    return;
  }

  if (goToStartButton.classList.contains(HIDDEN_BUTTON_CLASSNAME)) {
    goToStartButton.classList.remove(HIDDEN_BUTTON_CLASSNAME);
    nextStetButton.classList.add(HIDDEN_BUTTON_CLASSNAME);
  }
};

const switchActiveStepToTheNext = (steps, index) => {
  if (index === steps.length - 1) return;

  steps[index].classList.remove(STEP_ACTIVE_CLASSNAME);
  steps[index + 1].classList.add(STEP_ACTIVE_CLASSNAME);

  if (index === steps.length - 2) {
    replaceButtons();
  }
};

const switchActiveStepToThePrevious = (steps, index) => {
  if (index === 0) return;

  if (index === 1) {
    document.body.classList.remove(JOURNEY_CLASSNAME);
  }

  steps[index].classList.remove(STEP_ACTIVE_CLASSNAME);
  steps[index - 1].classList.add(STEP_ACTIVE_CLASSNAME);

  if (index === steps.length - 1) {
    replaceButtons();
  }
};

const startJourney = () => {
  document.body.classList.add(JOURNEY_CLASSNAME);

  const steps = getSteps();
  if (!steps.length) return;

  const index = getCurrentActiveStepIndex(steps);
  if (index === -1) return;

  switchActiveStepToTheNext(steps, index);
};

const goToTheNextStep = () => {
  const steps = getSteps();
  if (!steps.length) return;

  const index = getCurrentActiveStepIndex(steps);
  if (index === -1) return;

  switchActiveStepToTheNext(steps, index);
};

const goToThePreviousStep = () => {
  const steps = getSteps();
  if (!steps.length) return;

  const index = getCurrentActiveStepIndex(steps);
  if (index === -1) return;

  switchActiveStepToThePrevious(steps, index);
};

const returnToTheStart = () => {
  const steps = getSteps();
  if (!steps.length) return;

  const index = getCurrentActiveStepIndex(steps);
  if (index === -1) return;

  steps[0].classList.add(STEP_ACTIVE_CLASSNAME);
  steps[index].classList.remove(STEP_ACTIVE_CLASSNAME);
  document.body.classList.remove(JOURNEY_CLASSNAME);
  replaceButtons();
};

const startJourneyButton = document.getElementById('start-journey');
startJourneyButton?.addEventListener('click', startJourney);

getNextStepButton()?.addEventListener('click', goToTheNextStep);

const previousStepButton = document.getElementById('previous-step');
previousStepButton?.addEventListener('click', goToThePreviousStep);

getGoToStartButton()?.addEventListener('click', returnToTheStart);
