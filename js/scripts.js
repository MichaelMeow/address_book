var contactArray = [];

// business logic
function Contact(first, last) {
  this.firstName = first;
  this.lastName = last;
  this.addresses = [];
}
function Address(street, city, state, zip, type) {
  this.type = type;
  this.street = street;
  this.city = city;
  this.state = state;
  this.zip = zip;


  // this.type = type; To add multiple addresses
}
  Contact.prototype.fullName = function() {
    return this.firstName + " " + this.lastName;
  }
  Address.prototype.fullAddress = function() {
    return this.type + ": " + this.street + ", " + this.city + ", " + this.state + " " + this.zip;
  }
// user interface logic
function resetFields() {
  $("input#new-first-name").val("");
  $("input#new-last-name").val("");
  $("input.new-street").val("");
  $("input.new-city").val("");
  $("input.new-state").val("");
  $("input.new-zip").val("");
  $("#home").prop("checked", true);
}

function appendNewContact(contact) {
  $("ul#contacts").append("<li><span class='contact'>" + contact.fullName() + "</span></li>");
}

function showContactDetails(contact) {
  $("#show-contact").show();
  $("#show-contact h2").text(contact.fullName());
  $(".first-name").text(contact.firstName);
  $(".last-name").text(contact.lastName);
  $("ul#addresses").text("");
  contact.addresses.forEach(function(address) {
    $("ul#addresses").append("<li>" + address.fullAddress() + "</li>");
    console.log(contact.addresses);
  });
}

function showEditForm(contact){
  var address = contact.addresses[0]
  $("form#new-contact").hide();
  $("form#edit-contact").show();
  $("input#update-first-name").val(contact.firstName);
  $("input#update-last-name").val(contact.lastName);
  var type = address.type
  console.log(type);
  if (type == "Home"){
    $("#edit-home").prop("checked", true);
  } else if (type == "Work"){
    $("#edit-work").prop("checked", true);
  } else if (type == "POBox"){
    $("#edit-PObox").prop("checked", true);
  }
  $("input.update-street").val(address.street);
  $("input.update-city").val(address.city);
  $("input.update-state").val(address.state);
  $("input.update-zip").val(address.zip)
  // hide add contact form
  // Show edit contact form
  // populate edit contact form with contact info
}
 function updateContact(contact) {
   var address = contact.addresses[0]
  contact.firstName = $("input#update-first-name").val()
  contact.lastName = $("input#update-last-name").val()
  address.type = $("input:radio[name=edit-type]:checked").val();
  address.street = $("input.update-street").val()
  address.city = $("input.update-city").val()
  address.state = $("input.update-state").val()
  address.zip = $("input.update-zip").val()
  $("form#new-contact").show();
  $("form#edit-contact").hide();
 }


$(document).ready(function() {

  $("#add-address").click(function() {
    $("#new-addresses").append('<div class="new-address">' +
                                '<div class="btn-group" data-toggle="buttons">'+
                                '<label class="btn btn-primary active">'+
                                '<input type="radio" name="type" id="home" value="Home" autocomplete="off" checked> Home'+
                                '</label>'+
                                '<label class="btn btn-primary">'+
                                '<input type="radio" name="type" id="work" value="Work" autocomplete="off"> Work'+
                                '</label>'+
                                '<label class="btn btn-primary">'+
                                '<input type="radio" name="type" id="PObox" value="POBox" autocomplete="off"> PObox'+
                                '</label>'+
                                '</div>'+
                                '<div class="form-group">' +
                                   '<label for="new-street">Street</label>' +
                                   '<input type="text" class="form-control new-street">' +
                                 '</div>' +
                                 '<div class="form-group">' +
                                   '<label for="new-city">City</label>' +
                                   '<input type="text" class="form-control new-city">' +
                                 '</div>' +
                                 '<div class="form-group">' +
                                   '<label for="new-state">State</label>' +
                                   '<input type="text" class="form-control new-state">' +
                                 '</div>' +
                                 '<div class="form-group">' +
                                   '<label for="new-zip">Zip</label>' +
                                   '<input type="text" class="form-control new-zip">' +
                                 '</div>' +
                               '</div>');
  });

  $("form#new-contact").submit(function(event) {
    event.preventDefault();

    var inputtedFirstName = $("input#new-first-name").val();
    var inputtedLastName = $("input#new-last-name").val();
    var newContact = new Contact(inputtedFirstName, inputtedLastName);

    $(".new-address").each(function() {
      var inputtedStreet = $(this).find("input.new-street").val();
      var inputtedCity = $(this).find("input.new-city").val();
      var inputtedState = $(this).find("input.new-state").val();
      var inputtedZip =$(this).find("input.new-zip").val();
      var inputtedType = $("input:radio[name=type]:checked").val();
      var newAddress = new Address(inputtedStreet, inputtedCity, inputtedState, inputtedZip, inputtedType)
      newContact.addresses.push(newAddress)
    });
    contactArray.push(newContact);

    appendNewContact(newContact);

    $(".contact").last().click(function() {
      showContactDetails(newContact);
    });
    $("#edit-button").click(function(){
      showEditForm(newContact);
      console.log("test");
      // inside click function perform editContact function
    })
    $("form#edit-contact").submit(function(event) {
      event.preventDefault();
      updateContact(newContact);
      console.log("test2");
    })
    // If there are multiple addresses, edit form should expand to edit other addresses

    resetFields()
  });
});
