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

    //take the input from the user
    const name = $("#signUpName").val();
    const username = $("#signUpUsername").val();
    const password = $("#signUpPassword").val();

    //validate the input
    if (name == "") {
        alert('Please add a name');
    } else if (username == "") {
        alert('Please add an user name');
    } else if (password == "") {
        alert('Please add a password');
    }
    //if the input is valid
    else {
        //create the payload object (what data we send to the api call)
        const newUserObject = {
            name: name,
            username: username,
            password: password
        };
        console.log(newUserObject);

        //make the api call using the payload above
        $.ajax({
                type: 'POST',
                url: '/users/create',
                dataType: 'json',
                data: JSON.stringify(newUserObject),
                contentType: 'application/json'
            })
            //if call is succefull
            .done(function (result) {
                console.log(result);
                $('#loggedInUserName').val(result.username);
                $("main").hide();
                $("form").hide();
                $("#js-navigation").show();
                $('#js-added-to-budget').hide();
                $("#js-add-to-budget-page").show();
                $("#js-form-category").show();

            })
            //if the call is failing
            .fail(function (jqXHR, error, errorThrown) {
                console.log(jqXHR);
                console.log(error);
                console.log(errorThrown);
            });
    };
});

//Accidentally clicked on Sign Up form but already have an account, Go back to Sign In Form
$('#js-back-to-login').on('click', function (event) {
    location.reload();
});

//Submit Sign In Form
$(`#js-sign-in-form`).on('submit', function (event) {
    event.preventDefault();


    //take the input from the user
    const username = $("#loginUsername").val();
    const password = $("#loginPassword").val();

    //validate the input
    if (username == "") {
        alert('Please input user name');
    } else if (password == "") {
        alert('Please input password');
    }
    //if the input is valid
    else {
        //create the payload object (what data we send to the api call)
        const loginUserObject = {
            username: username,
            password: passwor
            d
        };
        console.log(loginUserObject);

        //make the api call using the payload above
        $.ajax({
                type: 'POST',
                url: '/users/login',
                dataType: 'json',
                data: JSON.stringify(loginUserObject),
                contentType: 'application/json'
            })
            //if call is succefull
            .done(function (result) {
                console.log(result);
                $("main").hide();
                $("form").hide();
                $('#js-added-to-budget').hide();
                $("#js-navigation").show();
                $("#js-add-to-budget-page").show();
                $("#js-form-category").show();
                $('#loggedInUserName').val(result.username);

            })
            //if the call is failing
            .fail(function (jqXHR, error, errorThrown) {
                console.log(jqXHR);
                console.log(error);
                console.log(errorThrown);
                alert('Incorrect Username or Password');
            });
    };

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


    //take the input from the user
    const categoryName = $("#categoryName").val();
    const username = $('#loggedInUserName').val();

    //validate the input
    if (categoryName == "") {
        alert('Please add a category name');
    }
    //if the input is valid
    else {
        //create the payload object (what data we send to the api call)
        const newCategoryObject = {
            categoryName: categoryName,
            username: username
        };
        console.log(newCategoryObject);

        //make the api call using the payload above
        $.ajax({
                type: 'POST',
                url: '/category/create',
                dataType: 'json',
                data: JSON.stringify(newCategoryObject),
                contentType: 'application/json'
            })
            //if call is succefull
            .done(function (result) {
                console.log(result);
                $('main').hide();
                $('form').hide();
                $("#js-navigation").show();
                $("#js-add-to-budget-page").show();
                $('#js-added-to-budget').show();
            })
            //if the call is failing
            .fail(function (jqXHR, error, errorThrown) {
                console.log(jqXHR);
                console.log(error);
                console.log(errorThrown);
            });
    };
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


    //take the input from the user
    const subcategoryName = $("#subcategoryName").val();
    const categoryBelongstoName = $("#categoryBelongs").val();
    const budgetSubcategory = $("#bugetsubcategory").val();
    //    How do I track whether they select expense or income for budgetSubcategory?
    const username = $('#loggedInUserName').val();

    //validate the input
    if (subcategoryName == "") {
        alert('Please add a subcategory name');
    } else if (categoryBelongstoName == "") {
        alert('Please add the category it belongs to');
    } else if (budgetSubcategory == "") {
        alert('Please add a budget');

    }
//if the input is valid**************************************left here*********************
    else {
        //create the payload object (what data we send to the api call)
        const newSubcategoryObject = {
            subcategoryName: subcategoryName,
            categoryBelongstoName: categoryBelongstoName,
            budgetSubcategory: budgetSubcategory,
            username: username
        };
        console.log(newSubcategoryObject);

        //make the api call using the payload above
        $.ajax({
                type: 'POST',
                url: '/subcategory/create',
                dataType: 'json',
                data: JSON.stringify(newSubcategoryObject),
                contentType: 'application/json'
            })
            //if call is succefull
            .done(function (result) {
                console.log(result);
                $('main').hide();
                $('form').hide();
                $("#js-navigation").show();
                $("#js-add-to-budget-page").show();
                $('#js-added-to-budget').show();
            })
            //if the call is failing
            .fail(function (jqXHR, error, errorThrown) {
                console.log(jqXHR);
                console.log(error);
                console.log(errorThrown);
            });
    };
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
    location.reload();
});
