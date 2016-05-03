// A $( document ).ready() block.
$( document ).ready(function() {
    console.log( "ready!" );
    RenderParkingData();

    setInterval(function() 
    {
      RenderParkingData();
    }, 30000);
});

var carParkData =[];

function GetCarparkData(){
    var url='https://parking.openrock.xyz/';
        $.ajax({
        url: url,
        success: function(data) {
        // console.log(data);
         carParkData = data;
         RenderTimestamp(data);
        },
        async:false
      });
     return carParkData.carparkData.Jersey.carpark;
}

function RenderParkingData(){
    $('#timestamp').html('Updating, please wait...');

    var data = data=GetCarparkData();
     //console.log(data);
     $('#poster').html('');
     $.each(data, function( index, value ) {
            RenderCarpark(value);
     });
}

function RenderCarpark(data){
// data.spaces = 300 * Math.random();

    var numbspaces=parseInt(data.spaces);
    var status=parseInt(data.status);

//set max spaces per carpark

    if (data.name == 'Green Street') {
      totalspaces = 608;
    }

    if (data.name == 'Minden Place') {
      totalspaces = 251;
    }

    if (data.name == 'Sand Street') {
      totalspaces = 545;
    }

    if (data.name == 'Patriotic Street') {
      totalspaces = 622;
    }

    if (data.name == 'Pier Road') {
      totalspaces = 739;
    }

// calculate percentages
    var percentage = (numbspaces / totalspaces) * 100;

    if(percentage > 74){
        status='empty';
    }
    if(percentage < 75){
        status='almost-empty';
    }
    if(percentage < 45){
        status='half-full';
    }
    if(percentage < 15){
        status='almost-full';
    }
    if(percentage == 0){
        status='full';
    }

//    roundedpercentage = percentage.toPrecision(2);

// Make HTML
    var target=$("#poster");
    var html="";
    html=html + '<div class="carpark ' + status + '">';
    html=html + '<div class="carpark_name">' + data.name + '</div>';
    html=html + '<div class="carpark_spaces">' + numbspaces + '<span> spaces</span></div>';
    html=html + '</div>';
    target.append(html);
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
