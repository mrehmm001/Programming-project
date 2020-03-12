function Earthquake() {
    

    
    this.name = 'Earthquake Data'
    this.id = 'earthquake'
    
    var c;
    var myMap;
    
    const options = {
      lat: 0,
      lng: 0,
      zoom: 2,
      style: "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
    }

    this.preload = function()  {

        //loads data of all eartquakes in the past 7 days
        this.earthquakes= loadStrings('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.csv');
    }

    //convert lat & lon to x & y 
  
    const mappa=new Mappa('Leaflet');
    this.setup=function(){
        canvasContainer = select('#app');
        c = createCanvas(640, 640);
        c.parent('app');
        myMap=mappa.tileMap(options);
        myMap.overlay(c);
        
        /* const position2 = myMap.pixelToLatlng(253, 236);
        console.log(position2);*/
        
        
        
    }



    this.draw = function() {

        clear();
        
        
        //extract the eathquake data from the csv and slipt for every comma
        for (var i = 1; i < this.earthquakes.length; i++){
            var data = this.earthquakes[i].split(/,/);
            this.lat = data[1];
            this.lon = data[2];
            this.mag = data[4];
           // console.log(this.lat,this.lon,i);
            if(this.lat!=undefined){
                this.location = myMap.latLngToPixel(this.lat, this.lon);                 
                this.mag=pow(this.mag,10);
                this.mag=sqrt(this.mag);
                this.magmax=sqrt(pow(10,10));
                var d=map(this.mag,0,this.magmax,0,180);
                fill(224, 4, 4);
                noStroke();
                ellipse(this.location.x,this.location.y,d);
            }
           
        }
       
        
        
        

    }
    this.destroy=function(){
    }
    
}

