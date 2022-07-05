window.onload = function () {
  document.getElementsByClassName("clear")[0].onclick = function () {
    alert("Change to 'Add New Item'");
    document.getElementsByClassName("quantity")[0].value = 0;
    document.getElementsByClassName("item")[0].value = "";
    document.getElementsByClassName("submit")[0].className =
      "submit btn btn-primary";
    document.getElementsByClassName("submit")[0].innerHTML = "Add";
    document.getElementsByClassName("submit")[0].onclick = function(){
      var markers = {
        title: document.getElementsByClassName("item")[0].value,
        quantity: document.getElementsByClassName("quantity")[0].value,
      };
      addNewItem(markers);
    }
  };
  getItemsList();
  document.getElementsByClassName("submit")[0].onclick = function(){
    var markers = {
      title: document.getElementsByClassName("item")[0].value,
      quantity: document.getElementsByClassName("quantity")[0].value,
    };
    addNewItem(markers);
  }
};

function getItemsList() {
  $.ajax({
    url: "https://us-central1-pestatanglungstore.cloudfunctions.net/api/store",
    //"http://"+localhost+"/asg3/backend/RestController.php?auth="+key+"&method=all",
    method: "GET",
    encode: true,
    processData: false,
    headers: {
      "Content-Type": "application/json",
    },
    success: (resultsJSON) => {
      //resultsJSON = JSON.parse(resultsJSON);
      console.log(resultsJSON);
      if (Array.isArray(resultsJSON)) {
        buildTable(resultsJSON);
      } else {
        console.error(resultsJSON);
      }
    },
    error: (err) => console.error(err),
  });
}

function buildTable(result) {
  document.getElementsByClassName("tbody")[0].innerHTML = "";
  result.forEach((element) => {
    let row = document.createElement("tr");

    //Create the title for the Item
    let cell1 = document.createElement("td");
    cell1.innerHTML = element.title;
    row.appendChild(cell1);

    //Create the quantity for the item
    let cell2 = document.createElement("td");
    cell2.style.textAlign = "right";
    cell2.innerHTML = element.quantity;
    row.appendChild(cell2);

    //Create the Edit Button
    let cell3 = document.createElement("td");
    cell3.className = "p-0";
    let editButton = document.createElement("button");
    editButton.className = "btn btn-primary m-0 w-100 h-100";
    editButton.style.borderRadius = "0";
    editButton.innerHTML = "<i class='fa fa-edit m-1'></i>Edit";
    editButton.onclick = function () {
      document.getElementsByClassName("quantity")[0].value = element.quantity;
      document.getElementsByClassName("item")[0].value = element.title;
      document.getElementsByClassName("submit")[0].className =
        "submit btn btn-dark";
      document.getElementsByClassName("submit")[0].innerHTML = "Update";
      document.getElementsByClassName("submit")[0].onclick = function(){
        var markers = {
          title: document.getElementsByClassName("item")[0].value,
          quantity: document.getElementsByClassName("quantity")[0].value,
        };
        editItems(element.id,markers);
      }
    };
    cell3.appendChild(editButton);
    row.appendChild(cell3);

    //Create the delete Button
    let cell4 = document.createElement("td");
    cell4.className = "p-0";
    let deleteButton = document.createElement("button");
    deleteButton.className = "btn btn-danger m-0 w-100 h-100";
    deleteButton.style.borderRadius = "0";
    deleteButton.innerHTML = "<i class='fa fa-trash-o m-1'></i>Delete";
    deleteButton.onclick = function () {
      let confirmAction = confirm("Are you sure to delete "+element.title+"?");
      if (confirmAction) {
        deleteItems(element.id);
      }
    };
    cell4.appendChild(deleteButton);
    row.appendChild(cell4);
    document.getElementsByClassName("tbody")[0].appendChild(row);
  });
}

function deleteItems(id) {
  $.ajax({
    url:
      "https://us-central1-pestatanglungstore.cloudfunctions.net/api/store/" +id,
    method: "DELETE",
    encode: true,
    processData: false,
    headers: {
      "Content-Type": "application/json",
    },
    success: (resultsJSON) => {
      console.log(resultsJSON);
      getItemsList();
    },
    error: (err) => console.error(err),
  });
}

function editItems(id, markers) {
  $.ajax({
    url:  "https://us-central1-pestatanglungstore.cloudfunctions.net/api/store/" +id,
    //url: "http://"+localhost+"/asg3/backend/RestController.php?auth="+key+"&method=update",
    method: "PUT",
    data: JSON.stringify(markers),
    dataType: "json",
    encode: true,
    processData: false,
    headers: {
      "Content-Type": "application/json",
    },
    success: (resultsJSON) => {
      console.log(resultsJSON);
      getItemsList();
      document.getElementsByClassName("item")[0].value = "";
      document.getElementsByClassName("quantity")[0].value = 0;
    },
    error: (err) => console.error(err),
  });
}

function addNewItem(markers){
  $.ajax({
    url: "https://us-central1-pestatanglungstore.cloudfunctions.net/api/store/",
    //url: "http://"+localhost+"/asg3/backend/RestController.php?auth="+key+"&method=add",
    method: "POST",
    data: JSON.stringify(markers),
    dataType: "json",
    encode: true,
    processData: false,
    headers: {
      "Content-Type": "application/json",
    },
    success: (resultsJSON) => {
      console.log(resultsJSON);
      getItemsList();
      document.getElementsByClassName("item")[0].value = "";
      document.getElementsByClassName("quantity")[0].value = 0;
    },
    error: (err) => console.error(err),
  });
}