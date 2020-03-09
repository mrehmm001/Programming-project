function NationGDP(){
    this.name = 'Nation GDP';
    this.id = 'Nation-GDP';
    this.data; 
    
    this.preload = function() {
    var self = this;
    this.data = loadTable(
      './data/Nation-GDP/NationsGDP.csv', 'csv', 'header',
      function(table) {
        self.loaded = true;
      });  
        
        
          
          

    };
    
    
    this.setup=function(){ 
        stroke(173, 0, 0);
        strokeWeight(4);
        this.yearsLabel=[].concat((this.data.findRow("1960","Country Name").arr));
        this.yearsLabel.splice(this.yearsLabel.length-49,49);
        this.years=[];
        for(var i=1960; i<=2020;i++){
            this.years.push(i);
        }
        this.sel=createSelect();
        this.sel.position(width/2, 600)
        this.nationNames=this.data.getColumn("Country Name");
        for(var i=0; i<this.nationNames.length-2;i++){
            this.sel.option(this.nationNames[i]);
        }
    }
    this.layout={
        startingX:68,
        startingY:506,
        
        xAxisLength:function(){return this.startingX+910},
        yAxisLength:function(){return this.startingY-500},
        
        GDP_Growth_Range:function(nationGDP){
            this.lowest=0;
            this.highest=0;
            for(var i=0; i<nationGDP.length;i++){
                if(nationGDP[i]!=""){
                    if(parseFloat(nationGDP[i])<parseFloat(this.lowest)){
                    //   console.log(nationGDP[i],this.lowest);
                        this.lowest=nationGDP[i];
                    }
                    if(parseFloat(nationGDP[i])>parseFloat(this.highest)){
                        this.highest=nationGDP[i];
                    }
                }
            }
            this.arr=[];
            if(this.lowest>0){
                this.lowest=0;
            }else{
                this.lowest=floor(this.lowest/10)*10;
            }
            this.highest=ceil(this.highest/10)*10;
            for(var i=this.lowest;i<this.highest+1;i+=5){
                this.arr.push(i);
            }
            return this.arr;
        },
        
        drawGraph:function(years,nationGDP){
            this.numXTickLabels=years.length;
            this.numYTickLabels=this.GDP_Growth_Range(nationGDP).length;
            
            line(this.startingX,this.startingY,this.xAxisLength(),this.startingY);
            line(this.startingX,this.startingY,this.startingX,this.yAxisLength()+this.Y_Label_Width());
            
            //draw the labels
            textSize(20);
            text("YEARS",(this.startingX+this.xAxisLength())/2,this.startingY+50);
            text("%",this.startingX-50,(this.startingY+this.yAxisLength())/2);
            textSize(15);
            for(var i=0; i<this.numXTickLabels;i++){
                textAlign(CENTER);
                text(years[i],this.startingX+this.X_Label_Width()*i,this.startingY+30);
                line(this.startingX+this.X_Label_Width()*i,this.startingY+5,this.startingX+this.X_Label_Width()*i,this.yAxisLength()+this.Y_Label_Width());
                
                
            }
            
            for(var i=0; i<this.numYTickLabels;i++){
                textAlign(BASELINE );
                text(this.GDP_Growth_Range(nationGDP)[i],this.startingX-30,this.startingY-abs(this.Y_Label_Width())*i);
                line(this.startingX-5,this.startingY-this.Y_Label_Width()*i,this.xAxisLength(),this.startingY-this.Y_Label_Width()*i);
                
            }
            
            
            
        },
        
        X_Label_Width:function(){
            return floor(this.xAxisLength()/(this.numXTickLabels-1))
            
        },
        Y_Label_Width:function(){
            return dist(this.startingX,this.yAxisLength(),this.startingX,this.startingY)/this.numYTickLabels
        },   
    }
    // this.plotGraphs=function(x1,y1,x2,y2)
    this.plotGraphs=function(x1,y1,x2,y2){
        stroke(173, 0, 0);
        strokeWeight(4);
        //line here
        line(x1,y1,x2,y2);

        stroke(0,0,0);
        //ellipse here
        ellipse(x1,y1,5);
            
    }
    
    this.enteractive=function(yearRange,nationName,x,y){
        if(dist(map(mouseX,this.years[0],this.years[this.years.length-1],this.layout.startingX,this.layout.xAxisLength()),
                map(mouseY,yearRange[0],yearRange[yearRange.length-1]+5,this.layout.startingY,this.layout.yAxisLength()),x,y)<5){
            console.log("test")
            Text(nationName+"("+x+") "+y+"%",245,88)
        }
        
        
    }
    
    this.draw=function(){
        stroke(0,0,0);
        strokeWeight(1);
        textSize(30);
        text("Annual % GDP growth of: "+this.sel.value(),500,39);
        this.nation=(this.data.findRow(this.sel.value(),"Country Name").arr);
        this.nationGDP=[].concat(this.nation);
        this.nationGDP.splice(0,2);
        this.layout.drawGraph(this.yearsLabel,this.nationGDP);
        for(var i=0; i<this.years.length;i++){
            
            this.plottingValues={
                    x1:map(this.years[i],
                           this.years[0],
                           this.years[this.years.length-1],
                           this.layout.startingX,
                           this.layout.xAxisLength()),
                    
                    x2:map(this.years[i+1],
                           this.years[0],
                           this.years[this.years.length-1],
                           this.layout.startingX,
                           this.layout.xAxisLength()),
                    
                    y1:map(this.nationGDP[i],
                           this.layout.GDP_Growth_Range(this.nationGDP)[0],
                           this.layout.GDP_Growth_Range(this.nationGDP)[this.layout.GDP_Growth_Range(this.nationGDP).length-1]+5,
                           this.layout.startingY,
                           this.layout.yAxisLength()),
                    
                    y2:map(this.nationGDP[i+1],
                           this.layout.GDP_Growth_Range(this.nationGDP)[0],
                           this.layout.GDP_Growth_Range(this.nationGDP)[this.layout.GDP_Growth_Range(this.nationGDP).length-1]+5,
                           this.layout.startingY,
                           this.layout.yAxisLength()),
            }
           if(this.nationGDP[i]!="" && this.nationGDP[i+1]!=""){
               this.plotGraphs(this.plottingValues.x1,this.plottingValues.y1,this.plottingValues.x2,this.plottingValues.y2);
               this.enteractive(this.layout.GDP_Growth_Range(this.nationGDP),this.sel.value(),this.plottingValues.x1,this.plottingValues.y1);
                                                                       }
        }
        
        
        
    }
    
    this.destroy = function() {
        this.sel.remove();
        
    }
      
    
    
    
    
    
}