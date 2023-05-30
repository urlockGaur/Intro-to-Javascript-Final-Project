/*
Table of contents. Use ctrl+f to find the following:
    Constructor Function-----------------------------SEARCH_CONSTRUCTOR
    Default Pet Array--------------------------------SEARCH_ARRAY
    Submission (jQuery on method)--------------------SEARCH_SUBMIT
    Adding to an Array-------------------------------SEARCH_ADD_TO_ARRAY
    Getting a Date-----------------------------------SEARCH_DATE
    Validation Functions-----------------------------SEARCH_VALIDATION
    Display Pets-------------------------------------SERACH_DISPLAY
    Sorting Functions--------------------------------SEARCH_SORTING
    Filtering Functions------------------------------SEARCH_FILTER
    Using Filtering and Sorting----------------------SEARCH_USING_FILTERS_SORTING
    Listening for Filter and Sorting changes---------SEARCH_FILTER_SORT_EVENT
    Single Page Application Functionality------------SEARCH_SINGLE_PAGE
*/




//Document Ready Function (jquery)
$(function () {


    //setting my id counter
    let gMemberId = 103
    //Hide any content that I do not want users to see
    $('#gymMemberList').hide()
    $('#gMemberForm').hide()


    //#region ====Gym Member Constructor====
    //Constructor function for a pet (parameters are spaced for legibility): SEARCH_CONSTRUCTOR
    function Member(gMemberId,
        gMemberUsername,
        gMemberFirstName,
        gMemberLastName,
        gMemberBirthday,
        gMemberEnrollDate) {
        this.gMemberId = gMemberId++;
        this.gMemberUsername = gMemberUsername;
        this.gMemberFirstName = gMemberFirstName;
        this.gMemberLastName = gMemberLastName;
        this.gMemberBirthday = gMemberBirthday
        this.gMemberEnrollDate = gMemberEnrollDate;
    }
    //#endregion


    //#region ====gMember Array====
    //Array to keep gym members in: SEARCH_ARRAY
    let gMembers = [
        new Member(100, "flexer123", "Bobby", "Biceps", new Date("10/20/1980"), new Date("12/10/2006").toLocaleDateString()),
        new Member(101, "gymGod456", "Rogal", "Dorn", new Date("03/15/2000"), new Date("10/22/2022").toLocaleDateString()),
        new Member(102, "gainz789", "Horus", "Lupercal", new Date("06/04/1990"), new Date("4/18/2023").toLocaleDateString())
    ];


    //#endregion


    //#region ====Validation Functions====
    //The following functions are used for validation for both the submission and the error messages: SEARCH_VALIDATION


    //Validates for 8 letters then 3 numbers
    function validateUsername(memberusername) {
        let usernameRegex = new RegExp('^[a-zA-Z]{4,6}[0-9]{1,3}$');
        return usernameRegex.test(memberusername);
    }

    //Validates for only letters on first name
    function validateFirstName(memberfirstname) {
        let firstNameRegex = new RegExp('^[a-zA-Z]*$');
        return firstNameRegex.test(memberfirstname);
    }

    //Validates for only letters on first name
    function validateLastName(memberlastname) {
        let lasttNameRegex = new RegExp('^[a-zA-Z]*$');
        return lasttNameRegex.test(memberlastname);
    }

    //Validates for over 18 years old
    function validateAge(date) {
        const age = getAge(date)

        return age >= 18
    }

    //Function from: https://stackoverflow.com/questions/4060004/calculate-age-given-the-birth-date-in-the-format-yyyymmdd
    // ensures members are over 18 ties to above validateAge function on line 80
    function getAge(birthDate) {
        var now = new Date();

        function isLeap(year) {
            return year % 4 == 0 && (year % 100 != 0 || year % 400 == 0);
        }

        // days since the birthdate    
        var days = Math.floor((now.getTime() - birthDate.getTime()) / 1000 / 60 / 60 / 24);
        var age = 0;
        // iterate the years
        for (var y = birthDate.getFullYear(); y <= now.getFullYear(); y++) {
            var daysInYear = isLeap(y) ? 366 : 365;
            if (days >= daysInYear) {
                days -= daysInYear;
                age++;
                // increment the age only if there are available enough days for the year.
            }
        }
        return age;
    }

    //Validates for enrollment date can't be future date
    function validateEnrollmentDate(memberenrolldate) {
        let currentDate = new Date();
        let enrollDate = new Date(memberenrolldate);

        return enrollDate <= currentDate;
    }
    //#endregion


    //#region ====Form Validation==== 

    //Adding event listeners for each input and using the validation functions to output errors to the labels
    $('#gMemberUsername').on('keyup blur', function () {
        //Using the id validation function and passing in the value
        const isValid = validateUsername($(this).val());

        if (!isValid) {
            $(this).addClass("invalid");
            $('#gMemberUsernameLabel').text("Member Username: (Must be 4-6 letters & 1-3 numbers)");
        } else {
            $(this).removeClass("invalid");
            $('#gMemberUsernameLabel').text("Member Username:");
        }
    });

    $('#gMemberFirstName').on('keyup blur', function () {
        //Using the name validation function and passing in the value
        const isValid = validateFirstName($(this).val());

        if (!isValid) {
            $(this).addClass("invalid");
            $('#gMemberFirstNameLabel').text("Member First Name: (use letters only)");
        } else {
            $(this).removeClass("invalid");
            $('#gMemberFirstNameLabel').text("Member First Name:");
        }
    });

    $('#gMemberLastName').on('keyup blur', function () {
        //Using the name validation function and passing in the value
        const isValid = validateLastName($(this).val());

        if (!isValid) {
            $(this).addClass("invalid");
            $('#gMemberLastNameLabel').text("Member Last Name: (use letters only)");
        } else {
            $(this).removeClass("invalid");
            $('#gMemberLastNameLabel').text("Member Last Name:");
        }
    });

    //Also adding a change event to the pet birthday
    $('#gMemberBirthday').on('keyup change blur', function () {
        //Using the username validation function and passing in the value
        //You could use this.valueAsDate but the timezone will be off so I am doing the following:
        const birthday = new Date($(this).val().replaceAll('-', '/'))
        const isValid = validateAge(birthday);

        if (!isValid) {
            $(this).addClass("invalid");
            $('#gMemberBirthdayLabel').text("Member Birthday: (must be 18 or older)");
        } else {
            $(this).removeClass("invalid");
            $('#gMemberBirthdayLabel').text("Member Birthday:");
        }
    });

    //Also adding a change event to the pet birthday
    $('#gMemberEnrollDate').on('keyup change blur', function () {
        //Using the username validation function and passing in the value
        //You could use this.valueAsDate but the timezone will be off so I am doing the following:
        const enrolldate = new Date($(this).val().replaceAll('-', '/'))
        const isValid = validateEnrollmentDate(enrolldate);

        if (!isValid) {
            $(this).addClass("invalid");
            $('#gMemberEnrollDateLabel').text("Member Enrollment Date: (cannot be future date)");
        } else {
            $(this).removeClass("invalid");
            $('#gMemberEnrollDateLabel').text("Member Enrollment Date:");
        }
    });

    //#endregion


    //#region ====Gym Member Form Submission====
    //Listening for form submission on the form element: SEARCH_SUBMIT
    $('#gMemberForm').on('submit', function (e) {
        e.preventDefault();

        //Getting the elements on submission. 
        //I can use the values going forward
        const $gMemberUsername = $('#gMemberUsername');
        const $gMemberFirstName = $('#gMemberFirstName');
        const $gMemberLastName = $('#gMemberLastName');

        //====Dates in JavaScript, we have discussed this, but here it is again and with jQuery: SEARCH_DATE

        let memberBirthday = document.getElementById('gMemberBirthday').valueAsDate;
        let memberEnrollDate = document.getElementById('gMemberEnrollDate').valueAsDate;



        //Converting the -'s in the string to /'s will use the correct timezone.    ¯\_(ツ)_/¯ JavaScript ¯\_(ツ)_/¯
        memberBirthday = new Date($('#gMemberBirthday').val().replaceAll('-', '/'));
        const formattedEnrollDate = memberEnrollDate.toLocaleDateString();

        //Runs validation for all of our form inputs (except submit)
        if (
            validateUsername($gMemberUsername.val()) &&
            validateFirstName($gMemberFirstName.val()) &&
            validateLastName($gMemberLastName.val()) &&
            validateAge(memberBirthday) &&
            validateEnrollmentDate(memberEnrollDate)) {
            //If everything is valid, use the push method to add to an array: SEARCH_ADD_TO_ARRAY
            gMembers.push(new Member(
                //Converting the string to an integer
                gMemberId++,
                $gMemberUsername.val(),
                $gMemberFirstName.val(),
                $gMemberLastName.val(),
                memberBirthday,
                formattedEnrollDate
            ));
            this.reset();
            console.log(gMembers);
        }


        //Display the new list
        DisplayMembers()
    });
    //#endregion


    //#region ====Display Gym Members====
    //A function to get use the filters to display a gym member list: SERACH_DISPLAY
    function DisplayMembers() {
        //Get a sorted pet list
        let filteredMembers = getFilteredList()

        //Displaying the pet list
        $listContainer = $('.gymMember-list--gMembers');
        //Clear the old list out
        $listContainer.html('');

        //Each is the jQuery version of a for loop
        //A list can be made into a jQuery option using the jQuery function
        $(filteredMembers).each(function () {
            $listContainer.append(`
                    <div class="gmember" data-id="${this.gMemberId}">
                    <div class="member-photo"><img src="content/blankProfilePicture.png" alt="member photo"></div>
                        <div id="label-wrapper">
                            <div class="label"><h4>Member ID:</h4></div>
                            <div class="label"><h4>Member Username:</h4></div>
                            <div class="label"><h4>Member First Name:</h4></div>
                            <div class="label"><h4>Member Last Name:</h4></div>
                            <div class="label"><h4>Member Age:</h4></div>
                            <div class="label"><h4>Member Enrollment Date:</h4></div>
                        </div>
                        <div id="member-information">
                            <div class="member-id">${this.gMemberId}</div>
                            <div class="member-username">${this.gMemberUsername}</div>
                            <div class="member-firstName">${this.gMemberFirstName}</div>
                            <div class="member-lastName">${this.gMemberLastName}</div>
                            <div class="member-age">${getAge(this.gMemberBirthday)}</div>
                            <div class="member-enrollmentDate">${this.gMemberEnrollDate}</div>
                            <button class="deleteButton">Delete Member</button>
                        </div>
                    </div>
                `);
        });

        $('.deleteButton').on('click', function (e) {
            //Lisenting for the delete button to be clicked and then finding the closest gmember
            $target = $(e.target).closest('.gmember')

            //Check if we found a pet
            if ($target.length > 0) {
                //Get the id from the data attribute
                id = $target.data('id')

                //We can use the findIndex function (works like our filter function) to get the
                //  position of an item in an array
                gmemberIndex = gMembers.findIndex(function (item) {
                    return item.gMemberId == id
                })

                //Ask for confirmation
                if (window.confirm("Are you sure you want to delete " + gMembers[gmemberIndex].gMemberFirstName + "?")) {
                    //We can use splice to tell JavaScript what to remove
                    //  splice(wheretostart, howmany)
                    gMembers.splice(gmemberIndex, 1)
                }
            }

            //Redisplay the new list
            DisplayMembers()
        })
    }

    //#endregion


    //#region ====Sorting Functions====
    //Named functions that are used as an arugment for array.sort() method: SEARCH_SORTING
    function sortById(a, b) {
        //a and b are pet objects
        if (a.gMemberId < b.gMemberId) {
            return -1
        }
        if (a.gMemberId > b.gMemberId) {
            return 1
        }
        return 0 // "shorthand" vs typing a.id == b.id
    }

    function sortByFirstName(a, b) {
        let agMemberFirstName = a.gMemberFirstName.toLowerCase()
        let bgMemberFirstName = b.gMemberFirstName.toLowerCase()
        if (agMemberFirstName < bgMemberFirstName) {
            return -1
        }
        if (agMemberFirstName > bgMemberFirstName) {
            return 1
        }
        return 0 // "shorthand" vs typing a.id == b.id
    }

    function sortByLastName(a, b) {
        let agMemberLastName = a.gMemberLastName.toLowerCase()
        let bgMemberLastName = b.gMemberLastName.toLowerCase()
        if (agMemberLastName < bgMemberLastName) {
            return -1
        }
        if (agMemberLastName > bgMemberLastName) {
            return 1
        }
        return 0 // "shorthand" vs typing a.id == b.id

        //add two more sorting functions for email and username
    }
    function sortByUsername(a, b) {
        let agMemberUsername = a.gMemberUsername.toLowerCase()
        let bgMemberUsername = b.gMemberUsername.toLowerCase()
        if (agMemberUsername < bgMemberUsername) {
            return -1
        }
        if (agMemberUsername > bgMemberUsername) {
            return 1
        }
        return 0
    }

    function sortByAge(a, b) {
        let agMemberBirthday = getAge(a.gMemberBirthday)
        let bgMemberBirthday = getAge(b.gMemberBirthday)
        if (agMemberBirthday < bgMemberBirthday) {
            return -1
        }
        if (agMemberBirthday > bgMemberBirthday) {
            return 1
        }
        return 0
    }
    //#endregion


    //#region ====Filtering====        
    //Named functions that are used as the argument for the array.filter() method: SEARCH_FILTER
    //Filtering looks for a true or false. It comes in with each item - function to filter by keyword
    function filterByKeyword(gmember) {
        const lowerCaseKeyword = $('#filterKeyword').val().toLowerCase()

        const containsFirstName = gmember.gMemberFirstName.toLowerCase().indexOf(lowerCaseKeyword) > -1 // purpose index of searches something. starts at 0 position for keyword, can do >= 0
        const containsLastName = gmember.gMemberLastName.toLowerCase().indexOf(lowerCaseKeyword) > -1
        const containsUsername = gmember.gMemberUsername.toLowerCase().indexOf(lowerCaseKeyword) > -1



        return containsFirstName || containsLastName || containsUsername
    }
    //#endregion




    //#region ====Get a filtered, sorted list====
    //Get a filtered list from based on the inputs: SEARCH_USING_FILTERS_SORTING
    function getFilteredList() {
        let filteredMembers = gMembers.filter(filterByKeyword)

        switch ($('#filterSort').val()) {
            case 'id':
                filteredMembers = filteredMembers.sort(sortById)
                break;
            case 'firstname':
                filteredMembers = filteredMembers.sort(sortByFirstName)
                break;
            case 'lastname':
                filteredMembers = filteredMembers.sort(sortByLastName)
                break;
            case 'username':
                filteredMembers = filteredMembers.sort(sortByUsername)
                break;
            case 'age':
                filteredMembers = filteredMembers.sort(sortByAge)
                break;
        }



        return filteredMembers;
    }

    //#endregion


    //#region ====Listen for any filter/sorting changes====
    //Event listener that triggers the filtering and sorting. SEARCH_FILTER_SORT_EVENT

    //#endregion
    $('#filterKeyword, #filterSort').on('keyup change blur', function () {
        DisplayMembers()
    })

    //#region ====Single Page Application Functionality==== 
    //Creating a single page application by showing relevant content. SEARCH_SINGLE_PAGE -
    $('#viewForm').on('click', function (e) {
        $('#gMemberForm').fadeIn(400)
        const $addGymMemberForm = $('#gymMemberAdd')
        const $gMemberList = $('#gymMemberList')

        if (!$addGymMemberForm.is(":visible")) {  // :visible is a suedo selector - looking for part of someting
            $gMemberList.fadeOut(400, function () {
                $addGymMemberForm.fadeIn()
            })

        }
    });

    $('#viewList').on('click', function (e) {
        const $addGymMemberForm = $('#gymMemberAdd')
        const $gMemberList = $('#gymMemberList')

        if (!$gMemberList.is(':visible')) { // if pet form not visible
            $addGymMemberForm.fadeOut(400, function () {
                $gMemberList.fadeIn()
            })

        }
    });
    //#endregion


    //Run any default functionality:
    DisplayMembers()
});