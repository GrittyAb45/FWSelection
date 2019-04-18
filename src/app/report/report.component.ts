import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HandleDuckFeedService } from '../handle-duck-feed.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})

export class ReportComponent implements OnInit {

@ViewChild('canvas') canvas: ElementRef;
@ViewChild('canvas1') canvas1: ElementRef;

  chart = [];

  chart2 = [];

  countries: any = [];
  ducksCount: any = [];
  feedTypeProcessed: any = [];
  feedQuantity: any = [];

  totalfeedQuantity;
  totalDuckCount;
  ratio;

  constructor(private handleDuckFeedService: HandleDuckFeedService) {
  }

ngOnInit(){
this.handleDuckFeedService.fetchReport().subscribe(res =>{
  console.log(res);

  this.ducksCount  = res['duckfeeds'].map ( res => res.noOfDucks);

  this.countries = res['duckfeeds'].map(res => res.location);

  this.feedQuantity = res['duckfeeds'].map(res => res.feedQuantity)

  this.totalfeedQuantity = this.feedQuantity.reduce((pr, a) => pr+a);

  this.totalDuckCount = this.feedQuantity.reduce((pr, a) => pr+a);

  this.ratio = (this.totalDuckCount/this.totalfeedQuantity) * 100;

  let data = {
    labels: this.countries,
    datasets: [
        {
            label: "Ducks count(country-wise) ",
            backgroundColor: "rgba(255,99,132,0.2)",
            borderColor: "rgba(255,99,132,1)",
            borderWidth: 1,
            hoverBackgroundColor: "rgba(255,99,132,0.4)",
            hoverBorderColor: "rgba(255,99,132,1)",
            data: this.ducksCount,
            scaleOverride:true,
     				scaleSteps : 4,
     				scaleStartValue:0,
     				scaleStepWidth:1
        }
    ]
};

  this.chart = new Chart(this.canvas.nativeElement.getContext('2d'), {
    type: 'line',
    labels: this.countries,
    data:data,
    option: {
      responsive: true,
      legend: {
        display:false
      },
      scales:{
        xAxes:[{
          display:true
        }],
        yAxes:[{
          ticks: {
            beginAtZero: true,
            max:10000,
            min:1,
            stepSize: 100,

        }
        }]
      }
    }
  });


  let data2 = {
    labels: ['totalfeedQuantity', 'totalDuckCount', 'ratio'],
    datasets: [
        {
            label: "Ducks count(country-wise) ",
            backgroundColor: "rgba(255,99,132,0.2)",
            borderColor: "rgba(255,99,132,1)",
            borderWidth: 1,
            hoverBackgroundColor: "rgba(255,99,132,0.4)",
            hoverBorderColor: "rgba(255,99,132,1)",
            data: [this.totalfeedQuantity, this.totalDuckCount, this.ratio],
            scaleOverride:true,
     				scaleSteps : 4,
     				scaleStartValue:0,
     				scaleStepWidth:1
        }
    ]
};


this.chart2 = new Chart(this.canvas1.nativeElement.getContext('2d'), {
  type: 'pie',
  labels: ['totalfeedQuantity', 'totalDuckCount', 'ratio'],
  data: data2,
  option: {
    responsive: true,
    legend: {
      display:false
    },
    scales:{
      xAxes:[{
        display:true
      }],
      yAxes:[{
        ticks: {
          beginAtZero: true,
          max:10000,
          min:1,
          stepSize: 100,

      }
      }]
    }
  }
});

 });

}

}

