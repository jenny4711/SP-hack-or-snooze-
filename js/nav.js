"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  putStoriesOnPage();
}

$body.on("click", "#nav-all", navAllStories);

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}

$navLogin.on("click", navLoginClick);

/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  hideForms()
  $(".main-nav-links").show();
  $navLogin.hide();
  $navLogOut.show();
  $submit.show();
  $favorite.show();
  $myStory.show();
  $navUserProfile.text(`${currentUser.username}`).show();
}


// submit sec
function navSubmitClick(evt){
  console.debug("navSubmitClick",evt);
  
  $submitForm.show();
}
$submit.on("click",navSubmitClick);


function navMyStoryClick(evt){
  console.debug("navMySoryClick",evt);
  $allStoriesList.hide()
  $myStoryOl.show();
  $submitForm.hide();
  
}
$myStory.on("click",navMyStoryClick)
