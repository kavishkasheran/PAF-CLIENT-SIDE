$(document).ready(function()
{
if ($("#alertSuccess").text().trim() == "")
 {
 $("#alertSuccess").hide();
 }
 $("#alertError").hide();
});
// SAVE ============================================
$(document).on("click", "#btnSave", function(event)
{
// Clear alerts---------------------
 $("#alertSuccess").text("");
 $("#alertSuccess").hide();
 $("#alertError").text("");
 $("#alertError").hide();
// Form validation-------------------
var status = validateDoctorForm();
if (status != true)
 {
 $("#alertError").text(status);
 $("#alertError").show();
 return;
 }
// If valid------------------------
 //$("#formDoctor").submit();
//});
var type = ($("#hidDoctorIDSave").val() == "") ? "POST" : "PUT";

$.ajax(
{
	url : "DoctorApi",
	type : type,
	data : $("#formDoctor").serialize(),
	dataType : "text",
	complete : function(response, status)
	{
		
		onDoctorSaveComplete(response.responseText, status);
	}
});
});


function onDoctorSaveComplete(response, status)
{
	if (status == "success")
	{
		var resultSet = JSON.parse(response);
 
		if (resultSet.status.trim() == "success")
		{
			$("#alertSuccess").text("Successfully saved.");
			$("#alertSuccess").show();
			$("#divItemsGrid").html(resultSet.data);
		} else if (resultSet.status.trim() == "error")
		{
			$("#alertError").text(resultSet.data);
			$("#alertError").show();
		}
	} else if (status == "error")
	{
		$("#alertError").text("Error while saving.");
		$("#alertError").show();
	} else
	{
		$("#alertError").text("Unknown error while saving..");
		$("#alertError").show();
	}
	$("#hidDoctorIDSave").val("");
	$("#formDoctor")[0].reset();
}
//UPDATE===========================================
$(document).on("click", ".btnUpdate", function(event)
{
	
 $("#hidDoctorIDSave").val($(this).closest("tr").find('#hidDoctorIDUpdate').val());
 $("#D_Name").val($(this).closest("tr").find('td:eq(0)').text());
 $("#D_Type").val($(this).closest("tr").find('td:eq(1)').text());
 $("#D_Contact_Number").val($(this).closest("tr").find('td:eq(2)').text());
 $("#D_Address").val($(this).closest("tr").find('td:eq(3)').text());
 $("#D_Email").val($(this).closest("tr").find('td:eq(4)').text());
 $("#Hospital_ID").val($(this).closest("tr").find('td:eq(5)').text());
});
//llllllll

$(document).on("click", ".btnRemove", function(event)
		{
			$.ajax(
			{
				url : "DoctorApi",
				type : "DELETE",
				data : "Doctor_ID=" + $(this).data("itemid"),
				dataType : "text",
				complete : function(response, status)
				{
					onDoctorDeleteComplete(response.responseText, status);
				}
			});
		});

		function onDoctorDeleteComplete(response, status)
		{
			if (status == "success")
			{
				var resultSet = JSON.parse(response);
				
				if (resultSet.status.trim() == "success")
				{
					$("#alertSuccess").text("Successfully deleted.");
					$("#alertSuccess").show();
					$("#divItemsGrid").html(resultSet.data);
				} 
				else if (resultSet.status.trim() == "error")
				{
					$("#alertError").text(resultSet.data);
					$("#alertError").show();
				}
			} 
			else if (status == "error")
			{
				$("#alertError").text("Error while deleting.");
				$("#alertError").show();
			} 
			else
			{
				$("#alertError").text("Unknown error while deleting..");
				$("#alertError").show();
			}
		}


// CLIENTMODEL=========================================================================
function validateDoctorForm()
{
	//if ($("#itemCode").val().trim() == "")
	//{
		//return "Insert Item Code.";
	//}
	
// Doctor name
if ($("#D_Name").val().trim() == "")
 {
 return "Insert  Doctor Name....";
 }
// Doctor type
if ($("#D_Type").val().trim() == "")
 {
 return "Insert Doctor Type.....";
 }
// Contact number-------------------------------
if ($("#D_Contact_Number").val().trim() == "")
 {
 return "Insert Contact Number";
 }
//Check for numeric value
var phone = $("#D_Contact_Number").val().trim();
if (!$.isNumeric(phone)) {
	return "Insert a correct conatct number (don't insert characters)";
}
//check for length
var pattern = /^\d{10}$/;
if (!pattern.test(phone)) {
	return "Contact number should have 10 numbers";
}
//Address
if ($("#D_Address").val().trim() == "")
 {
 return "Insert Address.";
 }
//Email
if ($("#D_Email").val().trim() == "")
 {
 return "Insert valid Email.";
 }


var re = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
var email = $("#D_Email").val().trim();
if (re.test(email) == false) {
	return "Please enter valid email address";
}
//Hospital_ID
if ($("#Hospital_ID").val().trim() == "")
 {
 return "Insert Hospital ID.";
 }


return true;
}