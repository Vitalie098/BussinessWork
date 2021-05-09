import {AfterViewInit, Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import {Chart} from 'chart.js';
import {Subscription} from 'rxjs';
import {AnalyticsPage} from '../shared/interfaces';
import {AnalyticsService} from '../shared/services/analytics.service';

@Component({
  selector: 'app-analytics-page',
  styleUrls: ['./analytics-page.component.css'],
  templateUrl: './analytics-page.component.html'
})
export class AnalyticsPageComponent implements AfterViewInit, OnDestroy {

  @ViewChild('gain') public gainRef: ElementRef;
  @ViewChild('order') public orderRef: ElementRef;

  public aSub: Subscription;
  public average: number;
  public pending = true;

  constructor(private service: AnalyticsService) {
  }

  public ngAfterViewInit() {
    const gainConfig: any = {
      color: 'rgb(255, 99, 132)',
      label: 'Venitul',
    };

    const orderConfig: any = {
      color: 'rgb(54, 162, 235)',
      label: 'Comenzile',
    };

    this.aSub = this.service.getAnalytics().subscribe((data: AnalyticsPage) => {
      this.average = data.average;
      gainConfig.labels = data.chart.map((item) => item.label)
      gainConfig.data = data.chart.map((item) => item.gain)

      orderConfig.labels = data.chart.map((item) => item.label);
      orderConfig.data = data.chart.map((item) => item.order);

      // **** Gain ****
      gainConfig.labels.push('06.02.2021')
       gainConfig.labels.push('07.02.2021')
       gainConfig.data.push(1500)
       gainConfig.data.push(700)


      // **** Order ****
       orderConfig.labels.push('06.02.2021')
       orderConfig.labels.push('07.02.202021')
       orderConfig.data.push(5)
       orderConfig.data.push(10)

      const gainCtx = this.gainRef.nativeElement.getContext('2d');
      const orderCtx = this.orderRef.nativeElement.getContext('2d');
      gainCtx.canvas.height = '300px';
      orderCtx.canvas.height = '300px';
      new Chart(gainCtx, createChartConfig(gainConfig));
      new Chart(orderCtx, createChartConfig(orderConfig));

      this.pending = false;

    });
  }

  public ngOnDestroy() {
    if (this.aSub) {
      this.aSub.unsubscribe();
    }
  }

}

function createChartConfig({labels, data, label, color}) {
  return {
    type: 'line',
    options: {
      responsive: true,
    },
    data: {
      labels,
      datasets: [
        {
          label, data,
          borderColor: color,
          steppedLine: false,
          fill: false
        },
      ],
    }
  }
}
