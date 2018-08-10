//Defined functions and objects
function displayCategoryDropdownForSubcategory() {
    const username = $('#loggedInUserName').val();
    console.log(username);
    $.ajax({
            type: 'GET',
            url: '/category/get/' + username,
            dataType: 'json',
            contentType: 'application/json'
        })
        .done(function (result) {
            console.log(result);
            if ((!result) || (result != undefined) || (result != "")) {

                $("#categoryBelongs").html('');
                var buildCategoryDropdownOutput = "";
                buildCategoryDropdownOutput += '<option value="addCategory">select a category</option>';
                $.each(result, function (resultKey, resultValue) {
                    buildCategoryDropdownOutput += '<option value="' + resultValue.categoryName + '">' + resultValue.categoryName + '</option>';
                });
                //use the HTML output to show it in the index.html
                $("#categoryBelongs").html(buildCategoryDropdownOutput);
            }
        })
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
}

function displayCategoryDropdownForTransaction() {
    const username = $('#loggedInUserName').val();
    console.log(username);
    $.ajax({
            type: 'GET',
            url: '/category/get/' + username,
            dataType: 'json',
            contentType: 'application/json'
        })
        .done(function (result) {
            console.log(result);
            if ((!result) || (result != undefined) || (result != "")) {

                $("#transactionCategory").html('');
                var buildCategoryDropdownOutput = "";
                buildCategoryDropdownOutput += '<option value="addCategory">select a category</option>';
                $.each(result, function (resultKey, resultValue) {
                    buildCategoryDropdownOutput += '<option value="' + resultValue.categoryName + '">' + resultValue.categoryName + '</option>';
                });
                //use the HTML output to show it in the index.html
                $("#transactionCategory").html(buildCategoryDropdownOutput);
            }
        })
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
}

function displaySubcategoryDropdownForTransaction() {
    const username = $('#loggedInUserName').val();
    console.log(username);
    $.ajax({
            type: 'GET',
            url: '/subcategory/get/' + username,
            dataType: 'json',
            contentType: 'application/json'
        })
        .done(function (result) {
            console.log(result);
            if ((!result) || (result != undefined) || (result != "")) {

                $("#transactionSubcategoryName").html('');
                var buildSubcategoryDropdownOutput = "";
                buildSubcategoryDropdownOutput += '<option value="addSubcategory">select a subcategory</option>';
                $.each(result, function (resultKey, resultValue) {
                    buildSubcategoryDropdownOutput += '<option value="' + resultValue.subcategoryName + '">' + resultValue.subcategoryName + '</option>';
                });
                //use the HTML output to show it in the index.html
                $("#transactionSubcategoryName").html(buildSubcategoryDropdownOutput);
            }
        })
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
}



function displaySubcategorySummary() {
    const username = $('#loggedInUserName').val();
    console.log(username);
    $.ajax({
            type: 'GET',
            url: '/subcategory/get/' + username,
            dataType: 'json',
            contentType: 'application/json'
        })
        .done(function (result) {
            console.log(result);
            if ((!result) || (result != undefined) || (result != "")) {

                $("#subcategorySummary").html('');
                var buildBudgetSummary = "";
                var incomeBudgetTotal = 0;
                var expenseBudgetTotal = 0;

                $.each(result, function (resultKey, resultValue) {
                    buildBudgetSummary += '<div class="divTableRow">';
                    buildBudgetSummary += '<div class = "divTableCell" >';
                    buildBudgetSummary += resultValue.subcategoryName;
                    buildBudgetSummary += '<form class="deleteBudgetTable">';
                    buildBudgetSummary += '<input type="hidden" class="deleteSubcategoryItem" value="' + resultValue._id + '" >';
                    buildBudgetSummary += '<button type="submit" class="deleteItemButton" value="">';
                    buildBudgetSummary += '<i class="fa fa-minus-square-o" aria-hidden="true"></i>';
                    buildBudgetSummary += '</button>';
                    buildBudgetSummary += '</form>';
                    buildBudgetSummary += '</div>';
                    //                    buildBudgetSummary += '<div class = "divTableCell" >' + resultValue.subcategoryName + '</div>';
                    buildBudgetSummary += '<div class = "divTableCell" >' + resultValue.budgetSubcategoryAmount + '</div>';
                    buildBudgetSummary += '</div>';
                    if (resultValue.incomeExpense == "Expense") {
                        expenseBudgetTotal = expenseBudgetTotal + resultValue.budgetSubcategoryAmount;
                    } else {
                        incomeBudgetTotal = incomeBudgetTotal + resultValue.budgetSubcategoryAmount;
                    }
                });
                //use the HTML output to show it in the index.html
                $("#subcategorySummary").html(buildBudgetSummary);
            }

            $("#budgetTotals").html('');
            var buildBudgetTotals = "";
            buildBudgetTotals += '<div class="divTableRow">';
            buildBudgetTotals += '<div class="divTableCell">Monthly Budgeted Income Total:</br>' + incomeBudgetTotal + '</div>';
            buildBudgetTotals += '<div class="divTableCell">Monthly Budgeted Expense Total:</br> ' + expenseBudgetTotal + '</div>';
            buildBudgetTotals += '</div>';
            $("#budgetTotals").html(buildBudgetTotals);
        })
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
}

function displayTransactionHistory() {
    const username = $('#loggedInUserName').val();
    console.log(username);
    $.ajax({
            type: 'GET',
            url: '/transaction/get/' + username,
            dataType: 'json',
            contentType: 'application/json'
        })
        .done(function (result) {
            if ((!result) || (result != undefined) || (result != "")) {

                $("#transactionRows").html('');
                var buildTransactionHistory = "";
                var expenseTotal = 0;

                var incomeTotal = 0;
                var difference = 0;

                $.each(result, function (resultKey, resultValue) {
                    buildTransactionHistory += '<div class="divTableRow">';

                    buildTransactionHistory += '<div class = "divTableCell" >';
                    buildTransactionHistory += resultValue.transactionCategoryName;
                    buildTransactionHistory += '<form class="deleteTransactionForm">';
                    buildTransactionHistory += '<input type="hidden" class="deleteTransactionItem" value="' + resultValue._id + '" >';
                    buildTransactionHistory += '<button type="submit" class="deleteItemButton" value="">';
                    buildTransactionHistory += '<i class="fa fa-minus-square-o" aria-hidden="true"></i>';
                    buildTransactionHistory += '</button>';
                    buildTransactionHistory += '</form>';
                    buildTransactionHistory += '</div>';
                    buildTransactionHistory += '<div class = "divTableCell" >' + resultValue.transactionSubcategoryName + '</div>';
                    buildTransactionHistory += '<div class = "divTableCell" >' + resultValue.transactionMonthName + '</div>';
                    buildTransactionHistory += '<div class = "divTableCell" id="transactionAmt">' + resultValue.transactionAmount + '</div>';
                    buildTransactionHistory += '<div class = "divTableCell" >' + resultValue.incomeExpenseTransaction + '</div>';
                    buildTransactionHistory += '</div>';
                    if (resultValue.incomeExpenseTransaction == "Expense") {
                        expenseTotal = expenseTotal + resultValue.transactionAmount;
                    } else {
                        incomeTotal = incomeTotal + resultValue.transactionAmount;
                    }
                    difference = incomeTotal - expenseTotal;
                });
                //use the HTML output to show it in the index.html
                $("#transactionRows").html(buildTransactionHistory);
            }
            $("#expenseIncomeTotals").html('');
            var buildIncomeExpenseTotals = "";
            buildIncomeExpenseTotals += '<div class="divTableRow">';
            buildIncomeExpenseTotals += '<div class="divTableCell"></div>';
            buildIncomeExpenseTotals += '<div class="divTableCell" id="totalExpenses">Total Expenses:</br> ' + expenseTotal + '</div>';
            buildIncomeExpenseTotals += '<div class="divTableCell" id="totalIncome">Total Income:</br>' + incomeTotal + '</div>';
            buildIncomeExpenseTotals += '<div class="divTableCell">Difference:</br>' + difference + '</div>';
            buildIncomeExpenseTotals += '<div class="divTableCell"></div>';
            buildIncomeExpenseTotals += '</div>';
            $("#expenseIncomeTotals").html(buildIncomeExpenseTotals);
        })
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
}

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
            password: password
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
                $('#loggedInUserName').val(result.username);
                displayCategoryDropdownForTransaction();
                displaySubcategoryDropdownForTransaction();
                console.log(result);
                $('main').hide();
                $('form').hide();
                $('#js-added-to-budget').hide();
                $('#js-added-to-budget').hide();
                $('#js-form-transaction').show();
                $('#js-navigation').show();
                $('#js-add-to-budget-page').show();

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
    displayCategoryDropdownForSubcategory();
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
    const budgetSubcategoryAmount = $("#bugetsubcategory").val();
    const incomeExpense = $("input[name='subcategory-radio']:checked").val();
    const username = $('#loggedInUserName').val();

    //validate the input
    if (subcategoryName == "") {
        alert('Please add a subcategory name');
    } else if (categoryBelongstoName == "") {
        alert('Please add the category it belongs to');
    } else if (budgetSubcategoryAmount == "") {
        alert('Please add a budget');

    }
    //if the input is valid**************************************left here*********************
    else {
        //create the payload object (what data we send to the api call)
        const newSubcategoryObject = {
            subcategoryName: subcategoryName,
            categoryBelongstoName: categoryBelongstoName,
            budgetSubcategoryAmount: budgetSubcategoryAmount,
            incomeExpense: incomeExpense,
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
    displayCategoryDropdownForTransaction();
    displaySubcategoryDropdownForTransaction();
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

    //take the input from the user
    const transactionCategoryName = $("#transactionCategory").val();
    const transactionSubcategoryName = $("#transactionSubcategoryName").val();
    const transactionMonthName = $("#transactionMonth").val();
    const transactionAmount = $("#transactionAmount").val();
    const incomeExpenseTransaction = $("input[name='transaction-radio']:checked").val();
    const username = $('#loggedInUserName').val();

    //validate the input
    if (transactionCategoryName == "") {
        alert('Please select a Category for this transaction');
    } else if (transactionSubcategoryName == "") {
        alert('Please select a Subcategory for this transaction');
    } else if (transactionMonthName == "") {
        alert('Please select a month for this transaction');
    } else if (transactionAmount == "") {
        alert('Please enter a transaction amount');
    }
    //if the input is valid**************************************left here*********************
    else {
        //create the payload object (what data we send to the api call)
        const newTransactionObject = {
            transactionCategoryName: transactionCategoryName,
            transactionSubcategoryName: transactionSubcategoryName,
            transactionMonthName: transactionMonthName,
            transactionAmount: transactionAmount,
            incomeExpenseTransaction: incomeExpenseTransaction,
            username: username
        };
        console.log(newTransactionObject);

        //make the api call using the payload above
        $.ajax({
                type: 'POST',
                url: '/transaction/create',
                dataType: 'json',
                data: JSON.stringify(newTransactionObject),
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

//Click on My Budget nav menu uption
$('#js-nav-budget').on('click', function (event) {
    event.preventDefault();
    displaySubcategorySummary();
    displayTransactionHistory();
    $('main').hide();
    $('#js-navigation').show();
    $('#js-view-budget').show();
});

//Click on Add to My Budget nav menu uption
$('#js-nav-add-budget').on('click', function (event) {
    event.preventDefault();
    displayCategoryDropdownForTransaction();
    displaySubcategoryDropdownForTransaction();
    $('main').hide();
    $('form').hide();
    $('#js-added-to-budget').hide();
    $('#js-added-to-budget').hide();
    $('#js-form-transaction').show();
    $('#js-navigation').show();
    $('#js-add-to-budget-page').show();
});

$('#js-signout-button').on('click', function (event) {
    location.reload();
});

////User will be able to remove item from Budget table
$(document).on('submit', '.deleteBudgetTable', function (event) {
    event.preventDefault();
    let subcategoryIdToDelete = $(this).parent().find('.deleteSubcategoryItem').val();
    let subcategoryObject = {
        'id': subcategoryIdToDelete
    };
    $.ajax({
            method: 'DELETE',
            dataType: 'json',
            contentType: 'application/json',
            url: '/delete-from-subcategory-list/' + subcategoryIdToDelete,
        })
        .done(function (result) {
            displaySubcategorySummary();
            displayTransactionHistory();
            alert('Removed!', 'Maybe next time...', 'success');
        })
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
            alert('Oops...', 'Please try again', 'error');
        });
});

////User will be able to remove item from transactions history
$(document).on('submit', '.deleteTransactionForm', function (event) {
    event.preventDefault();
    let transactionIdToDelete = $(this).parent().find('.deleteTransactionItem').val();
    let transactionObject = {
        'id': transactionIdToDelete
    };
    $.ajax({
            method: 'DELETE',
            dataType: 'json',
            contentType: 'application/json',
            url: '/delete-from-transaction-list/' + transactionIdToDelete,
        })
        .done(function (result) {
            displaySubcategorySummary();
            displayTransactionHistory();
            alert('Removed!', 'Maybe next time...', 'success');
        })
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
            alert('Oops...', 'Please try again', 'error');
        });
});
