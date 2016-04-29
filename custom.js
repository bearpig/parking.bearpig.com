// A $( document ).ready() block.
$( document ).ready(function() {
    console.log( "ready!" );
    RenderCarparkDropdown();
    RenderParkingData();

    $('#carparks').on( "change", function(e) {
      RenderParkingData();
    });
});

var carParkData =[];

function RenderCarparkDropdown(){
    var data = data=GetCarparkData();
    var html='';
    $.each(data, function( index, value) {
        html= html + '<option value="' + value.name + '">' + value.name + '</option>';
    });
    $('#carparks').html(html);
}

function GetCarparkData(){
    var url='https://parking.openrock.xyz/';
        $.ajax({
        url: url,
        success: function(data) {
        // console.log(data);
         carParkData = data;
        },
        async:false
      });
     return carParkData.carparkData.Jersey.carpark;
}

function RenderParkingData(){
    var data = data=GetCarparkData();
     //console.log(data);
     $('#poster').html('');
     var SelectedCarpark=$('#carparks').val();
     console.log(SelectedCarpark);
     $.each(data, function( index, value ) {
        if(value.name == SelectedCarpark){
            RenderCarpark(value);
        }
     });
}

function RenderCarpark(data){
    var numbspaces=parseInt(data.spaces);
    var status='normal';
    if(numbspaces < 50){
        status='warning';
    }
    if(numbspaces == 0){
        status='full';
    }
    var target=$("#poster");
    var html="";
    html=html + '<div class="carpark ' + status + '">';
    html=html + '<h3 class="carpark_name">' + data.name + '</h3>';
    html=html + '<p class="carpark_spaces">' + data.spaces + '</p>';
    html=html + '</div>';
    target.append(html);
}
