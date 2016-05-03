// this is our (currently) static data on max spaces
var carParks = new Object();
carParks['Green Street'] = 608;
carParks['Minden Place'] = 251;
carParks['Sand Street'] = 545;
carParks['Patriotic Street'] = 622;
carParks['Pier Road'] = 739;

// A $( document ).ready() block.
$(document).ready(function() 
{
    UpdateParkingData();

    setInterval(function() 
    {
      UpdateParkingData();
    }, 30000);
});

var carParkData =[];

function UpdateParkingData()
{
    $('#timestamp').html('Updating, please wait...');

    var url = 'https://parking.openrock.xyz/';

    $.ajax(
    {
        url: url,
        success: function(data) 
        {
           RenderTimestamp(data);

           RenderParkingData(data.carparkData.Jersey.carpark);
        }
    });
}

function RenderParkingData(data)
{
     $('#poster').html('');

     $.each(data, function(index, value) 
     {
        RenderCarpark(value);
     });
}

function RenderCarpark(data)
{
    var numbspaces = parseInt(data.spaces);
    var status = parseInt(data.status);

    //set max spaces per carpark
    totalspaces = carParks[data.name];

    // calculate percentages
    var percentage = (numbspaces / totalspaces) * 100;

    // work out the status
    status = 'empty';
    
    if(percentage < 75)
    {
        status = 'almost-empty';
    }
    
    if(percentage < 45)
    {
        status = 'half-full';
    }
    
    if(percentage < 15)
    {
        status = 'almost-full';
    }
    
    if(percentage == 0)
    {
        status = 'full';
    }

    // Make HTML
    var html =  '<div class="carpark ' + status + '">';
    html=html + '<div class="carpark_name">' + data.name + '</div>';
    html=html + '<div class="carpark_spaces">' + numbspaces + '<span> spaces</span></div>';
    html=html + '</div>';

    $('#poster').append(html);
}

function RenderTimestamp(data)
{
  var now = new Date();
  var h = ('0' + now.getHours()).slice(-2);
  var m = ('0' + now.getMinutes()).slice(-2);
  var s = ('0' + now.getSeconds()).slice(-2);

  var localstamp = 'Page last updated at ' + h + ':' + m + ':' + s + '.';
  $('#timestamp').html(data.carparkData.Timestamp + '. ' + localstamp);
}
