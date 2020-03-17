function MeteoriteData() {
    

    
    this.name = 'Meteorite Data'
    this.id = 'MeteoriteData'
    var c;
    var myMap;
    
    const options = {
      lat: 0,
      lng: 0,
      zoom: 2,
      style: "http://{s}.tile.osm.org/{z}/{x}/{y}.png"
    }
    
    const mappa=new Mappa('Leaflet');
    
    this.preload=function(){
        
    }
    this.setup=function(){
        
        canvasContainer = select('#app');
        c = createCanvas(640, 640);
        c.parent('app');
       // c= createCanvas(1024, 576);
        myMap=mappa.tileMap(options);
        myMap.overlay(c);
        

    }
    this.draw=function(){
        clear();
        
        const nigeria = myMap.latLngToPixel(9.0820, 8.6753); 
        ellipse(nigeria.x, nigeria.y, 20, 20);
        
        
    }
    this.destroy=function(){
        //unfort I dont know any function witin MAPPA API that has the remove function :(  
        
        canvasContainer = select('#app');
        c = createCanvas(1024, 576);
        c.parent('app');
        
        
        

        
        
        
    };
    
    
}