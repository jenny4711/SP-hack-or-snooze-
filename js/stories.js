"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();
  $submitForm.hide()
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
function generateStoryMarkup(story) {
  // console.debug("generateStoryMarkup", story);

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
function makingFavBtn(){
  const putBtn= $('<button id="like">Like</button>')
  const li =$('#all-stories-list li')
return li.prepend(putBtn)
}

function makingUnFavBtn(){
  const unFbtn =$('<button id="unlike">Unlike,</button>')
  const unLikeLi =$('#my-favorite-list li')
  return  unLikeLi.prepend(unFbtn)
}

function MakingRemoveBtn(){
  const removeBtn=$('<button id="remove">Remove</button>')
  const listli =$('#all-stories-list li')
  return listli.prepend(removeBtn)
}

// ----------------Html----------------------------


function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
   
    const $story = generateStoryMarkup(story);
    
    $allStoriesList.append($story);

  }
  makingFavBtn()
  MakingRemoveBtn()
  $allStoriesList.show();
}




// ---add story---
async function getS(evt){
  console.debug("getS")
  evt.preventDefault()
  
  const title=$('#sub-title').val()
  const author=$('#sub-author').val()
  const url=$('#sub-url').val()
 
  const username=currentUser.username
  const data={title,url,author,username};
  const story =await storyList.addStory(currentUser,data)
  const myStory=submitToMyStory(story);
 const $story =generateStoryMarkup(story)
 $allStoriesList.append($story)

$submitForm.trigger("reset");

}
$submitForm.on("click","#submitBtn",getS)



// ----myStory-----

function submitToMyStory(){
  if(currentUser.ownStories.length === 0){
    const newList =$('<h3>Empty List</h3>')
    $myStoryOl.append(newList)
  }else{
    $('h3').remove()
   for (let story of currentUser.ownStories){
  let $story =generateStoryMarkup(story,true);
  $myStoryOl.append($story);
    }
    
  }
  $myStoryOl.show()
  
  }
  

// ---------------favorite----------------------

async function favList(evt){
  
  let click =  $(evt.target)
  
  const findId =evt.target.parentElement
 const findLi =click.closest('li');
const storyId =findLi.attr("id");
console.log(findId)
const favStory = storyList.stories.find(fa =>fa.storyId === storyId);

if($(findId).hasClass('fav')){
  $(findId).removeClass('fav')
  click.css('background-color','lightgray')
  await currentUser.removeFavorite(favStory)
 
}else{
  $(findId).addClass('fav')
  click.css('background-color','yellow')
  await currentUser.addFavorite(favStory)
}


}
$allStoriesList.on('click','#like',favList)

function addFavoritList(){
  if(currentUser.favorites.length === 0){
    console.log(currentUser.favorites)
    const addList =$('<h3>No favorites yet</h3>');
    $favoritesOl.append(addList)
  }else{
for(let story of currentUser.favorites){
  let $favstory =generateStoryMarkup(story)
  $favoritesOl.append($favstory)

}
makingUnFavBtn()
$favoritesOl.show()
  }
  
}
// -------------------favorite--------------------------
// -----unlike btn------
async function unLikeList(evt){
const evtLi = evt.target.parentElement
const findLi =$(evt.target).closest('li');
const storyId =findLi.attr("id");
const favStory = storyList.stories.find(fa =>fa.storyId === storyId);
$(evtLi).remove()
await currentUser.removeFavorite(favStory)

}

$favoritesOl.on('click','#unlike',unLikeList)


// ----remove btn-----

async function removeSt(evt){
  const findId =$(evt.target).closest('li');
  const storyId =findId.attr("id");
  $(evt.target.parentElement).remove()
  await storyList.removeList(currentUser,storyId)
$(evt.target).closest('li').remove()
await putUserStoriesOnPage();

}

$allStoriesList.on("click","#remove",removeSt)

