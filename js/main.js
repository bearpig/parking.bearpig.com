// A $( document ).ready() block.
$( document ).ready(function() {
    console.log( "ready!" );
    RenderParkingData();
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
    var data = data=GetCarparkData();
     //console.log(data);
     $('#poster').html('');
     $.each(data, function( index, value ) {
            RenderCarpark(value);
     });
}

function RenderCarpark(data){
// data.spaces = 10 * Math.random();

    var numbspaces=parseInt(data.spaces);
    var status=parseInt(data.status)
    if(numbspaces > 224){
        status='empty';
    }
    if(numbspaces < 225){
        status='almost-empty';
    }
    if(numbspaces < 150){
        status='half-full';
    }
    if(numbspaces < 70){
        status='almost-full';
    }
    if(numbspaces == 0){
        status='full';
    }
    var target=$("#poster");
    var html="";
    html=html + '<div class="carpark ' + status + '">';
    html=html + '<div class="carpark_name">' + data.name + '</div>';
    html=html + '<div class="carpark_spaces">' + data.spaces + '<span> spaces</span></div>';
    html=html + '</div>';
    target.append(html);
}

function RenderTimestamp(data)
{
  $('#timestamp').html(data.carparkData.Timestamp);
}
