"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */
// JY- navBar section click evt.

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  putStoriesOnPage();
  $favorite.show();
  $myStory.show();
  $submit.show();
  $navLogOut.show();

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
  hidePageComponents();
  $submitForm.show();
  $favorite.show();
  $myStory.show();
  $submit.show();
  $navLogOut.show();
}
$submit.on("click",navSubmitClick);


function navMyStoryClick(evt){
  console.debug("navMySoryClick",evt);
  $allStoriesList.hide();
  $myStoryOl.show();
  $submitForm.hide();
  submitToMyStory();


  
}
$myStory.on("click",navMyStoryClick)

function navFavoriteStoryClick(evt){
  console.debug('navFavoriteStoryClick,',evt)
  hidePageComponents();
  addFavoritList();
  $favorite.show();
  $myStory.show();
  $submit.show();
  $navLogOut.show();

}

$favorite.on('click',navFavoriteStoryClick)
