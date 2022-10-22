"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */
// JY-getAndShowStoriesOnStart()-when the browser open,
//  connect to API and show stories open, msg hide, and forms hide.

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();
  $submitForm.hide();
  hideForms();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */
// ---------------Add Html-------------------
// JY- write HTML to add each story.
// getHostName() is for getting the hostname in the URL from model.js
function generateStoryMarkup(story) {
  console.debug("generateStoryMarkup", story);

  const hostName = story.getHostName();
  return $(`
      <li id="${story.storyId}">
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
        
      </li>
    `);
}

/** Gets list of stories from server, generates their HTML, and puts on page. */

// JY-making like, unlike, and remove buttons and put in front of each story.
function makingFavBtn() {
  const putBtn = $('<button id="like">Like</button>');
  const li = $("#all-stories-list li");
  return li.prepend(putBtn);
}

function makingUnFavBtn() {
  const unFbtn = $('<button id="unlike">Unlike,</button>');
  const unLikeLi = $("#my-favorite-list li");
  unLikeLi.prepend(unFbtn);
}

function MakingRemoveBtn() {
  const removeBtn = $('<button id="remove">Remove</button>');
  const listli = $("#all-stories-list li");
  listli.prepend(removeBtn);
}

// -------------Putting story list into the Browser-------
// JY-send to story list in browser to show from browser.
// and add Like button(makingFavBtn()) and Remove button(MakingRemoveBtn())

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);

    $allStoriesList.append($story);
  }
  makingFavBtn();
  MakingRemoveBtn();
  $allStoriesList.show();
}

// ---add story---
//  JY-submit evt / when filling out submit section and submit,
//  add a story to API(addStory()),
//  put it on the stories list($allStoriesList.append($story)), and
// put on my stories section(submitToMyStory(story)).
async function getS(evt) {
  console.debug("getS");
  evt.preventDefault();

  const title = $("#sub-title").val();
  const author = $("#sub-author").val();
  const url = $("#sub-url").val();

  const username = currentUser.username;
  const data = { title, url, author, username };
  const story = await storyList.addStory(currentUser, data);
  const myStory = submitToMyStory(story);
  const $story = generateStoryMarkup(story);
  $allStoriesList.append($story);
  const submitForm = document.getElementById("submitF");
  submitForm.reset();
}
$submitForm.on("click", "#submitBtn", getS);

// ----myStory-----
// JY-when there is no list in my stories section,
// let msg show "Empty List" and when there is a list,
// remove msg, and put the story in my stories section.

function submitToMyStory() {
  $myStoryOl.empty();
  if (currentUser.ownStories.length === 0) {
    const newList = $("<h3>Empty List</h3>");
    $myStoryOl.append(newList);
  } else {
    $("h3").remove();
    for (let story of currentUser.ownStories) {
      let $story = generateStoryMarkup(story, true);
      $myStoryOl.append($story);
    }
  }
  $myStoryOl.show();
}

// ---------------favorite----------------------
// JY-favorite button evt / making "Like button" which is for mark and unmark. when the button is marked,
// find the story Id in storyList.stories which is in model.js, and add the story to the favorite list to API
// or unmarked, remove the story to the favorite list to API .

// JY-addFavoritList()- when there is no list on favorite section, show msg "No favorites yet" .
//  when there is list, remove msg and let the stories put in the stories list.

// removeSt(evt)-removeBtn evt

async function favList(evt) {
  let click = $(evt.target);

  const findId = evt.target.parentElement;
  const findLi = click.closest("li");
  const storyId = findLi.attr("id");
  console.log(findId);
  const favStory = storyList.stories.find((fa) => fa.storyId === storyId);

  if ($(findId).hasClass("fav")) {
    $(findId).removeClass("fav");
    click.css("background-color", "lightgray");
    await currentUser.removeFavorite(favStory);
  } else {
    $(findId).addClass("fav");
    click.css("background-color", "yellow");
    await currentUser.addFavorite(favStory);
  }
}
$allStoriesList.on("click", "#like", favList);

function addFavoritList() {
  if (currentUser.favorites.length === 0) {
    console.log(currentUser.favorites);
    const addList = $("<h3>No favorites yet</h3>");
    $favoritesOl.append(addList);
  } else {
    for (let story of currentUser.favorites) {
      let $favstory = generateStoryMarkup(story);
      $favoritesOl.append($favstory);
    }
    makingUnFavBtn();
    $favoritesOl.show();
  }
}
// ---------------------------------------------
// -----unlike btn------
async function unLikeList(evt) {
  const evtLi = evt.target.parentElement;
  const findLi = $(evt.target).closest("li");
  const storyId = findLi.attr("id");
  const favStory = storyList.stories.find((fa) => fa.storyId === storyId);
  $(evtLi).remove();
  await currentUser.removeFavorite(favStory);
}

$favoritesOl.on("click", "#unlike", unLikeList);

// ----remove btn-----

async function removeSt(evt) {
  const findId = $(evt.target).closest("li");
  const storyId = findId.attr("id");
  $(evt.target.parentElement).remove();
  await storyList.removeList(currentUser, storyId);
  $(evt.target).closest("li").remove();
  await putUserStoriesOnPage();
}

$allStoriesList.on("click", "#remove", removeSt);
