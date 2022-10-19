"use strict";

// So we don't have to keep re-finding things on page, find DOM elements once:
// JY-call ols,forms,btns tag and make hide section and btns,forms. 

const $body = $("body");

const $storiesLoadingMsg = $("#stories-loading-msg");
const $allStoriesList = $("#all-stories-list");
const $favoritesOl=$('#my-favorite-list')
const $myStoryOl =$('#my-stories-list')

const $loginForm = $("#login-form");
const $signupForm = $("#signup-form");
const $submitForm=$('#submit-form');

const $navLogin = $("#nav-login");
const $navUserProfile = $("#nav-user-profile");
const $navLogOut = $("#nav-logout");
const $submit =$('#submit-story')
const $favorite =$('#favorites')
const $myStory =$('#my-story')

const $submitBtn=$('#submitBtn')
const $removeBtn=$('#removeBtn')
const $favBtn=$('#like')



/** To make it easier for individual components to show just themselves, this
 * is a useful function that hides pretty much everything on the page. After
 * calling this, individual components can re-show just what they want.
 */

function hidePageComponents() {
  const components = [
    $allStoriesList,
    $loginForm,
    $signupForm,
    $submit,
    $favorite,
    $myStory,
    $submitForm,
    $myStoryOl,
    $favoritesOl
  ];
  components.forEach(c => c.hide());
}

function hideForms(){
  const forms=[
    $loginForm,
    $signupForm,
    $submitForm,
    $myStoryOl
  ];
  forms.forEach(f=>f.hide());
}

/** Overall function to kick off the app. */
// JY-when starting the browser, on the first page, all of the section is hidden.
// only show the story list from API and navbar.
// when logging in check for it is user or not 

async function start() {
  hideForms()
  console.debug("start");
 $favorite.hide()
 $submit.hide()
 $myStory.hide()

  // "Remember logged-in user" and log in, if credentials in localStorage
  await checkForRememberedUser();
  await getAndShowStoriesOnStart();

  // if we got a logged-in user
  if (currentUser) updateUIOnUserLogin();
}

// Once the DOM is entirely loaded, begin the app

console.warn("HEY STUDENT: This program sends many debug messages to" +
  " the console. If you don't see the message 'start' below this, you're not" +
  " seeing those helpful debug messages. In your browser console, click on" +
  " menu 'Default Levels' and add Verbose");
$(start);
