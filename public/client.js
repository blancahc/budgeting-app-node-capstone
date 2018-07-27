// Triggers

//when the page loads...
$(document).ready(function () {
    $("main").hide();
    $("#js-landing-page").show();

});

//When you click on "Sign Up" link, show Sign Up Form
$(document).on('click', '#js-sign-up-link', function (event) {
    event.preventDefault();
    $('main').hide();
    $('#js-sign-up-page').show();
});

//Submit Sign Up Form
$(`#js-sign-up-form`).on('submit', function (event) {
    event.preventDefault();
    $("main").hide();
    $("form").hide();
    $("#js-navigation").show();
    $('#js-added-to-budget').hide();
    $("#js-add-to-budget-page").show();
    $("#js-form-category").show();
});

//Accidentally clicked on Sign Up form but already have an account, Go back to Sign In Form
$('#js-sign-up-link').on('click', function (event) {
    event.preventDefault();
    $("main").hide();
    $("#js-landing-page").show();
});

//Submit Sign In Form
//************This overrides the top code for "Submit Sign Up Form". Will it be a problem?
$(`#js-sign-in-form`).on('submit', function (event) {
    event.preventDefault();
    $("main").hide();
    $("form").hide();
    $('#js-added-to-budget').hide();
    $("#js-navigation").show();
    $("#js-add-to-budget-page").show();
    $("#js-form-category").show();
});

//Click on Add category sub nav menu uption
$('#js-nav-add-category').on('click', function (event) {
    event.preventDefault();
    $('main').hide();
    $('form').hide();
    $('#js-added-to-budget').hide();
    $("#js-form-category").show();
    $("#js-navigation").show();
    $("#js-add-to-budget-page").show();
});
//Submit Add category Form
$(`#js-form-category`).on('submit', function (event) {
    event.preventDefault();
    $('main').hide();
    $('form').hide();
    $("#js-navigation").show();
    $("#js-add-to-budget-page").show();
    $('#js-added-to-budget').show();
});

//Click on Add subcategory sub nav menu uption
$('#js-nav-add-subcategory').on("click", function (event) {
    event.preventDefault();
    $('main').hide();
    $('form').hide();
    $('#js-added-to-budget').hide();
    $('#js-added-to-budget').hide();
    $('#navigation').show();
    $("#js-form-subcategory").show();
    $("#js-navigation").show();
    $("#js-add-to-budget-page").show();
});
//Submit Add subcategory Form
$(`#js-form-subcategory`).on('submit', function (event) {
    event.preventDefault();
    $('main').hide();
    $('form').hide();
    $("#js-navigation").show();
    $("#js-add-to-budget-page").show();
    $('#js-added-to-budget').show();
});

//Click on Add transaction sub nav menu uption
$('#js-nav-add-transaction').on('click', function (event) {
    event.preventDefault();
    $('main').hide();
    $('form').hide();
    $('#js-added-to-budget').hide();
    $('#js-added-to-budget').hide();
    $('#js-form-transaction').show();
    $('#js-navigation').show();
    $('#js-add-to-budget-page').show();
});

//Submit Add transaction Form
$(`#js-form-transaction`).on('submit', function (event) {
    event.preventDefault();
    $('main').hide();
    $('form').hide();
    $("#js-navigation").show();
    $("#js-add-to-budget-page").show();
    $('#js-added-to-budget').show();
});

//Click on My Budget nav menu uption
$('#js-nav-budget').on('click', function (event) {
    event.preventDefault();
    $('main').hide();
    $('#js-navigation').show();
    $('#js-view-budget').show();
});

//Click on Add to My Budget nav menu uption
$('#js-nav-add-budget').on('click', function (event) {
    event.preventDefault();
    $("main").hide();
    $("form").hide();
    $('#js-added-to-budget').hide();
    $("#js-navigation").show();
    $("#js-add-to-budget-page").show();
    $("#js-form-category").show();
});

$('#js-signout-button').on('click', function (event) {
    event.preventDefault();
    $("main").hide();
    $("#js-sign-in-form").show();
    $("#js-landing-page").show();
});
