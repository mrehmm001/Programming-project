function Earthquake() {
    

    
    this.name = 'Earthquake Data'
    this.id = 'earthquake'
    
    var centreLat = 0;
    var centreLon = 0; 

    //8.4606° N, 11.7799° W Siearra Leone
    //31.2304° N, 121.4737° E Shanghai

    this.lat = 31.2304;
    this.lon = 121.4737;
    var zoom=1;
    this.mapImg;

    this.preload = function()  {
        //loads img of world
        this.mapImg =loadImage('https://api.mapbox.com/styles/v1/mapbox/dark-v9/static/0,0,1,0,0/1024x576?access_token=pk.eyJ1Ijoia2FtYWxram9uZXMiLCJhIjoiY2s3YXFwazVkMDB5bzNwbjJycHk1cHA1biJ9.nU0mwrV3m9aKKNbM-Vf2fA');

        //loads data of all eartquakes in the past 7 days
        this.earthquakes= loadStrings('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.csv');
       // this.earthquakes = loadStrings("./data/data-eq/all_week.css","csv","header");
    }

    //convert lat & lon to x & y 
  
    this.mercX = function(lon){
        //convert lon in deg to rad
        lon = radians(lon);
        var a = (256/ PI) * pow(2,zoom);
        var b = lon + PI
        return a * b
    }

    this.mercY = function(lat){
        // conver lattitude from deg to rad
        lat = radians(lat);
        //convert latt to a y value
        var a = (256/ PI) * pow(2,zoom);
        var b = Math.tan(((PI/4) + (lat/2)))
        var c = PI - Math.log(b)

        return a * c
    }




    this.draw = function() {
        translate(width/2,height/2);
        imageMode(CENTER);
        image(this.mapImg, 0, 0);
        
        
        var centreX = this.mercX(centreLon);
        var centreY = this.mercY(centreLat);
        
        
        //extract the eathquake data from the csv and slipt for every comma
        for (var i = 0; i < this.earthquakes.length; i++){
            var data = this.earthquakes[i].split(/,/);
            this.lat = data[1];
            this.lon = data[2];
            this.mag = data[4];
            
            var x = this.mercX(this.lon) - centreX;
            var y = this.mercY(this.lat) - centreY;
            this.mag=pow(this.mag,10);
            this.mag=sqrt(this.mag);
            this.magmax=sqrt(pow(10,10));
            var d=map(this.mag,0,this.magmax,0,180);
            fill(224, 4, 4);
            noStroke();
            ellipse(x,y,d);
        }
        
        

    }
}